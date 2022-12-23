import User from "../User";

interface Reply {
    _id: string;
    userId: string;
    user: User;
    message: string;
    createdAt: string;
}

interface ReportThread {
    _id: string;
    replies: Reply[];
    createdAt: string;
    updatedAt: string;
}

export default ReportThread;
