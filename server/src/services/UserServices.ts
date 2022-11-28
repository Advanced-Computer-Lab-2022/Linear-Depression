import User from "../models/User";
import { createToken, decodeToken, TokenPayload } from "../utils/auth/token";
import { UserTypes } from "../enums/UserTypes";

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

    static async getUserType(token: string) {
        if (token) {
            const decodedToken: TokenPayload = decodeToken(token) as TokenPayload;
            return decodedToken.type;
        } else {
            return UserTypes.GUEST;
        }
    }
}
