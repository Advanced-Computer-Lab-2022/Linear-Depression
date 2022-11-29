import axios from "axios";

const isValidPasswordResetToken = (token: string) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/auth/reset?token=${token}`)
            .then((res) => {
                if (res.data.success) {
                    resolve(res.data.email as string);
                } else {
                    reject(false);
                }
            })
            .catch((err) => reject(err));
    });
};

export default isValidPasswordResetToken;
