const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Under120Schema = new Schema({
  comment: { // Single field
    required: true,
    type: String, // Validations to single field
    trim: true, // Trim white-space of the end
    minlength: 1
  }
}, {
  timestamps: true // Creates a timestamp on modified/created
})

const Under120 = mongoose.model('Under120', Under120Schema); // Creates a model for what database to put it in, 2nd param is document format

module.exports = Under120;