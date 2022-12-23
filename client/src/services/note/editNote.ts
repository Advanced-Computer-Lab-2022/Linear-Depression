import axios from "axios";

import { config } from "@internals/config";
import { Note } from "@internals/types";

const editNote = (lessonId: string, noteId: string, note: Note) => {
    const EDIT_NOTE_URL = `${config.API_URL}/me//lessons/${lessonId}/notes/${noteId}`;
    return new Promise((resolve, reject) => {
        axios
            .put(EDIT_NOTE_URL, note, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export default editNote;
