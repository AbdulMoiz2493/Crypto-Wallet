
const errorMiddleware = ((err, req, res, next) => {
    let { statusCode, message, errors, stack } = err;

    statusCode = statusCode || 500;
    message = message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
        stack: process.env.NODE_ENV === 'development' ? stack : undefined,
    });
});


export default errorMiddleware;