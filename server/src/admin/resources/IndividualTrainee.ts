import IndividualTrainee from "../../models/IndividualTrainee";

export const IndividualTraineeResource = {
    resource: IndividualTrainee,
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
        parent: {
            name: "Site Users",
            icon: "User"
        },
        listProperties: ["userName", "email", "firstName", "lastName", "gender", "wallet"],
        showProperties: ["userName", "email", "firstName", "lastName", "gender", "wallet"]
    }
};
