const router = require('express').Router(); // We are creating a route
let Under120 = require('../models/under120.model') // Import the model

router.route('/').get((req, res) => { // Get: Client wants to get Data
  Under120.find() // Mongoose method that returns promise of all the documents as an array of objects 
    .then(users => res.json(users)) // returns all the users in json format
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => { // Post: Client wants to send data
  const comment = req.body.comment;

  const newComment = new Under120({ comment }); // Creates a document using Under120's document model format

  newComment.save() // comment is checked and then saved to the database
    .then(() => res.json('User added')) // Send client a success text in json
    .catch(err => res.status(400).json('Error: ' + err)) // Return Error
})

module.exports = router;