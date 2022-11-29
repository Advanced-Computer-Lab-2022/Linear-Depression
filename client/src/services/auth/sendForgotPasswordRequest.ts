import axios from "axios";

const sendForgotPasswordRequest = (email: string) => {
    return new Promise((resolve, reject) => {
        axios
            .post("/auth/forgot", { email })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};

export default sendForgotPasswordRequest;
