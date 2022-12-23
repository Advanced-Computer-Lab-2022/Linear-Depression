import AccessRequest from "../../models/AccessRequest";

export const AccessRequestResource = {
    resource: AccessRequest,
    options: {
        parent: {
            name: "Requests"
        },
        properties: {
            _id: {
                isVisible: false
            }
        },
        actions: {
            new: {
                isAccessible: false,
                isVisible: false
            },
            edit: {
                isAccessible: false,
                isVisible: false
            },
            delete: {
                isAccessible: false,
                isVisible: false
            },
            approve: {
                actionType: "record",
                icon: "Accept",
                isVisible: true,
                component: false,
                handler: async (request: any, response: any, context: any) => {
                    const { record } = context;
                    await record.update({
                        status: "APPROVED"
                    });
                    return {
                        record: record.toJSON(context.currentAdmin)
                    };
                }
            },
            reject: {
                actionType: "record",
                icon: "Reject",
                isVisible: true,
                component: false,
                handler: async (request: any, response: any, context: any) => {
                    const { record } = context;
                    await record.update({
                        status: "REJECTED"
                    });
                    return {
                        record: record.toJSON(context.currentAdmin)
                    };
                }
            }
        },
        listProperties: ["traineeId", "courseId", "status"],
        showProperties: ["traineeId", "courseId", "status"],
        editProperties: ["status"]
    }
};
