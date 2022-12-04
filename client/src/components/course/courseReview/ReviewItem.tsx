import React from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
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

const Subtitle = styled.div`
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ActionButton = styled.button`
    border-radius: 50%;
    height: 40px;
    width: 40px;
    border: 1px solid black;
    margin-right: 8px;
    background-color: transparent;
`;

const LikeIcon = styled(AiFillLike)`
    height: 20px;
    width: 20px;
    margin-bottom: 2px;
`;

const DislikeIcon = styled(AiFillDislike)`
    height: 20px;
    width: 20px;
    margin-bottom: 2px;
`;

const Report = styled.div`
    font-weight: 400;
    font-size: 14px;
    text-decoration: underline;
    color: black;
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
                        <Date>{date}</Date>
                    </RatingContainer>
                    <Comment>{comment}</Comment>
                    <Subtitle>Was this review helpful?</Subtitle>
                    <ActionsContainer>
                        <ActionButton>
                            <LikeIcon />
                        </ActionButton>
                        <ActionButton>
                            <DislikeIcon />
                        </ActionButton>
                        <Report>Report</Report>
                    </ActionsContainer>
                </div>
            </Containter>
            <HorizontalLine />
        </>
    );
};

export default ReviewItem;
