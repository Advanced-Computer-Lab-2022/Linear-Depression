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
                    const { record, currentAdmin } = context;
                    AccessRequest.findById(record.params._id).then(async (accessRequest) => {
                        await accessRequest!.approve();
                    });
                    return {
                        record: record.toJSON(currentAdmin),
                        msg: "Access Request Approved"
                    };
                }
            },
            reject: {
                actionType: "record",
                icon: "Reject",
                isVisible: true,
                component: false,
                handler: async (request: any, response: any, context: any) => {
                    const { record, currentAdmin } = context;
                    AccessRequest.findById(record.params._id).then(async (accessRequest) => {
                        await accessRequest!.reject();
                    });
                    return {
                        record: record.toJSON(currentAdmin),
                        msg: "Access Request Rejected"
                    };
                }
            }
        },
        listProperties: ["traineeId", "courseId", "status"],
        showProperties: ["traineeId", "courseId", "status"],
        editProperties: ["status"]
    }
};
