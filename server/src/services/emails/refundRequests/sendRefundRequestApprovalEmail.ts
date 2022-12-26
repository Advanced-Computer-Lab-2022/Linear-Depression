import { sendEmail } from "../sendMailService";

export const sendRefundRequestApprovalEmail = async (email: string, refundAmount: number) => {
    const context = {
        refundAmount: refundAmount,
        email: email
    };
    sendEmail(email, context, "refundRequestApproval", "Linear Depression | Refund Approved 🟩");
};
