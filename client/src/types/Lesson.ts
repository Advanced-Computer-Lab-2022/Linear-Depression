interface ILessonProps {
    id: string;
    title: string;
    totalDuration: number;
    video?: {
        videoLink: string;
        description: string;
    };
    exercises: {
        id: string;
        question: string;
    }[];
}

export default ILessonProps;
