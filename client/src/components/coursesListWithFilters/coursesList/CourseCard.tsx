import React from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

import { CoursePrice } from "@internals/components";
import { Course as ICourseProps } from "@internals/types";

const HorizontalLayout = styled.div`
    display: flex;
`;

const CardContainer = styled.div`
    height: 170px;
    margin-bottom: 20px;
    padding: 10px;
`;

const Image = styled.img`
    height: 160px;
    width: 260px;
`;

const CourseDetails = styled.div`
    width: 100%;
    height: 100%;
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

const CourseInstructor = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 100%;
    margin-bottom: 0px;
    margin-top: 5px;
`;

const CourseRatingContainer = styled.div`
    display: flex;
    height: 25px;
    margin-bottom: 0px;
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
`;

const CourseCard: React.FC<{ course: ICourseProps }> = ({
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
        thumbnail
    }
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
                    {instructor && (
                        <CourseInstructor>{`${instructor.firstName} ${instructor.lastName}`}</CourseInstructor>
                    )}
                    {averageRating > 0 ? (
                        <CourseRatingContainer>
                            <CourseRatingText>{averageRating}</CourseRatingText>
                            <StarRatings
                                rating={averageRating}
                                starDimension="14px"
                                starSpacing="1px"
                                starRatedColor="#E59719"
                            />
                        </CourseRatingContainer>
                    ) : (
                        <br />
                    )}
                    <CourseDuration>{`Duration: ${totalHours} hours`}</CourseDuration>
                </CourseDetails>
                <CoursePrice currency={currency} price={price} promotion={activePromotion} />
            </HorizontalLayout>
            <hr />
        </CardContainer>
    );
};

export default CourseCard;
