import useFetchAllCourses from "../../hooks/useFetchAllCourses";
import CoursesListWithFilters from "../../components/CoursesListWithFilters";

const AllCourses = () => {
    const courses = useFetchAllCourses();

    return (
        <div>
            <CoursesListWithFilters courses={courses.data} />
        </div>
    );
};

export default AllCourses;
