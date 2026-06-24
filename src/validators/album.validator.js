const Joi = require("joi");

const createAlbumSchema =
    Joi.object({
        title:
            Joi.string()
                .required(),

        description:
            Joi.string()
                .allow(""),

        artist:
            Joi.string()
                .required(),

        releaseDate:
            Joi.date(),
    });

module.exports = {
    createAlbumSchema,
};