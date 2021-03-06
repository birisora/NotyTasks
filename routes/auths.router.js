
'use strict';

const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller');

const router = express.Router();

const localAuth = passport.authenticate('local', { session: false });

// provides a username and password to login
router.post('/login', localAuth, authController.postLogin);

const jwtAuth = passport.authenticate('jwt', { session: false });
// user exhanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, authController.postRefresh);

router.get('/logout', authController.getLogout);

module.exports = router;
