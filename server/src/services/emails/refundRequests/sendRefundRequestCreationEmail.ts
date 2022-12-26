import { sendEmail } from "../sendMailService";

export const sendRefundRequestCreationEmail = async (email: string, courseName: string) => {
    const context = {
        courseName: courseName,
        email: email
    };
    sendEmail(email, context, "refundRequestCreation", `Linear Depression | Refund Request for Course ${courseName}`);
};
