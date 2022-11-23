import axios from "axios";
import { config } from "@internals/config";

const addCourse = (course: {}) => {
    const ADD_COURSE_URL = `${config.API_URL}/courses`;
    return new Promise((resolve, reject) => {
        axios
            .post(ADD_COURSE_URL, course, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addCourse;
