import { useContext } from "react";

import { Navbar } from "@internals/components";
import { UserContext } from "@internals/contexts";
import { useFetchProfile } from "@internals/hooks";
import { InstructorProfile, IndividualTraineeProfile, CorporateTraineeProfile } from "@internals/pages";
import { useAppSelector } from "@internals/redux";
import { User } from "@internals/types";

const Profile = () => {
    const { userType } = useContext(UserContext);

    useFetchProfile();

    const { data } = useAppSelector((state) => state.profile);

    return (
        <>
            <Navbar />
            {userType === User.INSTRUCTOR && data !== null && <InstructorProfile instructor={data.instructor} />}
            {userType === User.INDIVIDUAL_TRAINEE && <IndividualTraineeProfile />}
            {userType === User.CORPORATE_TRAINEE && <CorporateTraineeProfile />}
        </>
    );
};

export default Profile;
