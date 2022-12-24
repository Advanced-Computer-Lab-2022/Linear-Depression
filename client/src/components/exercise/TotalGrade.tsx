import RuleIcon from "@mui/icons-material/Rule";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
    padding: 10px;
`;

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Grade = styled.div<{ grade: number }>`
    font-size: 28px;
    font-weight: 600;
    color: ${(props) => (props.grade >= 50 ? "#4caf50" : "#f44336")};
`;

const TotalGrade: React.FC<{
    totalGrade: number;
}> = ({ totalGrade }) => {
    return (
        <Container>
            <HorizontalContainer>
                <RuleIcon
                    sx={{
                        width: "40px",
                        height: "40px",
                        padding: "5px"
                    }}
                />
                <Grade grade={totalGrade}>{totalGrade.toFixed(1)}%</Grade>
            </HorizontalContainer>
        </Container>
    );
};

export default TotalGrade;
