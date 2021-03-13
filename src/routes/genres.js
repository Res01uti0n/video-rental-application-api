const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { getGenresList, createNewGenre, updateGenre, removeGenre, getGenre } = require('../controllers/genres');

const router = express.Router();

router.get('/', getGenresList);

router.post('/', auth, createNewGenre);

router.put('/:id', [auth, validateObjectId], updateGenre);

router.delete('/:id', [auth, admin, validateObjectId], removeGenre);

router.get('/:id', validateObjectId, getGenre);

module.exports = router;
