'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');

// Get list of messages
exports.index = function(req, res) {
  Comment.find(function (err, posts) {}).populate('author', 'name').exec(function(err, comments){
    if(err) { return handleError(res, err); }
    return res.status(200).json(comments);
  });
};

// Get a single message
exports.show = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    return res.json(comment);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  Comment.create(req.body, function(err, comment) {
    if(err) {return handleError(res, err);}
    return res.status(201).json(comment);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(comment);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
