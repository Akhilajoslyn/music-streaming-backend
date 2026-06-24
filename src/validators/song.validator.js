const Joi = require("joi");

const createSongSchema =
    Joi.object({

        title:
            Joi.string()
                .required(),

        artist:
            Joi.string()
                .required(),

        album:
            Joi.string()
                .required(),

        genre:
            Joi.string()
                .required(),
    });

module.exports = {
    createSongSchema,
};