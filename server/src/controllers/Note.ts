import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Note from "../models/Note";
import { mdToPdf } from "md-to-pdf";

const createNote = async (req: Request, res: Response, _next: NextFunction) => {
    const lessonId = req.params.lessonId;
    const traineeId = req.body.userId;

    console.log(req.body);

    const note = new Note({
        lessonId,
        traineeId,
        content: req.body.content
    });

    note.save()
        .then((note) => {
            res.status(StatusCodes.CREATED).json({ note });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }));
};

const readNote = async (req: Request, res: Response, _next: NextFunction) => {
    const lessonId = req.params.lessonId;
    const traineeId = req.body.userId;

    Note.findOne({
        lessonId,
        traineeId
    })
        .then((note) => {
            if (note) {
                res.status(StatusCodes.OK).json({ note });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ error: "Note not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }));
};

const updateNote = async (req: Request, res: Response, _next: NextFunction) => {
    const noteId = req.params.noteId;

    Note.findByIdAndUpdate(noteId)
        .then((note) => {
            if (note) {
                note.content = req.body.content;

                note.save()
                    .then((note) => {
                        res.status(StatusCodes.OK).json({ note });
                    })
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }));
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ error: "Note not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }));
};

const getPDF = async (req: Request, res: Response, _next: NextFunction) => {
    const { noteId } = req.params;
    console.log(noteId);

    Note.findById(noteId)
        .then(async (note) => {
            if (note) {
                await mdToPdf({ content: note.content }, { dest: `./src/files/${noteId}.pdf` });
                res.status(StatusCodes.OK).json({ note });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ error: "Note not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }));
};

export default {
    createNote,
    readNote,
    updateNote,
    getPDF
};
