import Course from "../../models/Course";
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
                icon: "Tag",
                component: AdminJS.bundle("../components/courses/AddPromotion"),
                handler: async (request: any, response: any, context: any) => {
                    const { records } = context;

                    return {
                        records: records.map((record: any) => record.toJSON(context.currentAdmin))
                    };
                }
            }
        },
        parent: {
            name: "Content",
            icon: "Book"
        }
    },
    listProperties: ["title", "description", "price", "subject", "averageRating", "status"],
    editProperties: ["title", "description", "price", "subject", "averageRating"],
    showProperties: ["title", "description", "price", "subject", "averageRating", "status"]
};
