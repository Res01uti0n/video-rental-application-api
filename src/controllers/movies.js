const { Movie } = require('../models/movie');
const { Genre } = require('../models/genre');
const validate = require('../validators/movies');

const getMoviesList = async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
};

const createNewMovie = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            // eslint-disable-next-line no-underscore-dangle
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();

    return res.send(movie);
};

const updateMovie = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            genre: {
                // eslint-disable-next-line no-underscore-dangle
                _id: genre._id,
                name: genre.name,
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        }, { new: true });

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    return res.send(movie);
};

const removeMovie = async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    return res.send(movie);
};

const getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    return res.send(movie);
};

module.exports = {
    getMoviesList,
    createNewMovie,
    updateMovie,
    removeMovie,
    getMovie,
};
