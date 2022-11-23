import axios from "axios";
import { config } from "@internals/config";
import { Course as ICourseProps } from "@internals/types";

const fetchCourseById = (id: string): Promise<ICourseProps> => {
    const COURSE_FETCH_URL = `${config.API_URL}/courses/${id}`;
    return new Promise((resolve, reject) => {
        axios
            .get(COURSE_FETCH_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data.course);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchCourseById;
