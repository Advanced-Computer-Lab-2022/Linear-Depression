import axios from "axios";

export default async function isValidPasswordResetToken(token: string)  {
    return new Promise((resolve, reject) => {
        axios
            .get(`/auth/reset?token=${token}`)
            .then(res => {
                if (res.data.success) {
                    resolve(res.data.email as string);
                } else {
                    reject(false);
                }
            })
            .catch(err => reject(err));
    });
}