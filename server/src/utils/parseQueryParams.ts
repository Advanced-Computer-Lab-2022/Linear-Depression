import { Request, Response, NextFunction } from "express";

const parseQueryParams = (req: Request, res: Response, next: NextFunction) => {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, (match) => `$${match}`);
    req.query = JSON.parse(queryStr);
    //adjust price in query

    next();
};

export { parseQueryParams };
