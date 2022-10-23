import User from "../../models/User";

const HashPasswordInPayload = require("../services/HashPasswordInPayload");

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
        },
        actions: {
            new: {
                before: async (request: any) => {
                    return await HashPasswordInPayload.execute(request);
                }
            }
        }
    }
};
