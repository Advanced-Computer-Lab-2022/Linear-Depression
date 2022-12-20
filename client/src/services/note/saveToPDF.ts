import axios from "axios";

import { config } from "@internals/config";

const saveToPDF = (lessonId: string, noteId: string): Promise<any> => {
    const API_URL = `${config.API_URL}/me/lessons/${lessonId}/notes/${noteId}/pdf`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default saveToPDF;
