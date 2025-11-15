import { logger } from "../config/logger.js";

export function errorHandler(err, req, res, next) {
    logger.error({
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        body: req.body,
        params: req.params,
        query: req.query,
    });

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}
