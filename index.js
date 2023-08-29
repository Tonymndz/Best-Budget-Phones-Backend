const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const keys = require('./config/key')
require('dotenv').config();
const app = express();

/*
app.get('/', (req, res) => { 
  res.send({ bye: 'buddy' });
})*/

app.use(cors()); // Middle-ware, bypass cross-origin errors for getting data from other domain
app.use(express.json()); // Allows us to parse json because our server is going to recieving and sending json

// const uri = keys.mongoURI; // URI from MongoDB Atlash Dashboard, URI is where the database is stored, located in the .env file
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true } ); // Start connect to URI(Where database is stored), For the property flags MongoDB didnt want to change the defaults after update so we have to put them as true to use lastest updates of these

const connection = mongoose.connection; // used for shortening
connection.once('open', () => { console.log("MongoDB database connection established successfuly"); })

const Under50Router = require('./routes/under50'); // Import class/function from this location
const Under100Router = require('./routes/under100'); 
const Under120Router = require('./routes/under120');
const UserRouter = require("./routes/userRouter");

app.use('/under50', Under50Router); // Whenever goes to root url + /exercises it will its going to load exercisesRouter 
app.use('/under100', Under100Router)
app.use('/under120', Under120Router)
app.use("/users", UserRouter)

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });