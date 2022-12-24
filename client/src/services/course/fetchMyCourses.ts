import axios from "axios";

import { config } from "@internals/config";

const fetchMyCourses = (searchParams: URLSearchParams): Promise<never[]> => {
    const FILTERS = searchParams.toString();
    const API_URL = `${config.API_URL}/me/courses?${FILTERS}`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true
            })
            .then((res) => {
                resolve(res.data.courses);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyCourses;
