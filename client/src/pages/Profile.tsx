import { Navbar } from "@internals/components";
import { useAuth, useFetchProfile } from "@internals/hooks";
import { InstructorProfile, TraineeProfile } from "@internals/pages";
import { useAppSelector } from "@internals/redux";
import { User } from "@internals/types";

const Profile = () => {
    const {
        auth: { userType }
    } = useAuth();

    useFetchProfile();

    const { data } = useAppSelector((state) => state.profile);

    return (
        <>
            <Navbar />
            {userType === User.INSTRUCTOR && data !== null && <InstructorProfile instructor={data.instructor} />}
            {userType === User.INDIVIDUAL_TRAINEE && data && <TraineeProfile trainee={data.individualTrainee} />}
            {userType === User.CORPORATE_TRAINEE && data && <TraineeProfile trainee={data.corporateTrainee} />}
        </>
    );
};

export default Profile;
