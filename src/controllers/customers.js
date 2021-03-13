const { Customer } = require('../models/customer');
const validate = require('../validators/customers');

const getCustomersList = async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
};

const createCustomer = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    });
    customer = await customer.save();

    return res.send(customer);
};

const updateCustomer = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone,
        }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    return res.send(customer);
};

const removeCustomer = async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    return res.send(customer);
};

const getCustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    return res.send(customer);
};

module.exports = {
    getCustomersList,
    createCustomer,
    updateCustomer,
    removeCustomer,
    getCustomer,
};
