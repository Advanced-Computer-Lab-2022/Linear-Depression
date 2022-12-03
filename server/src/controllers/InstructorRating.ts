import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Rating from "../models/Rating";
import Instructor from "../models/Instructor";
import { serializeRating } from "./CourseRating";

const listRatings = async (req: Request, res: Response) => {
    const instructorId = req.body.userId;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "You are not authorized to view this page"
        });
    }
    const instructorRatingIds = instructor?.ratings;
    const ratings = await Rating.find({ _id: { $in: instructorRatingIds }, comment: { $exists: true } })
        .populate("IndividualTrainee", "firstName lastName")
        .populate("CorporateTrainee", "firstName lastName");
    const ratingsWithTrainee = ratings.map((rating) => serializeRating(rating));
    res.status(StatusCodes.OK).json({ ratings: ratingsWithTrainee });
};

const createRating = async (req: Request, res: Response) => {
    const instructorId = req.params.instructorId;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "You are not authorized to view this page"
        });
    }

    await Rating.create(req.body)
        .then((rating) => {
            instructor?.ratings.push(rating._id);
            instructor?.save();
            res.status(StatusCodes.CREATED).json({ rating });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

export default {
    listRatings,
    createRating
};
