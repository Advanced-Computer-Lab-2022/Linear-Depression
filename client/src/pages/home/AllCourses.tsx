import { CoursesListWithFilters } from "@internals/components";
import { useFetchAllCourses } from "@internals/hooks";

const AllCourses = () => {
    const courses = useFetchAllCourses();

    return (
        <div>
            <CoursesListWithFilters courses={courses.data} />
        </div>
    );
};

export default AllCourses;
