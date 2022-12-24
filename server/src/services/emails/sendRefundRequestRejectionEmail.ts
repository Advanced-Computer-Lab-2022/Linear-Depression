import { sendEmail } from "./sendMailService";

export const sendRefundRequestRejectionEmail = async (email: string, reason: string) => {
    const context = {
        reason: reason,
        email: email
    };
    sendEmail(email, context, "refundRequestApproval", "Linear Depression | Refund Request Rejected 🟥");
};
