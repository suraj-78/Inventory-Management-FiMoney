const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type: String , unique : true},
    password : String, 
    firstName : String, 
    lastName : String
    }

);

const userModel = mongoose.model("user", userSchema);

module.exports = {
    userModel
}

