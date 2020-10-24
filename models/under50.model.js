const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const under50Schema = new Schema({
  username: {
    required: true,
    type: String,
    minlength: 1
  },
  comment: { // Single field and required property is "comment": {value}
    required: true,
    type: String, // Validations to single field
    trim: true, // Trim white-space of the end
    minlength: 1
  }
}, {
  timestamps: true // Creates a timestamp on modified/created
})

const Under50 = mongoose.model('Under50', under50Schema); // Creates a model for what database to put it in, 2nd param is document format

module.exports = Under50;