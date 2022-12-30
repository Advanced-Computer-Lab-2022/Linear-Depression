import AccessRequest from "./AccessRequest";
import CorporateTrainee from "./CorporateTrainee";
import Country from "./Country";
import Course from "./Course";
import Enrollment from "./Enrollment";
import Evaluation from "./Evaluation";
import Exercise from "./Exercise";
import FormProps from "./FormProps";
import IndividualTrainee from "./IndividualTrainee";
import Instructor from "./Instructor";
import Lesson from "./Lesson";
import Note from "./Note";
import Profile from "./Profile";
import Promotion from "./Promotion";
import RefundRequest from "./RefundRequest";
import Review from "./Review";
import ReviewSubmission from "./ReviewSubmission";
import CourseStatus from "./enums/CourseStatus";
import { ReportStatus, ReportType, UserType } from "./enums/index";
import { Report, ReportThread, ReportFormProps } from "./report/index";

export {
    UserType as User, // TODO: Change all usages of this to UserType
    ReportType,
    ReportStatus,
    CourseStatus,
    type Country,
    type Course,
    type FormProps,
    type Lesson,
    type Promotion,
    type Exercise,
    type Review,
    type Evaluation,
    type Enrollment,
    type Instructor,
    type Profile,
    type Note,
    type Report,
    type ReportThread,
    type ReportFormProps,
    type AccessRequest,
    type RefundRequest,
    type ReviewSubmission,
    type IndividualTrainee,
    type CorporateTrainee
};

export * from "./auth";
