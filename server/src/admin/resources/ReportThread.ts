import ReportThread from "../../models/ReportThread";
import AdminJS from "adminjs";

export const ReportThreadResource = {
    resource: ReportThread,
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
            },
            edit: {
                isAccessible: false,
                isVisible: false
            },
            show: {
                component: AdminJS.bundle("../components/reportsThreads/ShowPage")
            }
        },
        navigation: false
    },
    listProperties: ["reportId", "replies"],
    editProperties: ["reportId", "replies"],
    showProperties: ["reportId", "replies"]
};
