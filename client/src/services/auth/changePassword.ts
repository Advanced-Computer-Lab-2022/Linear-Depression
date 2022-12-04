import axios from "axios";

const changePassword = (oldPassword: string, newPassword: string) => {
    const CHANGE_PASSWORD_URL = "/auth/change";
    return new Promise((resolve, reject) => {
        axios
            .post(CHANGE_PASSWORD_URL, { oldPassword, newPassword })
            .then((res) => {
                if (res.data.success) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
            .catch((err) => reject(err));
    });
};

export default changePassword;
