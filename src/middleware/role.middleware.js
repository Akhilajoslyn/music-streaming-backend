const ApiError = require("../utils/ApiError");

const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    403,
                    "Access Denied"
                )
            );
        }

        next();
    };
};

module.exports = roleMiddleware;