interface ILessonProps {
    id: string;
    title: string;
    totalHours: number;
    video?: {
        videoLink: string;
        description: string;
    };
    exercises: {
        id: string;
        title: string;
        question: string;
    }[];
}

export default ILessonProps;
