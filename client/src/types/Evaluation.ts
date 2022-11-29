interface IEvaluation {
    results: Array<{
        isCorrect: boolean;
        correctAnswer: number;
        userAnswer: number;
    }>;
    totalGrade: number;
}

export default IEvaluation;
