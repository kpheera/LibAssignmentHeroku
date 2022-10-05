const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// List of columns for User schema
let User = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    collection: 'users'
  }
);

User.methods.hashPassword = async (password) => {
  return await bcrypt.hashSync(password, 10);
}
User.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
  return await bcrypt.compare(inputtedPassword, hashedPassword)
}
// User.methods.generateJwtToken = async (payload, secret, expires) => {
//   return jwt.sign(payload, secret, expires)
// }

module.exports = mongoose.model('User', User);
