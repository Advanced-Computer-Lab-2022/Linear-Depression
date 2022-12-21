import User from "./User";

interface Instructor extends User {
    biography?: string;
    averageRating: number;
}

export default Instructor;
