// search for courses by name
import Course from "../models/Course";
import FuzzySearch from "fuzzy-search";
import Instructor from "../models/Instructor";

export const searchCoursesByTitle = async (name: string) => {
    const courses = await Course.find();
    const searcher = new FuzzySearch(courses, ["title"], {
        caseSensitive: false,
        sort: true // sort by score
    });
    return searcher.search(name);
};

export const searchCoursesByInstructor = async (name: string) => {
    const courses = await Course.find();
    const instructorIds = courses.map((course) => course.instructor);
    const instructors = await Instructor.find({ _id: { $in: instructorIds } });
    const searcher = new FuzzySearch(instructors, ["firstName", "lastName"], {
        caseSensitive: false,
        sort: true // sort by score (best match first)
    });
    const foundInstructors = searcher.search(name);
    const foundInstructorIds = foundInstructors.map((instructor) => instructor._id);
    // filter courses by found instructors
    const filteredCourses = [];
    for (const course of courses) {
        for (const instructorId of foundInstructorIds) {
            if (course.instructor.equals(instructorId)) {
                filteredCourses.push(course);
            }
        }
    }
    return filteredCourses;
};

export const searchCoursesBySubject = async (name: string) => {
    const courses = await Course.find();
    const searcher = new FuzzySearch(courses, ["subject"], {
        caseSensitive: false,
        sort: true // sort by score
    });
    return searcher.search(name);
};
