import { useState } from "react";

import EditProfile from "./instructorProfile/EditProfile";
import ViewProfile from "./instructorProfile/ViewProfile";
import { Instructor } from "@internals/types";

const InstructorProfile: React.FC<{
    instructor: Instructor;
}> = ({ instructor }) => {
    const [edit, setEdit] = useState(false);

    return (
        <>
            {!edit && <ViewProfile instructor={instructor} />}
            {edit && <EditProfile instructor={instructor} />}
            {!edit && (
                <button
                    onClick={() => {
                        setEdit(true);
                    }}
                >
                    Update Profile
                </button>
            )}
        </>
    );
};

export default InstructorProfile;
