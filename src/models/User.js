const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        },

        googleId: {
            type: String,
            default: "",
        },

        profileImage: {
            type: String,
            default: "",
        },

        refreshToken: {
            type: String,
            default: "",
        },

        passwordResetToken: {
            type: String,
        },

        passwordResetExpires: {
            type: Date,
        },

        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);