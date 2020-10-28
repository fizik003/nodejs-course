const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: String,
  order: {
    type: Number,
    default: 0
  },
  _id: {
    type: String,
    default: uuid
  }
});

const Column = mongoose.model('Column', columnSchema);
columnSchema.statics.toResponse = column => {
  const { title, order, id } = column;
  return { title, order, id };
};

module.exports = { Column, columnSchema };
