import React from "react";
import styled from "styled-components";

import { ReviewItem } from "@internals/components";
import { useFetchMyReviews } from "@internals/hooks";

const Containter = styled.div`
    margin: 24px;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    padding: 8px;
    margin-top: 24px;
`;

const CourseReviews: React.FC = () => {
    const { reviews } = useFetchMyReviews();
    console.log(reviews);

    return (
        <>
            <Title>Reviews</Title>
            <Containter>
                {reviews.data &&
                    reviews.data.map(({ _id, rating, comment, trainee: { firstName, lastName }, createdAt }) => (
                        <ReviewItem
                            key={_id}
                            rating={rating}
                            comment={comment}
                            name={`${firstName} ${lastName}`}
                            date={createdAt}
                        />
                    ))}
            </Containter>
        </>
    );
};

export default CourseReviews;
