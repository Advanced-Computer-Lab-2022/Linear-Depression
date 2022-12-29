import EmailIcon from "@mui/icons-material/Email";
import React from "react";
import styled from "styled-components";
import { CorporateTrainee, IndividualTrainee } from "@internals/types";

import { Avatar } from "@internals/components";

const Container = styled.div`
    margin: 0 30px;
    flex: 1;
    flex-direction: row;
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
    trainee: CorporateTrainee | IndividualTrainee;
}> = ({ trainee }) => {
    return (
        <Header>
            <div>
                <Avatar name={`${trainee.firstName} ${trainee.lastName}`} inverted={true} />
            </div>
            <Container>
                <div>
                    <Name>{`${trainee.firstName} ${trainee.lastName}`}</Name>
                    <Email>
                        <CustomEmailIcon />
                        {trainee.email}
                    </Email>
                </div>
            </Container>
        </Header>
    );
};

export default ViewProfile;
