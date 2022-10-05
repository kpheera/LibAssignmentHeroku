const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for User schema
let Book = new Schema ({
    title: { type: String },
    author: { type: String },
    image: { type: String },
    description: { type: String },
  },
  {
    collection: 'books'
  }
);

module.exports = mongoose.model('Book', Book);
