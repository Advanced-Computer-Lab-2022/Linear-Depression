import Course from "../../../models/Course";
import { courseFactory } from "../../test_models/course/factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import Instructor from "../../../models/Instructor";
import { instructorFactory } from "../../test_models/instructor/factory";
import supertest from "supertest";
import app from "../../../server";

const request = supertest(app);

describe("GET /courses/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should return all courses", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();

        const course = new Course(courseFactory());
        course.instructor = instructor._id;
        await course.save();

        const res = await request.get("/courses");
        expect(res.status).toBe(200);
        expect(res.body.courses.length).toBe(1);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, 10000);
});
