const router = require('express').Router(); // We are creating a route
let Under100 = require('../models/under100.model') // Import the model

router.route('/').get((req, res) => { // Get: Client wants to get Data
  Under100.find() // Mongoose method that returns promise of all the documents as an array of objects 
    .then(users => res.json(users)) // returns all the users in json format
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => { // Post: Client wants to send data
  const { username, comment } = req.body;

  const newComment = new Under100({ username, comment }); // Creates a document using under100's document model format

  newComment.save() // comment is checked and then saved to the database
    .then(() => res.json('Comment added')) // Send client a success text in json
    .catch(err => res.status(400).json('Error: ' + err)) // Return Error
})

module.exports = router;