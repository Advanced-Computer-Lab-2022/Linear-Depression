import * as Report from "./report.json";
import * as ReportThread from "./report.thread.json";

const enLocale = {
    language: "en",
    translations: {
        resources: {
            Report,
            ReportThread
        },
        labels: {
            Admin: "Admins",
            Instructor: "Instructors",
            CorporateTrainee: "Corporate Trainees",
            Report: "Reports",
            Course: "Courses",
            loginWelcome: "Admin Dashboard"
        },
        messages: {
            loginWelcome: ""
        }
    }
};

export default enLocale;
