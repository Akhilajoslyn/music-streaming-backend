const mongoose = require("mongoose");

const albumSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },

            description: {
                type: String,
                default: "",
            },

            coverImage: {
                type: String,
                default: "",
            },

            artist: {
                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Artist",

                required: true,
            },

            releaseDate: {
                type: Date,
            },

            totalSongs: {
                type: Number,
                default: 0,
            },

            isActive: {
                type: Boolean,
                default: true,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Album",
        albumSchema
    );