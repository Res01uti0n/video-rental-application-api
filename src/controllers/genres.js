const { Genre } = require('../models/genre');
const validate = require('../validators/genres');

const getGenresList = async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
};

const createNewGenre = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    return res.send(genre);
};

const updateGenre = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true,
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    return res.send(genre);
};

const removeGenre = async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    return res.send(genre);
};

const getGenre = async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    return res.send(genre);
};

module.exports = {
    getGenresList,
    createNewGenre,
    updateGenre,
    removeGenre,
    getGenre,
};
