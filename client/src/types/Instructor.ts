interface Instructor {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    biography?: string;
    averageRating: number;
}

export default Instructor;
