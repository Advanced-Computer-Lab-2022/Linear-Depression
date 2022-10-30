import axios from "axios";
import { config } from "../config/config";
import ICourseProps from "../types/Course";
import { User } from "../types/User";
import { constructFilterURL } from "./constructFilterURL";

const fetchCourses = (
    searchParams: URLSearchParams,
    id?: string,
    type?: User
): Promise<{ data: never[]; loading: boolean; error: null }> => {
    let apiURL = `${config.API_URL}/courses?`;
    apiURL = constructFilterURL(apiURL, searchParams);
    if (type == User.INSTRUCTOR && id) {
        apiURL += `&instructor=${id}`;
    }
    return new Promise((resolve, reject) => {
        axios
            .get(apiURL, {
                withCredentials: true
            })
            .then((res) => {
                resolve({
                    data: res.data.courses,
                    loading: false,
                    error: null
                });
            })
            .catch((err) => {
                reject({
                    data: [],
                    loading: false,
                    error: err
                });
            });
    });
};

export { fetchCourses };
