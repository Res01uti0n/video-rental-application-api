const express = require('express');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const returnsHandler = require('../controllers/returns');
const validateReturn = require('../validators/returns');

const router = express.Router();

router.post('/', [auth, validate(validateReturn)], returnsHandler);

module.exports = router;
