import React, { useContext } from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import { MdInsertDriveFile } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "@internals/contexts";
import { User } from "@internals/types";

const Item = styled.li`
    height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    height: 13px;
    margin-right: 16px;
    margin-top: -15px;
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 400;
    flex: 1;
`;

const Preview = styled(Link)`
    font-size: 14px;
    font-weight: 400;
    color: #5624d0;
    text-decoration: underline;
    margin-right: 10px;
`;

const OpenExercise = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #5624d0;
    text-decoration: underline;
    margin-right: 10px;
    cursor: pointer;
`;

const ContentItem: React.FC<{
    title?: string;
    link?: string;
    exerciseId?: string;
    lessonId?: string;
}> = ({ title, link, exerciseId, lessonId }) => {
    const { courseId } = useParams();
    const { userType } = useContext(UserContext);

    const navigate = useNavigate();

    return (
        <Item>
            <Icon>{link ? <MdPlayCircleFilled /> : <MdInsertDriveFile />}</Icon>
            <Title>{title}</Title>
            <Preview to={`/courses/${courseId}/lessons/${lessonId}/`}>Preview</Preview>
            {exerciseId &&
                lessonId &&
                (userType === User.INDIVIDUAL_TRAINEE || userType === User.CORPORATE_TRAINEE) && (
                    <OpenExercise
                        onClick={() => {
                            navigate(`/courses/${courseId}/lessons/${lessonId}/exercises/${exerciseId}`);
                        }}
                    >
                        Solve
                    </OpenExercise>
                )}
        </Item>
    );
};

export default ContentItem;
