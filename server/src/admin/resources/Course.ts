import list from "adminjs/types/src/frontend/components/actions/list";
import recordInList from "adminjs/types/src/frontend/components/app/records-table/record-in-list";
import Course from "../../models/Course";
import AddPromotion from "../components/AddPromotion";
import AdminJS from "adminjs";

export const CourseResource = {
    resource: Course,
    options: {
        properties: {
            _id: {
                isVisible: false
            },
            ratings: {
                isVisible: false
            },
            instructor: {
                isVisible: false
            }
        },
        actions: {
            new: {
                isAccessible: false,
                isVisible: false
            },
            addPromotion: {
                actionType: "bulk",
                icon: "AddPromotion",
                component: AdminJS.bundle("../components/AddPromotion"),
                handler: async (request: any, response: any, context: any) => {
                    const { records } = context;

                    return {
                        records: records.map((record: any) => record.toJSON(context.currentAdmin))
                    };
                }
            }
        }
    },
    listProperties: ["title", "description", "price", "subject", "averageRating"],
    editProperties: ["title", "description", "price", "subject", "averageRating"],
    showProperties: ["title", "description", "price", "subject", "averageRating"]
};
