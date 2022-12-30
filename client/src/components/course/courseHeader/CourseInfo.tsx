import LoadingButton from "@mui/lab/LoadingButton";
import { Chip, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import BadgeRatedEnrolled from "./courseInfo/BadgeRatedEnrolled";
import { useAuth, useToast } from "@internals/hooks";
import { getCourse, useAppDispatch } from "@internals/redux";
import { publish, close, open } from "@internals/services";
import { CourseStatus, User } from "@internals/types";

const Container = styled.div`
    margin: 0 40px;
    flex: 1;
`;

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.div`
    font-weight: 700;
    color: white;
    max-width: 700px;
    font-size: 32px;
    line-height: 1.2;
    margin-right: 20px;
`;

const Description = styled.div`
    font-size: 19px;
    color: white;
    max-width: 700px;
    margin-bottom: 11px;
    line-height: 1.4;
`;

const Instructor = styled.span`
    font-size: 13px;
    margin-bottom: 8px;
    color: #cebffc;
    text-decoration: underline;
`;

const Button = styled(LoadingButton)`
    width: 240px;
    height: 48px;
    font-weight: 700;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 16px;
    background-color: #a435f0;
    border: none;
    color: white;
    &:hover {
        background-color: #8a2ed6;
        color: white;
    }
`;

const CourseInfo: React.FC<{
    title: string;
    description: string;
    instructor: string;
    rating: number;
    status: CourseStatus;
    isOwner: boolean;
}> = ({ title, description, rating, instructor, status, isOwner }) => {
    const {
        auth: { userType }
    } = useAuth();

    const { showToast } = useToast();

    rating = Number(rating.toFixed(1));
    const dispatch = useAppDispatch();

    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);

    const onClick = () => {
        openModal({
            name: "addReview",
            params: {
                courseId
            }
        });
    };

    const handlePublish = () => {
        setLoading(true);

        publish(courseId)
            .then(() => {
                dispatch(getCourse(courseId));
                showToast({
                    type: "success",
                    message: "Course published successfully"
                });
            })
            .catch((err) => {
                console.log(err);
                showToast({
                    type: "error",
                    message: "Publishing failed, please try again later"
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClose = () => {
        setLoading(true);

        close(courseId)
            .then(() => {
                dispatch(getCourse(courseId));
                showToast({
                    type: "success",
                    message: "Course closed successfully"
                });
            })
            .catch((err) => {
                console.log(err);
                showToast({
                    type: "error",
                    message: "closing failed, please try again later"
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleOpen = () => {
        setLoading(true);

        open(courseId)
            .then(() => {
                dispatch(getCourse(courseId));
                showToast({
                    type: "success",
                    message: "Course opened successfully"
                });
            })
            .catch((err) => {
                console.log(err);
                showToast({
                    type: "error",
                    message: "Opening failed, please try again later"
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container>
            <HorizontalContainer>
                <Title>{title}</Title>

                {userType === User.INSTRUCTOR &&
                    (status === CourseStatus.DRAFT ? (
                        <Tooltip title="The course is not published and can not be viewed by trainees" arrow>
                            <Chip label="DRAFT COURSE" color="secondary" />
                        </Tooltip>
                    ) : status === CourseStatus.PUBLISHED ? (
                        <Tooltip title="The course is published and can be viewed by trainees" arrow>
                            <Chip label="PUBLISHED COURSE" color="primary" />
                        </Tooltip>
                    ) : (
                        <Tooltip title="The course is closed and not accepting new enrollments" arrow>
                            <Chip label="CLOSED COURSE" color="secondary" />
                        </Tooltip>
                    ))}
            </HorizontalContainer>
            <Description>{description}</Description>
            <BadgeRatedEnrolled rating={rating} />
            <div>
                Created by <Instructor>{instructor}</Instructor>
            </div>
            {(userType === User.INDIVIDUAL_TRAINEE || userType === User.CORPORATE_TRAINEE) && (
                <Button onClick={onClick}>Review</Button>
            )}

            {userType === User.INSTRUCTOR &&
                isOwner &&
                (status === CourseStatus.DRAFT ? (
                    <Button loading={loading} onClick={handlePublish}>
                        Publish
                    </Button>
                ) : status === CourseStatus.PUBLISHED ? (
                    <Button loading={loading} onClick={handleClose}>
                        Close
                    </Button>
                ) : (
                    <Button loading={loading} onClick={handleOpen}>
                        Open
                    </Button>
                ))}
        </Container>
    );
};

export default CourseInfo;
