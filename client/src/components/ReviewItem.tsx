import moment from "moment";
import React from "react";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

import { Avatar } from "@internals/components";

const Containter = styled.div`
    display: flex;
    margin-bottom: 24px;
`;

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
`;

const AvatarContainer = styled.div`
    margin-right: 24px;
`;

const Rating = styled.div`
    margin-bottom: 6px;
    margin-right: 8px;
`;

const Date = styled.div`
    font-weight: 400;
    font-size: 14px;
    color: #6a6f73;
`;

const Comment = styled.div`
    font-weight: 400;
    font-size: 14px;
`;

const HorizontalLine = styled.hr`
    border: 1px solid #e6e6e6;
    margin-top: 24px;
    margin-bottom: 24px;
`;

const ReviewItem: React.FC<{
    rating: number;
    comment: string;
    name: string;
    date: string;
}> = ({ name, rating, date, comment }) => {
    return (
        <>
            <Containter>
                <AvatarContainer>
                    <Avatar name={name} />
                </AvatarContainer>
                <div>
                    <div>{name}</div>
                    <RatingContainer>
                        <Rating>
                            <StarRatings
                                rating={rating}
                                starDimension="19px"
                                starSpacing="1px"
                                starRatedColor="#e59819"
                            />
                        </Rating>
                        <Date>{moment(date).fromNow()}</Date>
                    </RatingContainer>
                    <Comment>{comment}</Comment>
                </div>
            </Containter>
            <HorizontalLine />
        </>
    );
};

export default ReviewItem;
