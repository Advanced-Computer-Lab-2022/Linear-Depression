import Course from "../../../models/Course";
import { courseFactory, lessonFactory } from "./factory";
import { TIME_OUT } from "../../../utils/testUtilities";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import Lesson from "../../../models/Lesson";
import { ratingFactory } from "../rating/factory";
import Rating from "../../../models/Rating";

describe("Course Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should create a new Course", async () => {
        const course = new Course(courseFactory());
        await course.save();
        // make sure course exists in db.
        const courses = await Course.find({});
        expect(courses.length).toBe(1);
        // make sure course has the same id.
        expect(courses[0].id).toBe(course.id);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("Course Hooks tests", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should update totalHours when a new lesson is added", async () => {
        const lesson = new Lesson(lessonFactory());
        lesson.totalHours = 10;
        await lesson.save();
        const courseData = courseFactory();
        courseData.lessons = [lesson._id];
        const course = new Course(courseData);

        await course.save();

        const lesson_2 = new Lesson(lessonFactory());
        lesson_2.totalHours = 20;
        await lesson_2.save();

        course.lessons.push(lesson_2._id);
        await course.save();

        const updatedCourse = await Course.findById(course._id);
        expect(updatedCourse.totalHours).toBe(30);
    });

    it("Should update totalHours when a lesson is deleted", async () => {
        const lesson = new Lesson(lessonFactory());
        lesson.totalHours = 10;
        await lesson.save();
        const courseData = courseFactory();
        courseData.lessons = [lesson._id];
        const course = new Course(courseData);

        await course.save();

        course.lessons.pop();
        await course.save();

        const updatedCourse = await Course.findById(course._id);
        expect(updatedCourse.totalHours).toBe(0);
    });

    it("Should update averageRating when a new review is added", async () => {
        const ratingData = ratingFactory();
        ratingData.rating = 5;
        const rating = new Rating(ratingData);
        await rating.save();
        const courseData = courseFactory();
        courseData.averageRating = 0;
        courseData.ratings = [rating._id];
        const course = new Course(courseData);
        await course.save();

        const raring_data_2 = ratingFactory();
        raring_data_2.rating = 4;
        const rating_2 = new Rating(raring_data_2);
        await rating_2.save();

        course.ratings.push(rating_2._id);
        await course.save();

        const updatedCourse = await Course.findById(course._id);
        expect(updatedCourse.averageRating).toBe(4.5);
    });

    it("Should update averageRating when a review is deleted", async () => {
        const ratingData = ratingFactory();
        ratingData.rating = 5;
        const rating = new Rating(ratingData);
        await rating.save();
        const courseData = courseFactory();
        courseData.averageRating = 0;
        courseData.ratings = [rating._id];
        const course = new Course(courseData);
        await course.save();

        course.ratings.pop();
        await course.save();

        const updatedCourse = await Course.findById(course._id);
        expect(updatedCourse.averageRating).toBe(0);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    });
});
