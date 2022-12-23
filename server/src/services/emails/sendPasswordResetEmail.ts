import { sendEmail } from "./sendMailService";

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const context = {
        url: `${process.env.FRONT_END_URL}/auth/reset?token=${token}`,
        email
    };
    await sendEmail(email, context, "passwordResetEmail", "Linear Depression | Password Reset");
};
