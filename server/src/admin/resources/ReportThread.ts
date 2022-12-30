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
                component: AdminJS.bundle("../components/report.thread/ShowPage")
            },
            delete: {
                isAccessible: false,
                isVisible: false
            }
        },
        navigation: false
    },
    listProperties: ["reportId", "replies"],
    editProperties: ["reportId", "replies"],
    showProperties: ["reportId", "replies"]
};
