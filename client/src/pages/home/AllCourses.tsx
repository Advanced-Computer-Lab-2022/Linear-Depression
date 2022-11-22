import useFetchCourses from "../../hooks/useFetchCourses";
import CoursesListWithFilters from "../../components/CoursesListWithFilters";

const AllCourses = () => {
    const courses = useFetchCourses();

    return (
        <div>
            <CoursesListWithFilters courses={courses.data} />
        </div>
    );
};

export default AllCourses;
