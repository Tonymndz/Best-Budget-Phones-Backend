const jwt = require("jsonwebtoken");
// const keys = require('../config/key')
require('dotenv').config();

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token")
    if (!token)
      return res.status(401).json("No authentication token, authrization denied")
    
    const verified = jwt.verify(token, process.env.JWT_SECRET) // Something Like: { id: "5f905f488f21287", iat: 8945164871 } | Object with Properties when used .sign & iat
    if (!verified)
      return res.status(401).json("Token verification failed, authorization denied")

    req.user = verified.id
    next();
  } catch (err) {
    res.status(500).json('Error: ' + err)
  } 
}

module.exports = auth;

// Store login at local storage and get it
/*
  useEffect(() => {
    const checkLogginedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token". "");
        token = "";
      }
    }
  })
*/