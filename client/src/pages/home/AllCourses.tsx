import { CoursesListWithFilters } from "@internals/components";
import { useFetchAllCourses } from "@internals/hooks";
import { useAppSelector } from "../../store";

const AllCourses = () => {
    const { data } = useAppSelector((state) => state.coursesList);
    useFetchAllCourses();
    return (
        <div>
            <CoursesListWithFilters courses={data} />
        </div>
    );
};

export default AllCourses;
