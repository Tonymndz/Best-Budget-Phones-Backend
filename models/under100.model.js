const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Under100Schema = new Schema({
  username: {
    required: true,
    unique: true,
    type: String,
    minlength: 1
  },
  comment: { // Single field
    required: true,
    type: String, // Validations to single field
    trim: true, // Trim white-space of the end
    minlength: 1
  }
}, {
  timestamps: true // Creates a timestamp on modified/created
})

const Under100 = mongoose.model('Under100', Under100Schema); // Creates a model for what database to put it in, 2nd param is document format

module.exports = Under100;