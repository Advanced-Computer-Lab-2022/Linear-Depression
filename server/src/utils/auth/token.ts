import jwt from "jsonwebtoken";
import { IUserModel } from "../../models/User";
import { UserTypes, UserTypesNames } from "../../enums/UserTypes";

export interface TokenPayload extends Object {
    id: string;
    type: UserTypes;
}

export const createToken = (user: IUserModel): string => {
    return jwt.sign(
        {
            id: user._id,
            type: UserTypesNames.get(user.__t)
        },
        process.env.JWT_SECRET as jwt.Secret,
        { expiresIn: "1d" }
    );
};

export const verifyToken = async (token: string): Promise<TokenPayload | jwt.JsonWebTokenError> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, decoded) => {
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
}