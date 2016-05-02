'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var Comment = require('../comment/comment.model');

// Get list of messages

exports.index = function(req, res) {
  Post.find(function (err, posts) {}).populate('author', 'name').exec(function(err, posts){
    if(err) { return handleError(res, err); }
    return res.status(200).json(posts);
  });
};

// Get list of comments in a post
exports.comments = function(req, res) {
  var postId = req.params.id;
  Comment.find({post: postId}).populate('author').exec(function(err, comments){
    if(err) { return handleError(res, err); }
    return res.status(200).json(comments);
  });
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {})
  .populate('author', 'name').exec(function(err, post){
    if(err) { return handleError(res, err); }
    return res.status(200).json(post);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  req.body.author = req.user._id;
  Post.create(req.body, function(err, post) {
    if(err) {return handleError(res, err);}
    return res.status(201).json(post);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(post);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  var postId = req.params.id;
  Comment.find({post: postId}).remove(); //Get rid of related comments
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
