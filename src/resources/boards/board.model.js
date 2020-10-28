const uuid = require('uuid');
const mongoose = require('mongoose');
const { columnSchema } = require('./columns.model');

const boardShema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [columnSchema]
  },
  { collection: 'boards', versionKey: false }
);

boardShema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardShema);

module.exports = Board;
