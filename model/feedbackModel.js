const Joi = require('joi');

module.exports = {
    id : Joi.number().required(),
    feedback : Joi.bool().required()
}