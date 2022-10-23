import { courseFactory } from "../test_models/course/factory";
import { searchCoursesByTitle, searchCoursesByInstructor, searchCoursesBySubject } from "../../services/CourseServices";
import { connectDBForTesting, disconnectDBForTesting } from "../connectDBForTesting";
import Course from "../../models/Course";
import { instructorFactory } from "../test_models/instructor/factory";
import Instructor from "../../models/Instructor";

// a function to create a course in the database
const createCourseByTitle = async (title: string) => {
    const courseData = courseFactory();
    courseData.title = title;
    const course = new Course(courseData);
    await course.save();
    return course;
};

// a function to create a course in the database with a specific instructor
const createCourseByInstructor = async (instructorFirstName: string) => {
    const courseData = courseFactory();
    const instructorData = instructorFactory();
    instructorData.firstName = instructorFirstName;
    const instructor = new Instructor(instructorData);
    await instructor.save();
    courseData.instructor = instructor._id;
    const course = new Course(courseData);
    await course.save();
    return course;
};

const createCourseBySubject = async (subject: string) => {
    const courseData = courseFactory();
    courseData.subject = subject;
    const course = new Course(courseData);
    await course.save();
    return course;
};

describe("CourseServices", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    });

    describe("searchCourses by title", () => {
        beforeEach(async () => {
            await Course.deleteMany({});
            const course_titles = [
                "Introduction to Computer Science",
                "Introduction to Programming",
                "Introduction to Data Structures",
                "Introduction to Algorithms",
                "Computer Architecture",
                "Operating Systems",
                "Computer Networks",
                "Computer Systems",
                "Introduction to Python",
                "Machine Learning with python"
            ];
            for (const title of course_titles) {
                await createCourseByTitle(title);
            }
        });

        it("should return a course with the same title with typo", async () => {
            const courses = await searchCoursesByTitle("Pyton");
            expect(courses.length).toBe(2);
        });

        it("should return a course with the same title", async () => {
            const courses = await searchCoursesByTitle("Introduction to Python");
            expect(courses.length).toBe(1);
            expect(courses[0].title).toBe("Introduction to Python");
        });

        it("should return a course with the same title with different case", async () => {
            const courses = await searchCoursesByTitle("introduction to python");
            expect(courses.length).toBe(1);
            expect(courses[0].title).toBe("Introduction to Python");
        });

        it("should return all courses having substring 'Introduction'", async () => {
            const courses = await searchCoursesByTitle("Introduction");
            expect(courses.length).toBe(5);
            for (const course of courses) {
                expect(course.title.toLowerCase()).toContain("introduction");
            }
        });
    });

    describe("searchCourses by instructor", () => {
        beforeEach(async () => {
            await Course.deleteMany({});
            await Instructor.deleteMany({});
            const instructorNames = ["Ibrahim", "Abdulaziz", "Shimaa", "Elshimaa", "Nasser", "Omar", "Ommar"];
            for (const name of instructorNames) {
                await createCourseByInstructor(name);
            }
        });

        it("should return a course with the same instructor if typo", async () => {
            const courses = await searchCoursesByInstructor("Naser");
            expect(courses.length).toBe(1);
        });

        it("should return a course with the same instructor if close", async () => {
            const courses = await searchCoursesByInstructor("omar");
            expect(courses.length).toBe(2);
        });
        it("should return a course with the same instructor", async () => {
            const courses = await searchCoursesByInstructor("Ibrahim");
            expect(courses.length).toBe(1);
        });

        it("should return a course with the same instructor with different case", async () => {
            const courses = await searchCoursesByInstructor("ibrahim");
            expect(courses.length).toBe(1);
        });

        it("should return a course with  substring instructor ", async () => {
            const courses = await searchCoursesByInstructor("shimaa");
            expect(courses.length).toBe(2);
        });
    });

    describe("searchCourses by subject", () => {
        beforeEach(async () => {
            await Course.deleteMany({});
            const subjects = [
                "Computer Science",
                "Computer Engineering",
                "Electrical Engineering",
                "Mechanical Engineering",
                "Civil Engineering",
                "Chemical Engineering",
                "Mechanical Technology"
            ];

            for (const subject of subjects) {
                await createCourseBySubject(subject);
            }
        });

        it("should return a course with the same subject", async () => {
            const courses = await searchCoursesBySubject("Computer Science");
            expect(courses.length).toBe(1);
        });

        it("should return a course with the same subject with different case", async () => {
            const courses = await searchCoursesBySubject("computer science");
            expect(courses.length).toBe(1);
        });

        it("should return a course with  substring subject ", async () => {
            const courses = await searchCoursesBySubject("Engineering");
            expect(courses.length).toBe(5);
        });
    });
});
