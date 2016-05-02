/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Topic = require('../api/topic/topic.model');
var Post = require('../api/post/post.model');

User.find({}).remove(function() {
  var testuser = new User();
  testuser.provider = 'local';
  testuser.name = 'Test User';
  testuser.email = 'test@test.com';
  testuser.password = 'test';
  testuser.save();
  
  var mark = new User();
  mark.provider = 'local';
  mark.name = 'Mark';
  mark.role = 'author';
  mark.email = 'mark@mark.com';
  mark.password = 'mark';
  mark.save();
  
  var jacob = new User();
  jacob.provider = 'local';
  jacob.name = 'Jacob';
  jacob.role = 'moderator';
  jacob.email = 'jacob@jacob.com';
  jacob.password = 'jacob';
  jacob.save();
  
  var admin = new User();
  admin.provider = 'local';
  admin.role = 'admin';
  admin.name = 'Admin';
  admin.email = 'admin@admin.com';
  admin.password = 'admin';
  admin.save();
  
  console.log('finished populating users');
    Topic.find({}).remove(function(){
    console.log("Removing all topics");
    var mytopic = new Topic();
    mytopic.title = "Nope";
    mytopic.author = jacob._id;
    mytopic.save();
    console.log("Finished populating topics")
    
    Post.find({}).remove(function(){
      console.log("Removing all posts")
      var mypost = new Post();
      mypost.title = "Eyy";
      mypost.topic = mytopic._id;
      mypost.author = jacob._id;
      mypost.content = "Eyy there."
      mypost.save();
      console.log("Finished populating posts")
    });
    
  });
});

