const mongoose = require('mongoose')
const Schema = mongoose.Schema

const project = new Schema({
  title: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  css: {
    type: String,
    required: true
  },
  js: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Project', project)
