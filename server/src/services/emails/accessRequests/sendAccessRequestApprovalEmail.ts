import { sendEmail } from "../sendMailService";

export const sendAccessRequestApprovalEmail = async (email: string, courseTitle: string) => {
    const context = {
        courseTitle: courseTitle,
        email: email
    };
    sendEmail(email, context, "accessRequestApproval", "Linear Depression | Access Approved 🟩");
};
