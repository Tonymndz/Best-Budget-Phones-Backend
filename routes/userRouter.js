const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const keys = require('../config/key');
const auth = require('../middleware/auth');

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let errorMessage = "";
  let passHashed = "";
  try {
    const existingUser = await User.findOne({ username: username })
  
    if (username.length === 0)
      errorMessage = "The username field is empty.";
    else if (password.length === 0)
      errorMessage = "The password field is empty.";
    else if (existingUser)
      errorMessage = "An account with this username already exists.";

    if (errorMessage.length > 0)
      return res.status(400).json(errorMessage) 

    const salt = await bcrypt.genSalt();
    passHashed = (password.length === 0) ? "" : await bcrypt.hash(password, salt)

    const newUser = new User({
      username: username, 
      password: passHashed,
    })

    newUser.save().then(() => res.json('User added'))
  } catch (err) {
    res.status(400).json('Error: ' + (errorMessage || err))
  }
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    let errorMessage = "";
    const existingUser = await User.findOne({ username: username })
    const passMatches = await bcrypt.compare(password, existingUser.password)

    if (username.length === 0)
      errorMessage = "The username field is empty.";
    else if (password.length === 0)
      errorMessage = "The password field is empty.";
    else if (!existingUser)
      errorMessage = "No account with this name has been registered.";
    else if (!passMatches)
      errorMessage = "Password does not match with this username.";
    
    if (errorMessage.length > 0)
      return res.status(400).json('Error: ' + errorMessage)

  const token = jwt.sign({ id: existingUser._id }, keys.JWT_SECRET)
  res.json({
    token,
    user: {
      id: existingUser._id,
      username: existingUser.username,
    }
  })
  } catch (err) {
    res.status(500).json('Error: ' + err)
  } 
})

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token"); // If Empty string returns string in string returns "\"\""
    if (!token) return res.json(false);

    const verified = jwt.verify(token, keys.JWT_SECRET)
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false)

    return res.json(true)
  } catch (err) {
    res.status(401).json(false)
  }
})


router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    user: {
      id: user._id,
      username: user.username,
    }
  })
})

module.exports = router;