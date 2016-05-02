'use strict';

var express = require('express');
var controller = require('./moderator.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/revokeauthor/:id', auth.hasRole('moderator'), controller.demoteAuthor);
router.put('/revokeauthor/:id', auth.hasRole('moderator'), controller.demoteAuthor);
router.patch('/revokeauthor/:id', auth.hasRole('moderator'), controller.demoteAuthor);

module.exports = router;
