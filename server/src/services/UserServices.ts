import User from "../models/User";
import { createToken } from "../utils/auth/token";

export default class UserServices {
    static async login(email: string, password: string) {
        try {
            const user = await User.findOne({ email });

            if (!user || !user.isCorrectPassword(password)) {
                throw new Error();
            }

            return createToken(user);
        } catch (error) {
            throw new Error("Wrong email or password");
        }
    }
}
