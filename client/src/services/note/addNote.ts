import axios from "axios";

import { config } from "@internals/config";

const addNote = (lessonId: string, content: string) => {
    const ADD_NOTE_URL = `${config.API_URL}/me/lessons/${lessonId}/notes`;
    console.log("content", content);
    return new Promise((resolve, reject) => {
        axios
            .post(ADD_NOTE_URL, { content }, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addNote;
