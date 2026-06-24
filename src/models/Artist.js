const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        bio: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        genres: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Genre",
            },
        ],

        followers: {
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

module.exports = mongoose.model(
    "Artist",
    artistSchema
);