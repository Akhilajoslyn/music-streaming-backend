const logger = require("../utils/logger");

const errorHandler = (
    err,
    req,
    res,
    next
) => {
    let statusCode = err.statusCode || 500;

    let message =
        err.message || "Internal Server Error";

    logger.error({
        message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
    });

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined,
    });
};

module.exports = errorHandler;