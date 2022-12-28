import React from "react";
import { useParams } from "react-router-dom";

import {
    ReportPageHeader,
    ReportPageContainer,
    ThreadCard,
    ThreadSubjectDivider,
    ThreadReplyForm,
    ThreadContainer
} from "@internals/components";
import { useFetchReport } from "@internals/hooks";

const ReportThread: React.FC = () => {
    const { reportId } = useParams();
    const { report, loading } = useFetchReport(reportId);

    return (
        <ReportPageContainer width={1200} loading={loading}>
            {!loading && (
                <>
                    <ReportPageHeader reportSubject={report.subject} />
                    <ThreadContainer>
                        <ThreadCard
                            authorName={`${report.user.firstName} ${report.user.lastName}`}
                            authorType={report.user.type}
                            createdAt={report.createdAt}
                            content={report.description}
                            isOwner={true}
                            courseId={report.courseId}
                        />

                        <ThreadSubjectDivider repliesCount={report.thread.replies.length} />

                        {report.thread.replies.map((reply) => (
                            <ThreadCard
                                key={reply._id}
                                authorName={`${reply.user.firstName} ${reply.user.lastName}`}
                                authorType={reply.user.type}
                                createdAt={reply.createdAt}
                                content={reply.message}
                            />
                        ))}

                        <ThreadReplyForm />
                    </ThreadContainer>
                </>
            )}
        </ReportPageContainer>
    );
};

export default ReportThread;
