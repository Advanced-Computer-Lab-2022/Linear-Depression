import Report from "../../models/Report";

export const ReportResource = {
    resource: Report,
    options: {
        parent: {
            name: "Issues",
            icon: "Bug"
        },
        properties: {
            _id: {
                isVisible: false
            },
            description: {
                type: "textarea",
                props: {
                    rows: 10
                }
            }
        }
    }
};
