const Joi = require("joi");

const createArtistSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    bio: Joi.string()
        .allow("")
        .optional(),

    genres: Joi.array()
        .items(Joi.string())
        .optional(),
});

module.exports = {
    createArtistSchema,
};