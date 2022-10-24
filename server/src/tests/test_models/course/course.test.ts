import Course from "../../../models/Course";
import { courseFactory } from "./factory";
import { TIME_OUT } from "../../../utils/testUtilities";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";

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
