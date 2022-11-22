import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import ICourseProps from "../../../types/Course";
import { useNavigate } from "react-router-dom";

const HorizontalLayout = styled.div`
    display: flex;
`;

const CardContainer = styled.div`
    height: 150px;
    margin-bottom: 20px;
    padding: 10px;
`;

const CourseImage = styled.div`
    width: 260px;
    height: 100%;
    flex: 1;
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

const CoursePriceSection = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    flex: 1;
`;

const Price = styled.p<{ isDiscounted?: boolean }>`
    font-weight: 800;
    text-decoration: ${(props) => (props.isDiscounted ? "line-through" : "none")};
`;

const CoursePrice: React.FC<{ currency: string; price: number; discount?: number }> = ({
    currency,
    price,
    discount
}) => {
    let discountedPrice = price;
    discount = price === 0 || !discount ? 0 : discount;
    if (discount) {
        discountedPrice = price - (price * discount) / 100;
    }
    const priceString = price === 0 ? "Free" : `${currency} ${price}`;
    const discountedPriceString = discountedPrice === 0 ? "Free" : `${currency} ${discountedPrice.toFixed(2)}`;
    return (
        <CoursePriceSection>
            <Price isDiscounted={discount ? true : false}>{priceString}</Price>
            {discount > 0 && <Price isDiscounted={false}>{discountedPriceString}</Price>}
        </CoursePriceSection>
    );
};

const CourseCard: React.FC<{ course: ICourseProps }> = ({
    course: { _id, title, description, instructor, averageRating, totalHours, price, discount, currency } = {
        title: "100 Days of Code: The Complete Python Pro Bootcamp for 2022",
        description:
            "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!",
        instructor: {
            id: "1",
            firstName: "Dr. Angela",
            lastName: "Yu"
        },
        averageRating: 4.3,
        totalHours: 10,
        price: 12.99,
        currency: "$"
    }
}) => {
    const navigate = useNavigate();
    return (
        <CardContainer
            onClick={() => {
                navigate(`/course/${_id}`);
            }}
        >
            <HorizontalLayout>
                <CourseImage>
                    <img alt="" src="https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg" />
                </CourseImage>
                <CourseDetails>
                    <CourseTitle>{title}</CourseTitle>
                    <CourseDescription>{description + "  ..."}</CourseDescription>
                    {instructor && (
                        <CourseInstructor>{`${instructor.firstName} ${instructor.lastName}`}</CourseInstructor>
                    )}
                    <CourseRatingContainer>
                        <CourseRatingText>{averageRating}</CourseRatingText>
                        <StarRatings
                            rating={averageRating}
                            starDimension="14px"
                            starSpacing="1px"
                            starRatedColor="#E59719"
                        />
                    </CourseRatingContainer>
                    <CourseDuration>{`Duration: ${totalHours} hours`}</CourseDuration>
                </CourseDetails>
                <CoursePrice currency={currency} price={price} discount={discount} />
            </HorizontalLayout>
            <hr />
        </CardContainer>
    );
};

export default CourseCard;
