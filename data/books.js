const express = require('express');
const app = express();
const bookRoute = express.Router();
const bookModel = require('../model/books');

// To Get List Of Users
bookRoute.route('/getBooks').get(function (req, res) {
  bookModel.find(function (err, book) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(book);
        }
    });
});



// To Add New User
bookRoute.route('/addBook').post(function (req, res) {
    let book = new bookModel(req.body);
    book.save()
        .then(data => {
            res.status(200).json({ 'book': 'Book Added Successfully' });
        })
        .catch(err => {
            res.status(400).send("Something Went Wrong");
        });
});




//To edit User
bookRoute.route('/editBook/:id').put(function (req, res) {
if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  bookModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update book with id=${id}. Maybe Tutorial was not found!`
        });
      } 
      else {
        res.send({ message: "Book was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating book with id=" + id
      });
    });
});



// To Delete The User
bookRoute.route('/deleteBook/:id').delete(function (req, res) {
    bookModel.findByIdAndRemove({ _id: req.params.id }, function (err, book) {
        if (err) res.json(err);
        else res.json('Book Deleted Successfully');
    });
});

module.exports = bookRoute;