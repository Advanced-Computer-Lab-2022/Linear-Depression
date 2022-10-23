import Course from "../../../models/Course";
import { courseFactory } from "../../test_models/course/factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../connectDBForTesting";
import Instructor from "../../../models/Instructor";
import { instructorFactory } from "../../test_models/instructor/factory";

const request = require("supertest");

describe("GET /courses/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should return all courses", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();
        console.log(instructor);

        const course = new Course(courseFactory());
        course.instructor = instructor._id;
        await course.save();
        console.log(await course.populate("instructor"));

        const res = await request("http://localhost:3000").get("/courses");
        expect(res.status).toBe(200);
        expect(res.body.courses.length).toBe(1);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, 10000);
});
