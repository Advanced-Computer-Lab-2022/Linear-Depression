import { Radio } from "@mui/material";
import React from "react";
import styled from "styled-components";

import { QuestionTitle } from "@internals/components";

const getAnswerColor = (index: number, answerIndex: number, userAnswerIndex: number) => {
    if (index === answerIndex) {
        return "green";
    } else if (index === userAnswerIndex) {
        return "red";
    } else {
        return "black";
    }
};

const CustomRadio = styled(Radio)<{ buttonColor: string }>`
    color: ${(props) => props.buttonColor} !important;
`;

const Container = styled.div<{ color: string }>`
    color: ${(props) => props.color};
`;

const SolvedQuestion: React.FC<{
    question: {
        question: string;
        choices: string[];
    };
    evaluation: {
        isCorrect: boolean;
        correctAnswer: number;
        userAnswer: number;
    };
}> = ({ question, evaluation }) => {
    return (
        <div>
            <QuestionTitle>{question.question}</QuestionTitle>
            {question.choices.map((choice, index) => (
                <Container key={index} color={getAnswerColor(index, evaluation.correctAnswer, evaluation.userAnswer)}>
                    <CustomRadio
                        buttonColor={getAnswerColor(index, evaluation.correctAnswer, evaluation.userAnswer)}
                        disabled
                        checked={evaluation.userAnswer === index}
                    />
                    {choice}
                </Container>
            ))}
        </div>
    );
};

export default SolvedQuestion;
