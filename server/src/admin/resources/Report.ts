import Report from "../../models/Report";

export const ReportResource = {
    resource: Report,
    options: {
        properties: {
            _id: {
                isVisible: false
            }
        },
        actions: {
            new: {
                isAccessible: false,
                isVisible: false
            }
        },
        parent: {
            name: "Issues",
            icon: "Bug"
        },
        listProperties: ["userId", "subject", "threadId", "type", "seen", "status"],
        editProperties: ["seen", "status"],
        showProperties: ["userId", "subject", "description", "threadId", "type", "seen", "status"]
    }
};
