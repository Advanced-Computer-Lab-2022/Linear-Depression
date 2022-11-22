import useFetchCourses from "../hooks/useFetchCourses";
import useFetchSubjects from "../hooks/useFetchSubjects";
import CoursesWithFiltersPanel from "./CoursesWithFiltersPanel";

const AllCourses = () => {
    const courses = useFetchCourses();
    const subjects = useFetchSubjects();

    return (
        <div>
            <CoursesWithFiltersPanel courses={courses.data} subjects={subjects.data} />
        </div>
    );
};

export default AllCourses;
