import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Instructor from "../models/Instructor";

const createInstructor = (req: Request, res: Response, next: NextFunction) => {
    const instructor = new Instructor({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return instructor
        .save()
        .then((instructor) => res.status(StatusCodes.CREATED).json({ instructor }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const listInstructors = (req: Request, res: Response, next: NextFunction) => {
    return Instructor.find(req.query)
        .then((instructors) => res.status(StatusCodes.OK).json({ instructors }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readInstructor = (req: Request, res: Response, next: NextFunction) => {
    const instructorId = req.params.instructorId;

    return Instructor.findById(instructorId)
        .then((instructor) =>
            instructor
                ? res.status(StatusCodes.OK).json({ instructor })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateInstructor = (req: Request, res: Response, next: NextFunction) => {
    const instructorId = req.params.instructorId;

    return Instructor.findById(instructorId)
        .then((instructor) => {
            if (instructor) {
                instructor.set(req.body);

                return instructor
                    .save()
                    .then((instructor) => res.status(StatusCodes.CREATED).json({ instructor }))
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteInstructor = (req: Request, res: Response, next: NextFunction) => {
    const instructorId = req.params.instructorId;

    return Instructor.findByIdAndDelete(instructorId)
        .then((instructor) =>
            instructor
                ? res.status(StatusCodes.OK).json({ instructor, message: "Deleted" })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default { createInstructor, listInstructors, readInstructor, updateInstructor, deleteInstructor };
