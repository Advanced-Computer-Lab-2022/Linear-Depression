import React from "react";
import styled from "styled-components";

const Temp = styled.div`
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Home: React.FC = () => {
    return (
        <Temp>
            <h1>Home</h1>
        </Temp>
    );
};

export default Home;
