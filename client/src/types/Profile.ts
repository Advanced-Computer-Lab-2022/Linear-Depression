import Instructor from "./Instructor";
import IndividualTrainee from "./IndividualTrainee";
import CorporateTrainee from "./CorporateTrainee";

interface Profile {
    instructor?: Instructor;
    individualTrainee?: IndividualTrainee;
    corporateTrainee?: CorporateTrainee;
}

export default Profile;
