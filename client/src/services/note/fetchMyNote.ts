import axios from "axios";

import { config } from "@internals/config";
import { Note } from "@internals/types";

const fetchMyNote = (lessonId: string): Promise<Note> => {
    const API_URL = `${config.API_URL}/me/lessons/${lessonId}/notes`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true
            })
            .then((res) => {
                resolve(res.data.note);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyNote;
