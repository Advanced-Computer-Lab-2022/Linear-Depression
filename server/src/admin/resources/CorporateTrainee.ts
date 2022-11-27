import CorporateTrainee from "../../models/CorporateTrainee";

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
                before: (request: any) => {
                    if (request.payload.password) {
                        request.payload.passwordHash = request.payload.password;
                    }
                    return request;
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
