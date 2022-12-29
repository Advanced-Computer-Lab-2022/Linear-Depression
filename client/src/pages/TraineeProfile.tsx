import ViewProfile from "./traineeProfile/ViewProfile";
import { CorporateTrainee, IndividualTrainee } from "@internals/types";

const InstructorProfile: React.FC<{
    trainee: CorporateTrainee | IndividualTrainee;
}> = ({ trainee }) => {
    return (
        <>
            <ViewProfile trainee={trainee} />
        </>
    );
};

export default InstructorProfile;
