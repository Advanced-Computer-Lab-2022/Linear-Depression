import { sendEmail } from "../sendMailService";

export const sendAccessRequestCreationEmail = async (email: string, courseTitle: string) => {
    const context = {
        courseTitle: courseTitle,
        email: email
    };
    sendEmail(email, context, "accessRequestCreation", `Linear Depression | Access Request for Course ${courseTitle}`);
};
