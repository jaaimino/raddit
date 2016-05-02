'use strict';

var _ = require('lodash');
var Topic = require('./topic.model');
var Post = require('../post/post.model');
var Comment = require('../comment/comment.model');

// Get list of topics

exports.index = function(req, res) {
  Topic.find(function (err, messages) {}).populate('author', 'name').exec(function(err, topics){
    if(err) { return handleError(res, err); }
    return res.status(200).json(topics);
  });
};

// Get list of comments in a post
exports.posts = function(req, res) {
  var topicId = req.params.id;
  Post.find({topic: topicId}).populate('author').exec(function(err, posts){
    if(err) { return handleError(res, err); }
    return res.status(200).json(posts);
  });
};

// Get a single message
exports.show = function(req, res) {
  Topic.findById(req.params.id, function (err, topic) {
    if(err) { return handleError(res, err); }
    if(!topic) { return res.status(404).send('Not Found'); }
    return res.json(topic);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  req.body.author = req.user._id;
  Topic.create(req.body, function(err, topic) {
    if(err) {return handleError(res, err);}
    return res.status(201).json(topic);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Topic.findById(req.params.id, function (err, topic) {
    if (err) { return handleError(res, err); }
    if(!topic) { return res.status(404).send('Not Found'); }
    var updated = _.merge(topic, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(topic);
    });
  });
};

// Deletes a topic from the DB.
exports.destroy = function(req, res) {
  var topicId = req.params.id;
  Post.find({topic: topicId}, function (err, posts) {
    for(var post in posts){
      var postId = post._id;
      Comment.find({post:postId}).remove();
    }
  }).remove();
  Topic.findById(req.params.id, function (err, topic) {
    if(err) { return handleError(res, err); }
    if(!topic) { return res.status(404).send('Not Found'); }
    topic.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
