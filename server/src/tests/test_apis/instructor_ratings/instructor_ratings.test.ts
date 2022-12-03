import Instructor from "../../../models/Instructor";
import Rating from "../../../models/Rating";
import { instructorFactory } from "../../test_models/instructor/factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import { TIME_OUT } from "../../../utils/testUtilities";
import { ratingFactory } from "../../test_models/rating/factory";

import app from "../../../server";
import supertest from "supertest";
const request = supertest(app);

import StatusCodes from "http-status-codes";
import { faker } from "@faker-js/faker";

describe("GET /me/ratings", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    }, TIME_OUT);

    it("Should return all ratings of an instructor", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();

        const { token, instructor } = await getInstructorToken();
        instructor.ratings.push(rating._id);
        await instructor.save();
        const res = await request.get(`/me/ratings`).set("Cookie", token);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.ratings.length).toBe(1);
        expect(res.body.ratings[0].comment).toBe(rating.comment);
        expect(res.body.ratings[0].rating).toBe(rating.rating);
    });

    it("Should return an empty array if the instructor has no ratings", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();

        const anotherInstructor = new Instructor(instructorFactory());
        anotherInstructor.ratings.push(rating._id);
        await anotherInstructor.save();

        const { token } = await getInstructorToken();
        const res = await request.get(`/me/ratings`).set("Cookie", token);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.ratings.length).toBe(0);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

async function getInstructorToken() {
    const instructor = new Instructor(instructorFactory());
    const password = faker.internet.password();
    instructor.passwordHash = password;
    await instructor.save();

    const res = await request.post("/auth/login").send({
        email: instructor.email,
        password: password
    });
    const token = res.header["set-cookie"][0];
    return { token, instructor };
}
