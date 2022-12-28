import { ReportType } from "@internals/types";

interface ReportFormProps {
    type: ReportType;
    subject: string;
    description: string;
    courseId?: string;
}

export default ReportFormProps;
