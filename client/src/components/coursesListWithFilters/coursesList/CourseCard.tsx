import { Avatar, Chip, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

import { CoursePrice } from "@internals/components";
import { Course as ICourseProps, CourseStatus } from "@internals/types";

const HorizontalLayout = styled.div`
    display: flex;
`;

const CardContainer = styled.div`
    height: 200px;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f5f5f5;
    }
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding-top: 20px;
`;

const Image = styled.img`
    height: 160px;
    width: 260px;
`;

const CourseDetails = styled.div`
    width: 100%;
    height: auto;
    padding-left: 20px;
    flex: 4;
`;

const CourseTitle = styled.p`
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 3px;
    line-height: 100%;
`;

const CourseDescription = styled.p`
    width: 90%;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const CourseRatingContainer = styled.div`
    display: flex;
    height: 25px;
    margin-bottom: 5px;
    margin-top: 0px;
`;

const CourseRatingText = styled.p`
    margin-right: 5px;
    margin-top: 5px;
    font-size: 14px;
    font-weight: 600;
    color: #b4690e;
`;

const CourseDuration = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 100%;
    margin-top: 5px;
    margin-bottom: 0px;
`;

const RightSideContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
`;

const CourseCard: React.FC<{ course: ICourseProps; showPrice: boolean; showStatus: boolean }> = ({
    course: {
        _id,
        title,
        description,
        instructor,
        averageRating,
        totalHours,
        price,
        activePromotion,
        currency,
        thumbnail,
        status
    },
    showPrice = true,
    showStatus
}) => {
    const navigate = useNavigate();
    averageRating = Number(averageRating.toFixed(1));
    return (
        <CardContainer
            onClick={() => {
                navigate(`/courses/${_id}`);
            }}
        >
            <HorizontalLayout>
                <Image src={thumbnail} />

                <CourseDetails>
                    <CourseTitle>{title}</CourseTitle>
                    <CourseDescription>{description + "  ..."}</CourseDescription>
                    <CourseDuration>{totalHours} total hours</CourseDuration>
                    <CourseRatingContainer
                        style={{
                            visibility: averageRating > 0 ? "visible" : "hidden"
                        }}
                    >
                        <CourseRatingText>{averageRating}</CourseRatingText>
                        <StarRatings
                            rating={averageRating}
                            starDimension="14px"
                            starSpacing="1px"
                            starRatedColor="#E59719"
                        />
                    </CourseRatingContainer>

                    <Chip
                        avatar={<Avatar />}
                        label={`${instructor.firstName} ${instructor.lastName}`}
                        variant="outlined"
                    />
                </CourseDetails>
                <RightSideContainer>
                    {showPrice && <CoursePrice currency={currency} price={price} promotion={activePromotion} />}

                    {showStatus &&
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
                </RightSideContainer>
            </HorizontalLayout>
        </CardContainer>
    );
};

export default CourseCard;
