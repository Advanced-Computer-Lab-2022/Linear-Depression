import Admin from "../../models/Admin";
import HashPasswordInPayload from "../hooks/hashPasswordInPayload";

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
                before: (request: any) => {
                    if (request.payload.password) {
                        request.payload.passwordHash = request.payload.password;
                    }
                    return request;
                }
            },
            edit: {
                before: async (request: any) => {
                    return await HashPasswordInPayload(request);
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
