import Admin from "../../models/Admin";

const HashPasswordInPayload = require("../services/HashPasswordInPayload");

export const AdminResource = {
    resource: Admin,
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
        },
        parent: {
            name: "Site Users",
            icon: "User"
        },
        listProperties: ["userName", "email", "firstName", "lastName"],
        editProperties: ["userName", "email", "firstName", "lastName", "password"],
        showProperties: ["userName", "email", "firstName", "lastName"]
    }
};
