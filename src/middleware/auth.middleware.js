const jwt = require("jsonwebtoken");

const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const authMiddleware = async (
    req,
    res,
    next
) => {
    try {
        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return next(
                new ApiError(
                    401,
                    "Access Token Required"
                )
            );
        }
        console.log("Authorization Header:", req.headers.authorization);
        const token =
            authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decoded.userId
        ).select("-password -refreshToken");

        if (!user) {
            return next(
                new ApiError(
                    401,
                    "User Not Found"
                )
            );
        }

        req.user = user;

        next();
    } catch (error) {
        next(
            new ApiError(
                401,
                "Invalid or Expired Token"
            )
        );
    }
};

module.exports = authMiddleware;