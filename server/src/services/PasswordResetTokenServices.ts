import * as crypto from "crypto";

export default class PasswordResetTokenServices {
    static generateToken() {
        return crypto.randomBytes(32).toString("hex");
    }
}