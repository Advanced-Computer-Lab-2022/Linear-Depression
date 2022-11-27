import User from "../../models/User";

export const UserResource = {
    resource: User,
    options: {
        properties: {
            passwordHash: {
                isVisible: false
            },
            password: {
                type: "password",
                isVisible: {
                    edit: true,
                    list: false,
                    filter: false,
                    show: false
                },
                isRequired: true
            }
        }
    }
};
