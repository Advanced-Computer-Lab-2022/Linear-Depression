import axios from "axios";

import { config } from "@internals/config";

const editProfile = (profile: {}) => {
    const EDIT_PROFILE_URL = `${config.API_URL}/me/profile`;
    return new Promise((resolve, reject) => {
        axios
            .put(EDIT_PROFILE_URL, profile, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export default editProfile;
