const mongoose = require('mongoose');

const genre = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model('Genre', genre);

exports.genreSchema = genre;
exports.Genre = Genre;
