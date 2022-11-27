import { CoursesListWithFilters } from "@internals/components";
import { useFetchAllCourses } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";

const AllCourses = () => {
    useFetchAllCourses();
    const { data } = useAppSelector((state) => state.coursesList);
    return (
        <div>
            <CoursesListWithFilters courses={data} />
        </div>
    );
};

export default AllCourses;
