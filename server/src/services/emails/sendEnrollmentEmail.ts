import { sendEmail } from "./sendMailService";

export const sendEnrollmentEmail = async (email: string, courseName: string) => {
    const context = {
        courseName: courseName,
        email: email
    };
    sendEmail(email, context, "instructorCredit", `Linear Depression | Course ${courseName} Enrollment 🎉`);
};
