interface ILessonProps {
    _id: string;
    title: string;
    totalHours: number;
    video?: {
        title: string;
        videoLink: string;
        description: string;
    };
    exercises: {
        _id: string;
        title: string;
        question: string;
    }[];
}

export default ILessonProps;
