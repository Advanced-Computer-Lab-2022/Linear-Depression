import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { MdPlayCircleFilled, MdInsertDriveFile } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { openModal } from "react-url-modal";
import OptionsButton from "../../OptionsButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useAuth } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";
import { User, CourseStatus } from "@internals/types";

const Item = styled.li`
    height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
`;

const CustomCheckbox = styled(Checkbox)`
    color: black !important;
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
    seen?: boolean;
}> = ({ title, link, exerciseId, lessonId, seen }) => {
    const enrollment = useAppSelector((state) => state.enrollment);
    const { courseId } = useParams();
    const {
        auth: { userType }
    } = useAuth();
    const course = useAppSelector((state) => state.course);

    const options = [
        {
            label: "Edit",
            onClick: () => {
                navigate(`/courses/${courseId}/lessons/${lessonId}/exercises/${exerciseId}`);
            }
        },
        {
            label: "Delete",
            onClick: () => {
                openModal({
                    name: "deleteExercise",
                    params: {
                        courseId,
                        lessonId,
                        exerciseId
                    }
                });
            }
        }
    ];

    const navigate = useNavigate();

    return (
        <Item>
            {seen && <CustomCheckbox disabled checked />}
            {seen === false && <CustomCheckbox disabled />}
            <Icon>{link ? <MdPlayCircleFilled /> : <MdInsertDriveFile />}</Icon>
            <Title>{title}</Title>
            {link && enrollment.data && <Preview to={`/courses/${courseId}/lessons/${lessonId}/`}>Preview</Preview>}
            {exerciseId &&
                lessonId &&
                (userType === User.INDIVIDUAL_TRAINEE || userType === User.CORPORATE_TRAINEE) &&
                enrollment.data && (
                    <OpenExercise
                        onClick={() => {
                            navigate(`/courses/${courseId}/lessons/${lessonId}/exercises/${exerciseId}`);
                        }}
                    >
                        Solve
                    </OpenExercise>
                )}
            {exerciseId &&
                lessonId &&
                userType === User.INSTRUCTOR &&
                course.data &&
                course.data.isOwner &&
                course.data.status === CourseStatus.DRAFT && (
                    <OptionsButton options={options} icon={<MoreVertIcon />} />
                )}
        </Item>
    );
};

export default ContentItem;
