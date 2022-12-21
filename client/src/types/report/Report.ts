import User from "../User";
import { ReportThread } from "@internals/types";
import { ReportType } from "@internals/types";

interface Report {
    _id: string;
    user?: User;
    thread?: ReportThread;
    courseId?: string;
    type: ReportType;
    subject: string;
    description: string;
    seen: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default Report;
