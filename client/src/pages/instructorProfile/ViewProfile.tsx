import EmailIcon from "@mui/icons-material/Email";
import React from "react";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

import { Avatar } from "@internals/components";
import { Instructor } from "@internals/types";

const Container = styled.div`
    margin: 0 30px;
    flex: 1;
    flex-direction: row;
`;

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Rating = styled.p`
    color: #f2ca8c;
    font-weight: 700;
    font-size: 14px;
    margin-right: 4px;
    margin-top: 5px;
`;

const StyledStarRatings = styled(StarRatings)`
    height: 22px;
`;

const Header = styled.div`
    height: 300px;
    background-color: #1e1f1f;
    padding: 32px 96px;
    color: white;
    display: flex;
`;

const Name = styled.div`
    font-weight: 700;
    color: white;
    max-width: 700px;
    font-size: 32px;
    line-height: 1.2;
    margin-bottom: 8px;
`;

const Biography = styled.div`
    font-size: 19px;
    color: white;
    max-width: 700px;
    margin-bottom: 11px;
    line-height: 1.4;
    overflow-wrap: break-word;
`;

const Email = styled.div`
    font-size: 19px;
    color: white;
    max-width: 700px;
    margin-bottom: 11px;
    margin-top: 11px;
    line-height: 1.4;
    overflow-wrap: break-word;
`;

const CustomEmailIcon = styled(EmailIcon)`
    margin-right: 8px;
`;

const ViewProfile: React.FC<{
    instructor: Instructor;
}> = ({ instructor }) => {
    return (
        <Header>
            <div>
                <Avatar name={`${instructor.firstName} ${instructor.lastName}`} inverted={true} />
            </div>
            <Container>
                <div>
                    <Name>{`${instructor.firstName} ${instructor.lastName}`}</Name>
                    <Biography>{instructor.biography}</Biography>
                    <HorizontalContainer>
                        <Rating>{instructor.averageRating}</Rating>
                        <StyledStarRatings
                            rating={instructor.averageRating}
                            starDimension="14px"
                            starSpacing="1px"
                            starRatedColor="#f2ca8c"
                        />
                    </HorizontalContainer>
                    <Email>
                        <CustomEmailIcon />
                        {instructor.email}
                    </Email>
                </div>
            </Container>
        </Header>
    );
};

export default ViewProfile;
