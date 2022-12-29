import axios from "axios";

import { config } from "@internals/config";

const fetchAllCourses = (searchParams: URLSearchParams): Promise<never[]> => {
    const FILTERS = searchParams.toString();
    const API_URL = `${config.API_URL}/courses?${FILTERS}`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL)
            .then((res) => {
                resolve(res.data.courses);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchAllCourses;
