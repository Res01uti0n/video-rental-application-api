const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const validate = require('../validators/rentals');

Fawn.init(mongoose);

const getRentalsList = async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
};

const createNewRental = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    const rental = new Rental({
        customer: {
            // eslint-disable-next-line no-underscore-dangle
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            // eslint-disable-next-line no-underscore-dangle
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
    });

    try {
        new Fawn.Task()
            .save('rentals', rental)
            // eslint-disable-next-line no-underscore-dangle
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 },
            })
            .run();

        return res.send(rental);
    } catch (ex) {
        return res.status(500).send('Something failed.');
    }
};

const getRental = async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    return res.send(rental);
};

module.exports = {
    getRentalsList,
    createNewRental,
    getRental,
};
