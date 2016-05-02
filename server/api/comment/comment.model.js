'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true},
  author: { type: Schema.Types.ObjectId, ref: 'User', required: false},
  timestamp: { type: Date, default: Date.now },
  content: { type: String, required: true},
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Comment', CommentSchema);
