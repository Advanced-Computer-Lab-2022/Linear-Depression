import axios from "axios";

export default async function sendForgotPasswordRequest(email: string) {
    return new Promise((resolve, reject) => {
        axios
            .post("/auth/forgot", { email })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}