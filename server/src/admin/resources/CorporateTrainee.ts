import CorporateTrainee from "../../models/CorporateTrainee";

const HashPasswordInPayload = require("../services/HashPasswordInPayload");

export const CorporateTraineeResource = {
    resource: CorporateTrainee,
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
        listProperties: ["userName", "email", "firstName", "lastName", "corporate", "status", "expiredAt"],
        editProperties: ["userName", "email", "firstName", "lastName", "password", "corporate", "gender", "expiredAt"],
        showProperties: ["userName", "email", "firstName", "lastName", "corporate", "gender", "expiredAt", "status"]
    }
};
