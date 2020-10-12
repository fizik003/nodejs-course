const uuid = require('uuid');
const Column = require('./columns.model');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = columns.map(el => new Column(el))
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
