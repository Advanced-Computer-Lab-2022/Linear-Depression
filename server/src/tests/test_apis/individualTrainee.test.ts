import { disconnectDBForTesting, connectDBForTesting } from "../../utils/testUtilities";
import supertest from "supertest";
import app from "../../server";
import { individualTraineeFactory } from "../test_models/trainee/factory";
import { StatusCodes } from "http-status-codes";
import Course from "../../models/Course";
import { courseFactory } from "../test_models/course/factory";
import IndividualTrainee from "../../models/IndividualTrainee";
const request = supertest(app);

describe("Test Individual Trainee API", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    afterAll(async () => {
        await disconnectDBForTesting();
    });
    it("test Individual Trainee Create", async () => {
        const individualTrainee = individualTraineeFactory();
        const response = await request.post("/individual-trainees").send(individualTrainee);
        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body._id).toEqual(individualTrainee._id);
    });
    it("test Populate Courses", async () => {
        const course = new Course(courseFactory());
        await course.save();
        const individualTrainee = new IndividualTrainee(individualTraineeFactory());
        individualTrainee.courses = [course._id];
        await individualTrainee.save();
        const response = await request.get(`/individual-trainees/${individualTrainee._id}`);
        expect(response.status).toBe(StatusCodes.OK);
        console.log(response.body);
        expect(response.body.individualTrainee.courses[0].title).toEqual(course.title);
    });
});
