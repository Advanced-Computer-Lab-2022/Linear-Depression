import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { AdminResource } from "./resources/Admin";
import { InstructorResource } from "./resources/Instructor";
import { CorporateTraineeResource } from "./resources/CorporateTrainee";
import Course from "../models/Course";

export function CreateAdminJS(app: any) {
    const admin = new AdminJS({
        resources: [
            InstructorResource,
            CorporateTraineeResource,
            AdminResource,
            {
                resource: Course,
                options: {
                    navigation: false
                }
            }
        ]
    });

    const router = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, router);
}
