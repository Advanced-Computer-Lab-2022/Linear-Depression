import { useFetchAllCourses } from "@internals/hooks";
import { CoursesListWithFilters } from "@internals/components";

const AllCourses = () => {
    const courses = useFetchAllCourses();

    return (
        <div>
            <CoursesListWithFilters courses={courses.data} />
        </div>
    );
};

export default AllCourses;
