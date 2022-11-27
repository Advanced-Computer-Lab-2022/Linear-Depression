import Instructor from "../../models/Instructor";

export const InstructorResource = {
    resource: Instructor,
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
        listProperties: ["userName", "email", "firstName", "lastName"],
        editProperties: ["userName", "email", "firstName", "lastName", "password"],
        showProperties: ["userName", "email", "firstName", "lastName"]
    }
};
