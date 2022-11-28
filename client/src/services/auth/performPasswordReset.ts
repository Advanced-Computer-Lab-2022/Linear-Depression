import axios from "axios";

export default async function performPasswordReset(token: string, password: string) {
    return new Promise((resolve, reject) => {
        axios
            .post("/auth/reset", { token, password })
            .then(res => {
                if (res.data.success) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
            .catch(err => reject(err));
    });
}