const mongoose = require("mongoose");

const songSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },

            artist: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Artist",
                required: true,
            },

            album: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Album",
                required: true,
            },

            genre: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Genre",
                required: true,
            },

            audioUrl: {
                type: String,
                default: "",
            },

            coverImage: {
                type: String,
                default: "",
            },

            duration: {
                type: Number,
                default: 0,
            },

            plays: {
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
        "Song",
        songSchema
    );