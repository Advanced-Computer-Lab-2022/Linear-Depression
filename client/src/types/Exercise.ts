interface IExerciseProps {
    _id: string;
    title: string;
    questions: Array<{
        _id: string;
        question: string;
        choices: string[];
        answerIndex: number;
    }>;
}

export default IExerciseProps;
