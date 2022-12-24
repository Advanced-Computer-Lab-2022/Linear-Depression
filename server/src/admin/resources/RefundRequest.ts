import RefundRequest from "../../models/RefundRequest";

export const RefundRequestResource = {
    resource: RefundRequest,
    options: {
        parent: {
            name: "Requests"
        },
        actions: {
            new: {
                isAccessible: false
            },
            edit: {
                isAccessible: false
            },
            delete: {
                isAccessible: false
            },
            approve: {
                actionType: "record",
                component: false,
                icon: "Accept",
                handler: async (_request: any, _response: any, context: any) => {
                    const { record, currentAdmin } = context;
                    RefundRequest.findById(record.params._id).then(async (refundRequest) => {
                        await refundRequest!.approve();
                    });
                    return {
                        record: record.toJSON(currentAdmin),
                        msg: "Refund Request Approved"
                    };
                }
            },
            reject: {
                actionType: "record",
                component: false,
                icon: "fas fa-times",
                handler: async (_request: any, _response: any, context: any) => {
                    const { record, currentAdmin } = context;
                    RefundRequest.findById(record.params._id).then(async (refundRequest) => {
                        await refundRequest!.reject();
                    });
                    return {
                        record: record.toJSON(currentAdmin),
                        msg: "Refund Request Rejected"
                    };
                }
            }
        }
    }
};
