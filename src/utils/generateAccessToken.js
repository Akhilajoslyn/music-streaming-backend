const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
};

module.exports = generateAccessToken;