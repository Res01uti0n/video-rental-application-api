const Joi = require('joi');

module.exports = customer => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
    });

    return schema.validate(customer);
};
