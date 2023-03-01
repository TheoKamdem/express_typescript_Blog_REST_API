import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  dateOfSending: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', schema )