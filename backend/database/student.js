const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: String,
    discription: String,
    status: Boolean
});

module.exports =  mongoose.model("crud", userSchema)