import axios from "axios";
import { config } from "../config/config";
import ICourseProps from "../types/Course";

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
