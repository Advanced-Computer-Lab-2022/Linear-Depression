import nodemailer from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";

export const sendEmail = async (
    email: string,
    context: any,
    templateName: string,
    subject: string,
    attachments?: Array<any>
) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const TEMPLATE_DIR = "src/services/emails/templates";
    const TEMPLATE_PATH = `${TEMPLATE_DIR}/${templateName}.html`;
    // Register partials
    handlebars.registerPartial("header", fs.readFileSync(`${TEMPLATE_DIR}/partials/header.html`, "utf-8"));
    handlebars.registerPartial("footer", fs.readFileSync(`${TEMPLATE_DIR}/partials/footer.html`, "utf-8"));

    const htmlFile = fs.readFileSync(TEMPLATE_PATH, "utf-8");
    const template = handlebars.compile(htmlFile);
    const htmlToSend = template(context);

    const message = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        html: htmlToSend,
        attachments: attachments
    };

    await transporter.sendMail(message).catch((err) => {
        console.log(err);
    });
};
