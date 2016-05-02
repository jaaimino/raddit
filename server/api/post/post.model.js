'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true},
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true},
  content: { type: String, required: true},
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Post', PostSchema);
