import { config } from "@internals/config";

const fetchProfile = (accessToken: string) => {
    const API_URL = `${config.API_URL}/me/profile`;

    return new Promise((resolve, reject) => {
        fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchProfile;
