const express = require('express');
const auth = require('../middleware/auth');
const { getUser, signUpUser } = require('../controllers/users');

const router = express.Router();

router.get('/me', auth, getUser);

router.post('/', signUpUser);

module.exports = router;
