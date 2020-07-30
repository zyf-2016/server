const mongoose = require('mongoose')

let personSchema = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = personSchema