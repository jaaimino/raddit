/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Topic = require('./topic.model');
var User = require('../user/user.model');

exports.register = function(socket) {
  Topic.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Topic.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  User.populate(doc, 'author', function(err) {
    socket.emit('topic:save', doc);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('topic:remove', doc);
}
