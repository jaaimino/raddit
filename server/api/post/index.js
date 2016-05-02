'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

//Session
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/comments', controller.comments);
router.post('/', auth.hasRole('author'), controller.create);
router.put('/:id', auth.hasRole('author'), controller.update);
router.patch('/:id', auth.hasRole('author'), controller.update);
router.delete('/:id', auth.hasRole('author'), controller.destroy);

module.exports = router;