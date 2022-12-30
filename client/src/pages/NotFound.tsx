import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import "./notFound/NotFound.css";

const Heading = styled.h1``;

const SubHeading = styled.h2``;

const Description = styled.p``;

const Button = styled(LoadingButton)`
    width: 240px;
    height: 48px;
    font-weight: 700;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 16px;
    background-color: #4268f6;
    border: none;
    color: white;
    &:hover {
        background-color: #4268f6;
        color: white;
    }
`;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404"></div>
                <Heading>404</Heading>
                <SubHeading>Oops! Page Not Found</SubHeading>
                <Description>
                    Sorry but the page you are looking for does not exist, have been removed, name changed or is
                    temporarily unavailable.
                </Description>
                <Button onClick={() => navigate("/")}>Back to homepage</Button>
            </div>
        </div>
    );
};
export default NotFound;
