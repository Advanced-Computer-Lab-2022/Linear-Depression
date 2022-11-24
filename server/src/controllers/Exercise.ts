import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Exercise from "../models/Exercise";
import Lesson from "../models/Lesson";

const createExercise = (req: Request, res: Response, next: NextFunction) => {
    const lessonId = req.params.lessonId;

    const exercise = new Exercise({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return exercise
        .save()
        .then((exercise) => {
            Lesson.findByIdAndUpdate(lessonId, { $push: { exercises: exercise._id } }).then(() => {
                res.status(StatusCodes.CREATED).json({ exercise });
            });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const listExercises = (req: Request, res: Response, next: NextFunction) => {
    return Exercise.find(req.query)
        .then((exercises) => res.status(StatusCodes.OK).json({ exercises }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readExercise = (req: Request, res: Response, next: NextFunction) => {
    const exerciseId = req.params.exerciseId;

    return Exercise.findById(exerciseId)
        .then((exercise) =>
            exercise
                ? res.status(StatusCodes.OK).json({ exercise })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateExercise = (req: Request, res: Response, next: NextFunction) => {
    const exerciseId = req.params.exerciseId;

    return Exercise.findById(exerciseId)
        .then((exercise) => {
            if (exercise) {
                exercise.set(req.body);

                return exercise
                    .save()
                    .then((exercise) => res.status(StatusCodes.CREATED).json({ exercise }))
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteExercise = (req: Request, res: Response, next: NextFunction) => {
    const exerciseId = req.params.exerciseId;
    const lessonId = req.params.lessonId;

    return Exercise.findByIdAndDelete(exerciseId)
        .then((exercise) => {
            if (exercise) {
                Lesson.findByIdAndUpdate(lessonId, { $pull: { exercises: exercise._id } }).then(() => {
                    res.status(StatusCodes.OK).json({ exercise });
                });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const evaluateExercise = (req: Request, res: Response, next: NextFunction) => {
    const exerciseId = req.params.exerciseId;

    return Exercise.findById(exerciseId)
        .then((exercise) => {
            if (exercise) {
                const { answers } = req.body;
                const questions = exercise.questions;

                const results = answers.map((answer: number, index: number) => {
                    const question = questions[index];
                    const correctAnswer = question.answerIndex;
                    const isCorrect = correctAnswer === answer;

                    return {
                        isCorrect,
                        correctAnswer
                    };
                });

                // calculate correct answers
                const correctAnswers = results.filter(
                    (result: { isCorrect: boolean; correctAnswer: number }) => result.isCorrect
                ).length;

                const totalGrade = (correctAnswers / questions.length) * 100;

                return res.status(StatusCodes.OK).json({ results, totalGrade });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default {
    createExercise,
    listExercises,
    readExercise,
    updateExercise,
    deleteExercise,
    evaluateExercise
};
