import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { AdminResource } from "./resources/Admin";
import { InstructorResource } from "./resources/Instructor";
import { CorporateTraineeResource } from "./resources/CorporateTrainee";
import { ReportResource } from "./resources/Report";
import Course from "../models/Course";
import Rating from "../models/Rating";
import User from "../models/User";
import ReportThread from "../models/ReportThread";

import enLocale from "./locale/en";

export function CreateAdminJS(app: any) {
    const admin = new AdminJS({
        resources: [
            InstructorResource,
            CorporateTraineeResource,
            AdminResource,
            ReportResource,
            {
                resource: Course,
                options: {
                    navigation: false
                }
            },
            {
                resource: Rating,
                options: {
                    navigation: false
                }
            },
            {
                resource: User,
                options: {
                    navigation: false
                }
            },
            {
                resource: ReportThread,
                options: {
                    navigation: false
                }
            }
        ],
        dashboard: {
            component: AdminJS.bundle("./components/dashboard")
        },
        assets: {
            styles: ["css/dashboard.css"]
        },
        branding: {
            companyName: "Linear Depression",
            logo: false, //TODO: Add logo
            withMadeWithLove: false
        },
        locale: enLocale
    });

    const router = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, router);
}
