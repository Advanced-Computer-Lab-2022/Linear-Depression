import { sendEmail } from "../sendMailService";

export const sendAccessRequestRejectionEmail = async (email: string, courseTitle: string) => {
    const context = {
        courseTitle: courseTitle,
        email: email
    };
    sendEmail(email, context, "accessRequestRejection", "Linear Depression | Access Request Rejected 🟥");
};
