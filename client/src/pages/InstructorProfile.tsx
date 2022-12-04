import EditIcon from "@mui/icons-material/Edit";
import { openModal } from "react-url-modal";

import ViewProfile from "./instructorProfile/ViewProfile";
import { FloatingButton } from "@internals/components";
import { Instructor } from "@internals/types";

const InstructorProfile: React.FC<{
    instructor: Instructor;
}> = ({ instructor }) => {
    const onClick = () => {
        openModal({
            name: "editProfile",
            params: {
                instructorFirstName: instructor.firstName,
                instructorLastName: instructor.lastName,
                instructorEmail: instructor.email,
                instructorBiography: instructor.biography
            }
        });
    };

    return (
        <>
            <ViewProfile instructor={instructor} />

            <FloatingButton color="primary" aria-label="add" onClick={onClick}>
                <EditIcon />
            </FloatingButton>
        </>
    );
};

export default InstructorProfile;
