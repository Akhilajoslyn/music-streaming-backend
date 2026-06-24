const Joi = require("joi");

const createPlaylistSchema =
    Joi.object({

        name:
            Joi.string()
                .required(),

        description:
            Joi.string()
                .allow(""),
    });

module.exports = {
    createPlaylistSchema,
};