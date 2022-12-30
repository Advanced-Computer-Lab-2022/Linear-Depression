import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

const rateLimiter = (requestsPerMinute: number = 120) => {
    return rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: requestsPerMinute, // Limit each IP to n requests per `window` per minute
        message: { message: `Too many requests from this IP, please try again after a 60 second pause` },
        handler: (req: Request, res: Response, next: NextFunction, options: any) => {
            res.status(options.statusCode).send(options.message);
        },
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false // Disable the `X-RateLimit-*` headers
    });
};

export default rateLimiter;
