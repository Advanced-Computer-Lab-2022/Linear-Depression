import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const htmlFile = fs.readFileSync(path.resolve(__dirname, '../../public/emails/passwordResetEmail.html'), 'utf-8');
    const template = handlebars.compile(htmlFile);
    const replacements = {
        url: `${process.env.FRONT_END_URL}/auth/reset?token=${token}`,
        email
    };
    const htmlToSend = template(replacements);
    
    const message = {
        from: process.env.PASSWORD_RESET_EMAIL_FROM,
        to: email,
        subject: 'Password Reset',
        html: htmlToSend
    };

    await transporter.sendMail(message);
};