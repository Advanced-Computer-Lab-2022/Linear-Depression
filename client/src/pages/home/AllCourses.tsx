import { useAppSelector } from "../../store";
import { CoursesListWithFilters } from "@internals/components";
import { useFetchAllCourses } from "@internals/hooks";

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
