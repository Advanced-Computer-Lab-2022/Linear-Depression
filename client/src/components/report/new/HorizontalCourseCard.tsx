import { Person2Rounded } from "@mui/icons-material";
import { Card, AspectRatio, Sheet, Typography, Chip } from "@mui/joy";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

import { Course as ICourseProps } from "@internals/types";

const link = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const HorizontalCourseCard: React.FC<{ course: ICourseProps }> = ({ course }) => {
    const navigate = useNavigate();

    const getCoursePrice = () => {
        let discount = 0;
        if (course.activePromotion) {
            discount = course.activePromotion.discountPercent;
        }

        let discountedPrice = course.price;
        if (discount && course.price !== 0) {
            discountedPrice = course.price - (course.price * discount) / 100;
        }

        const priceString = course.price === 0 ? "Free" : `${course.currency} ${course.price.toFixed(2)}`;
        const discountedPriceString =
            discountedPrice === 0 ? "Free" : `${course.currency} ${discountedPrice.toFixed(2)}`;

        return {
            regularPrice: priceString,
            discountedPrice: discountedPriceString === priceString ? null : discountedPriceString
        };
    };

    const { regularPrice, discountedPrice } = getCoursePrice();

    return (
        <Card
            sx={{
                display: "flex",
                p: 2,
                width: "auto",
                height: 250,
                borderRadius: "sm",
                "&:hover": { boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)" },
                boxShadow: "none"
            }}
            row
        >
            <AspectRatio ratio={1} sx={{ minWidth: 220, maxWidth: 220 }}>
                <img src={course.thumbnail} alt="Course Thumbnail" loading="lazy" />
            </AspectRatio>

            <Sheet
                sx={{
                    ml: 2,
                    py: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "100%"
                }}
            >
                <Typography level="h3" component={link} to={`/courses/${course._id}`} fontWeight="bold">
                    {course.title}
                </Typography>
                <Typography
                    level="body2"
                    sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        minWidth: "100%"
                    }}
                >
                    {course.description}
                </Typography>

                <Sheet
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexDirection: "row",
                        mt: "auto"
                    }}
                >
                    <Chip
                        variant="soft"
                        color="neutral"
                        startDecorator={<Person2Rounded />}
                        onClick={() => {
                            navigate(`/instructors/${course.instructor._id}`);
                        }}
                        sx={{ mr: "auto" }}
                    >
                        {`${course.instructor.firstName} ${course.instructor.lastName}`}
                    </Chip>
                    <StarRatings
                        rating={course.averageRating}
                        starRatedColor="#FFD700"
                        starDimension="25px"
                        starSpacing="1px"
                        numberOfStars={5}
                        name="rating"
                    />
                </Sheet>

                <Sheet sx={{ ml: "auto", display: "flex", flexDirection: "row" }}>
                    {discountedPrice && (
                        <Typography
                            level="body2"
                            sx={{ textDecoration: "line-through", mr: 1, alignSelf: "center" }}
                            color="neutral"
                        >
                            {regularPrice}
                        </Typography>
                    )}
                    <Typography level="h6" fontWeight="bold">
                        {discountedPrice || regularPrice}
                    </Typography>
                </Sheet>
            </Sheet>
        </Card>
    );
};

export default HorizontalCourseCard;
