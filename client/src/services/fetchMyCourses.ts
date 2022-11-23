import { config } from "../config/config";
import axios from "axios";

const fetchMyCourses = (searchParams: URLSearchParams): Promise<never[]> => {
    const FILTERS = searchParams.toString();
    const API_URL = `${config.API_URL}/courses?instructor=636020ca8701caab59e5dc30&${FILTERS}`;
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
