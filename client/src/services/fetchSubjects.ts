import axios from "axios";
import { config } from "../config/config";

const fetchSubjects = (): Promise<{ data: never[]; loading: boolean; error: null }> => {
    let apiURL = `${config.API_URL}/courses/subjects`;
    return new Promise((resolve, reject) => {
        axios
            .get(apiURL)
            .then((res) => {
                resolve({
                    data: res.data.subjects,
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

export { fetchSubjects };
