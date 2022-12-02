import { useContext } from "react";

import { Navbar } from "@internals/components";
import { UserContext } from "@internals/contexts";
import { useFetchProfile } from "@internals/hooks";
import { InstructorProfile, IndividualTraineeProfile, CorporateTraineeProfile } from "@internals/pages";
import { User } from "@internals/types";

const Profile = () => {
    const { userType } = useContext(UserContext);

    const { profile } = useFetchProfile();
    console.log(profile);

    return (
        <>
            <Navbar />
            {userType === User.INSTRUCTOR && profile.data !== null && (
                <InstructorProfile instructor={profile.data.instructor} />
            )}
            {userType === User.INDIVIDUAL_TRAINEE && <IndividualTraineeProfile />}
            {userType === User.CORPORATE_TRAINEE && <CorporateTraineeProfile />}
        </>
    );
};

export default Profile;
