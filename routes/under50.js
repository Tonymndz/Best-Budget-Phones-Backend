const router = require('express').Router(); // We are creating a route
let Under50 = require('../models/under50.model') // Import the model

router.route('/').get((req, res) => { // Get: Client wants to get Data
  Under50.find() // Mongoose method that returns promise of all the documents as an array of objects 
    .then(users => res.json(users)) // returns all the users in json format
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => { // Post: Client wants to send data
  const comment = req.body.comment;

  const newComment = new Under50({ comment }); // Creates a document using under50's document model format

  newComment.save() // comment is checked and then saved to the database
    .then(() => res.json('User added')) // Send client a success text in json
    .catch(err => res.status(400).json('Error: ' + err)) // Return Error
})

module.exports = router;