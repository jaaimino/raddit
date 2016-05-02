'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true},
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Topic', TopicSchema);
