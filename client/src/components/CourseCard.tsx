import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";

const HorizontalLayout = styled.div`
    display: flex;
`;

const CardContainer = styled.div`
    width: 75%;
    height: 150px;
    margin-bottom: 20px;
`;

const CourseImage = styled.div`
    width: 260px;
    height: 100%;
`;

const CourseDetails = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 20px;
`;

const CourseTitle = styled.p`
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 3px;
    line-height: 100%;
`;

const CourseDescription = styled.p`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 5px;
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

const CoursePrice = styled.p`
    font-weight: 800;
    padding-left: 10px;
    padding-right: 10px;
`;

export interface ICourseCardProps {
    course?: {
        id: string;
        title: string;
        description: string;
        instructor: string;
        rating: number;
        duration: number;
        price: number;
        currency: string;
    };
}

const CourseCard: React.FC<ICourseCardProps> = ({
    course: { id, title, description, instructor, rating, duration, price, currency } = {
        id: "1",
        title: "100 Days of Code: The Complete Python Pro Bootcamp for 2022",
        description:
            "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!",
        instructor: "Dr. Angela Yu",
        rating: 4.3,
        duration: 10,
        price: 12.99,
        currency: "$"
    }
}: ICourseCardProps) => {
    return (
        <CardContainer>
            <HorizontalLayout>
                <CourseImage>
                    <img alt="" src="https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg" />
                </CourseImage>
                <CourseDetails>
                    <CourseTitle>{title}</CourseTitle>
                    <CourseDescription>{description}</CourseDescription>
                    <CourseInstructor>{instructor}</CourseInstructor>
                    <CourseRatingContainer>
                        <CourseRatingText>{rating}</CourseRatingText>
                        <StarRatings rating={rating} starDimension="14px" starSpacing="1px" starRatedColor="#E59719" />
                    </CourseRatingContainer>
                    <CourseDuration>{`Duration: ${duration} hours`}</CourseDuration>
                </CourseDetails>
                <CoursePrice>{`${currency}${price}`}</CoursePrice>
            </HorizontalLayout>
            <hr />
        </CardContainer>
    );
};

export default CourseCard;
