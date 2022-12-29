import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

import Lesson from "../models/Lesson";
import Exercise from "../models/Exercise";
import Rating from "../models/Rating";
import Promotion from "../models/Promotion";
import Enrollment from "../models/Enrollment";
import User from "../models/User";

import { AdminResource } from "./resources/Admin";
import { InstructorResource } from "./resources/Instructor";
import { AccessRequestResource } from "./resources/AccessRequest";
import { CorporateTraineeResource } from "./resources/CorporateTrainee";
import { ReportResource } from "./resources/Report";
import { ReportThreadResource } from "./resources/ReportThread";
import { CourseResource } from "./resources/Course";
import { RefundRequestResource } from "./resources/RefundRequest";
import { IndividualTraineeResource } from "./resources/IndividualTrainee";

import enLocale from "./locale/en";

export function CreateAdminJS(app: any) {
    const admin = new AdminJS({
        resources: [
            InstructorResource,
            CorporateTraineeResource,
            IndividualTraineeResource,
            AdminResource,
            ReportResource,
            ReportThreadResource,
            CourseResource,
            AccessRequestResource,
            RefundRequestResource,
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
                resource: Enrollment,
                options: {
                    navigation: false
                }
            },
            {
                resource: Promotion,
                options: {
                    navigation: false
                }
            },
            {
                resource: Exercise,
                options: {
                    navigation: false
                }
            },
            {
                resource: Lesson,
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

    const authenticate = async (email: string, password: string) => {
        const user = await User.findOne({ email, __t: "Admin" });

        if (user && user.isCorrectPassword(password)) {
            return user;
        }

        return null;
    };

    const router = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            cookieName: process.env.ADMIN_COOKIE_NAME as string,
            cookiePassword: process.env.ADMIN_COOKIE_PASSWORD as string,
            authenticate
        },
        null,
        {
            resave: false,
            saveUninitialized: true,
            secret: process.env.ADMIN_COOKIE_PASSWORD as string
        }
    );

    app.use(admin.options.rootPath, router);
}
