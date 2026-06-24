const bcrypt = require("bcrypt");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const sendEmail =
    require("../utils/sendEmail");

const {
    OAuth2Client,
} = require("google-auth-library");

const client =
    new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID
    );

const registerUser = async (userData) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(
            409,
            "User already exists with this email"
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};



const loginUser = async (userData) => {
    const { email, password } = userData;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(
            401,
            "Invalid Email or Password"
        );
    }

    if (user.isBlocked) {
        throw new ApiError(
            403,
            "Your account has been blocked"
        );
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "Invalid Email or Password"
        );
    }

    const accessToken =
        generateAccessToken(user._id);

    const refreshToken =
        generateRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};

const googleLogin = async (
    token
) => {

    const ticket =
        await client.verifyIdToken({
            idToken: token,
            audience:
                process.env
                    .GOOGLE_CLIENT_ID,
        });

    const payload =
        ticket.getPayload();

    const {
        sub,
        email,
        name,
        picture,
    } = payload;

    let user =
        await User.findOne({
            email,
        });

    if (!user) {

        user =
            await User.create({

                name,

                email,

                googleId: sub,

                profileImage:
                    picture,
            });
    }

    const accessToken =
        generateAccessToken(
            user._id
        );

    const refreshToken =
        generateRefreshToken(
            user._id
        );

    user.refreshToken =
        refreshToken;

    await user.save();

    return {

        user: {

            id:
                user._id,

            name:
                user.name,

            email:
                user.email,

            role:
                user.role,

            profileImage:
                user.profileImage,
        },

        accessToken,

        refreshToken,
    };
};

const forgotPassword = async (
    email
) => {

    const user =
        await User.findOne({
            email,
        });

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    const resetToken =
        crypto.randomBytes(32)
            .toString("hex");


    console.log("RESET TOKEN:", resetToken);

    const hashedToken =
        crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

    user.passwordResetToken =
        hashedToken;

    user.passwordResetExpires =
        Date.now() +
        15 * 60 * 1000;

    await user.save();

    const resetUrl =
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
        user.email,
        "Reset Password",
        `
        <h2>Reset Password</h2>

        <p>
            Click below:
        </p>

        <a href="${resetUrl}">
            Reset Password
        </a>
        `
    );

    return {
        message:
            "Password reset email sent",
    };
};

const resetPassword = async (
    token,
    password
) => {

    const hashedToken =
        crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

    const user =
        await User.findOne({
            passwordResetToken:
                hashedToken,

            passwordResetExpires: {
                $gt: Date.now(),
            },
        });

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or Expired Reset Token"
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

    user.password =
        hashedPassword;

    user.passwordResetToken =
        undefined;

    user.passwordResetExpires =
        undefined;

    await user.save();

    return {
        message:
            "Password Reset Successful",
    };
};

const refreshAccessToken = async (
    refreshToken
) => {

    if (!refreshToken) {
        throw new ApiError(
            401,
            "Refresh Token Required"
        );
    }

    const decoded =
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

    const user =
        await User.findById(
            decoded.userId
        );

    if (!user) {
        throw new ApiError(
            404,
            "User Not Found"
        );
    }

    if (
        user.refreshToken !==
        refreshToken
    ) {
        throw new ApiError(
            401,
            "Invalid Refresh Token"
        );
    }

    const accessToken =
        generateAccessToken(
            user._id
        );

    return {
        accessToken,
    };
};

const logoutUser = async (
    userId
) => {

    const user =
        await User.findById(
            userId
        );

    if (!user) {
        throw new ApiError(
            404,
            "User Not Found"
        );
    }

    user.refreshToken = "";

    await user.save();

    return {
        message:
            "Logout Successful",
    };
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    refreshAccessToken,
    logoutUser,
    googleLogin,
};