import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Exercise from "../models/Exercise";
import Lesson from "../models/Lesson";
import Answer from "../models/Answer";

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

const evaluateExercise = async (traineeId: string, exerciseId: string) => {
    const answerObject = await Answer.findOne({ exerciseId: exerciseId, traineeId: traineeId });
    let userAnswers: number[] = [];

    if (answerObject) {
        userAnswers = answerObject.answers;
    }

    const exerciseObject = await Exercise.findById(exerciseId);

    if (exerciseObject && userAnswers) {
        const questions = exerciseObject.questions;

        const results = userAnswers.map((userAnswer: number, index: number) => {
            const question = questions[index];
            const correctAnswer = question.answerIndex;
            const isCorrect = userAnswer === correctAnswer;

            return {
                isCorrect,
                correctAnswer,
                userAnswer
            };
        });

        const correctAnswers = results.filter(
            (result: { isCorrect: boolean; userAnswer: number; correctAnswer: number }) => result.isCorrect
        ).length;

        const totalGrade = (correctAnswers / questions.length) * 100;

        return { totalGrade, results };
    } else {
        return { totalGrade: 0, results: [] };
    }
};

const readSubmission = (req: Request, res: Response, next: NextFunction) => {
    const exerciseId = req.params.exerciseId;
    const traineeId = req.body.traineeId;

    return Answer.findOne({
        exerciseId: exerciseId,
        traineeId: traineeId
    })
        .then((answer) => {
            if (answer) {
                return res.status(StatusCodes.OK).json({ answer });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const submitExercise = (req: Request, res: Response, next: NextFunction) => {
    const exerciseId = req.params.exerciseId;
    const traineeId = req.body.traineeId;

    // FIXME: It is assumed that the traineeId is already in the request body
    return Answer.findOne({ exerciseId: exerciseId, traineeId: traineeId })
        .then((answer) => {
            if (answer) {
                answer.set({ answers: req.body.answers });

                return answer
                    .save()
                    .then((answer) => {
                        evaluateExercise(traineeId, exerciseId).then((evaluation) => {
                            res.status(StatusCodes.CREATED).json({ evaluation });
                        });
                    })
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                const answer = new Answer({
                    _id: new mongoose.Types.ObjectId(),
                    exerciseId: exerciseId,
                    ...req.body
                });

                return answer
                    .save()
                    .then((answer) => {
                        evaluateExercise(traineeId, exerciseId).then((evaluation) => {
                            res.status(StatusCodes.CREATED).json({ evaluation });
                        });
                    })
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
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
    readSubmission,
    submitExercise
};
