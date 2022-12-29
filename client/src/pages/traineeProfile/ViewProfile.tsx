import EmailIcon from "@mui/icons-material/Email";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import styled from "styled-components";
import { useAuth } from "@internals/hooks";
import { CorporateTrainee, IndividualTrainee, User } from "@internals/types";
import { openModal } from "react-url-modal";

import { Avatar } from "@internals/components";

const Container = styled.div`
    margin: 0 30px;
    flex: 1;
    flex-direction: row;
`;

const Header = styled.div`
    height: 200px;
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

const Section = styled.div`
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
const CustomCompanyIcon = styled(CorporateFareIcon)`
    margin-right: 8px;
`;
const Button = styled(LoadingButton)`
    width: 240px;
    height: 48px;
    font-weight: 700;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 10px;
    background-color: #a435f0;
    border: none;
    color: white;
    &:hover {
        background-color: #8a2ed6;
        color: white;
    }
`;

const ViewProfile: React.FC<{
    trainee: CorporateTrainee | IndividualTrainee | any;
}> = ({ trainee }) => {
    const { auth } = useAuth();
    return (
        <Header>
            <div>
                <Avatar name={`${trainee.firstName} ${trainee.lastName}`} inverted={true} />
            </div>
            <Container>
                <div>
                    <Name>{`${trainee.firstName} ${trainee.lastName}`}</Name>
                    <Section>
                        <CustomEmailIcon />
                        {trainee.email}
                    </Section>
                    {trainee.corporate && (
                        <Section>
                            <CustomCompanyIcon />
                            {trainee.corporate}
                        </Section>
                    )}
                </div>
            </Container>

            {auth.userType == User.INDIVIDUAL_TRAINEE && (
                <Button
                    onClick={() =>
                        openModal({
                            name: "viewMyWallet"
                        })
                    }
                >
                    {" "}
                    My Wallet
                </Button>
            )}
        </Header>
    );
};

export default ViewProfile;
