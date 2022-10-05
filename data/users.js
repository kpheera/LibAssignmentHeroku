const express = require('express');
const app = express();
const userRoute = express.Router();
const userModel = require('../model/users');

// To Get List Of Users
userRoute.route('/getUsers').get(function (req, res) {
    userModel.find(function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});


//check if user exit
userRoute.route('/checkUser').post(async function (req, res) {
  
  let user = await userModel.findOne({
    email: req.body.email
  });

  //check if user exit
  if (!user) {
    return res.status(400).json({
        type: "Not Found",
        msg: "User dosen't exists!!"
    })
  }

  let match = await user.compareUserPassword(req.body.password, user.password);
  if (match) {
    return res.status(200).json({ 'user': 'User exists!!' });
  }
  else {
      return res.status(400).json({
          type: "Not Found",
          msg: "Wrong Login Credentials!!"
      })
  }
});


// To Add New User
userRoute.route('/addUser').post(async function (req, res) {

  let userDet = await userModel.findOne({
    email: req.body.email
  });

  if(userDet){
    return res.status(400).json({
      msg: "User Already exists!!"
    })
  }

  let user = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })
  user.password = await user.hashPassword(req.body.password);

  user.save()
    .then(data => {
      res.status(200).json({ 'user': 'User Added Successfully' });
    })
    .catch(err => {
      res.status(400).send("Something Went Wrong");
    });
});



//To edit User
userRoute.route('/editUser/:id').put(function (req, res) {
if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
        });
      } 
      else {
        res.send({ message: "User was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
});



// To Delete The User
userRoute.route('/deleteUser/:id').delete(function (req, res) {
    userModel.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
        if (err) res.json(err);
        else res.json('User Deleted Successfully');
    });
});

module.exports = userRoute;
