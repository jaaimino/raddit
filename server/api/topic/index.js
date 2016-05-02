'use strict';

var express = require('express');
var controller = require('./topic.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

//Session
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/posts', controller.posts);
router.post('/', auth.hasRole('moderator'), controller.create);
router.put('/:id', auth.hasRole('moderator'), controller.update);
router.patch('/:id', auth.hasRole('moderator'), controller.update);
router.delete('/:id', auth.hasRole('moderator'), controller.destroy);

module.exports = router;