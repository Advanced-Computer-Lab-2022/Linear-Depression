import jwt from "jsonwebtoken";
import User, { IUserModel } from "../../models/User";
import { UserType, UserTypesNames } from "../../enums/UserTypes";
import { StatusCodes } from "http-status-codes";

export interface TokenPayload extends Object {
    id: string;
    userType: UserType;
}

export const createAccessToken = (user: IUserModel): string => {
    return jwt.sign(
        {
            id: user._id,
            userType: UserTypesNames.get(user.__t)
        },
        process.env.JWT_ACCESS_TOKEN_SECRET as jwt.Secret,
        { expiresIn: "15m" }
    );
};

export const createRefreshToken = (user: IUserModel): string => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_REFRESH_TOKEN_SECRET as jwt.Secret,
        { expiresIn: "7d" }
    );
};

export const verifyRefreshToken = (refreshToken: string): Promise<IUserModel> => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as jwt.Secret, async (err, decoded) => {
            if (err) {
                return reject({
                    status: StatusCodes.FORBIDDEN,
                    message: "Invalid refresh token"
                });
            }
            const user = await User.findOne({ _id: (decoded as TokenPayload).id });

            if (!user) {
                return reject({
                    status: StatusCodes.UNAUTHORIZED,
                    message: "User not found"
                });
            }

            return resolve(user);
        });
    });
};

export const verifyAccessToken = async (accessToken: string): Promise<TokenPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as jwt.Secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }

            resolve(decoded as TokenPayload);
        });
    });
};

export const decodeToken = (token: string): TokenPayload | null => {
    try {
        return jwt.decode(token) as TokenPayload;
    } catch (e) {
        return null;
    }
};
