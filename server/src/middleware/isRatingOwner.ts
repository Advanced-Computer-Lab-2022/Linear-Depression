import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Rating from "../models/Rating";

const isRatingOwner = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const { ratingId } = req.params;

    const rating = await Rating.findById(ratingId);

    if (userId !== rating?.traineeID) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not the owner of this rating" });
    }

    next();
};

export default isRatingOwner;
