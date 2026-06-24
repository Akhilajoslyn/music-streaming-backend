const Joi = require("joi");

const createGenreSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    description: Joi.string()
        .allow("")
        .optional(),
});

module.exports = {
    createGenreSchema,
};