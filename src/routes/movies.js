const express = require('express');
const {
  getMoviesList,
  createNewMovie,
  updateMovie,
  removeMovie,
  getMovie,
} = require('../controllers/movies');

const router = express.Router();

router.get('/', getMoviesList);

router.post('/', createNewMovie);

router.put('/:id', updateMovie);

router.delete('/:id', removeMovie);

router.get('/:id', getMovie);

module.exports = router;
