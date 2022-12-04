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
import mongoose from "mongoose";
import IndividualTrainee from "../../../models/IndividualTrainee";
import { individualTraineeFactory } from "../../test_models/trainee/factory";

describe("GET /me/ratings", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    }, TIME_OUT);

    it("Should return all ratings of an instructor having comments", async () => {
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

    it("Should skip the ratings having no comments", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();

        const { token, instructor } = await getInstructorToken();
        instructor.ratings.push(rating._id);
        await instructor.save();

        const anotherRating = new Rating(ratingFactory());
        anotherRating.comment = undefined;
        await anotherRating.save();

        instructor.ratings.push(anotherRating._id);
        await instructor.save();

        const res = await request.get(`/me/ratings`).set("Cookie", token);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.ratings.length).toBe(1);
        expect(res.body.ratings[0].comment).toBe(rating.comment);
        expect(res.body.ratings[0].rating).toBe(rating.rating);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("POST /instructors/:instructorId/ratings", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    }, TIME_OUT);

    it("Should create a rating successfully", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();

        const ratingData = ratingFactory();
        ratingData.traineeID = undefined!;
        const { trainee, token } = await getTraineeToken();
        await trainee.save();
        const res = await request.post(`/instructors/${instructor._id}/ratings`).set("Cookie", token).send(ratingData);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating.comment).toBe(ratingData.comment);
        expect(res.body.rating.rating).toBe(ratingData.rating);
    });

    it("Should return 404 if the instructor does not exist", async () => {
        const { token } = await getInstructorToken();

        const ratingData = ratingFactory();
        const res = await request
            .post(`/instructors/${new mongoose.Types.ObjectId()}/ratings`)
            .set("Cookie", token)
            .send(ratingData);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("Should return 400 if the rating data is invalid", async () => {
        const { token, instructor } = await getInstructorToken();

        const ratingData = ratingFactory();
        ratingData.rating = 6;
        const res = await request.post(`/instructors/${instructor._id}/ratings`).set("Cookie", token).send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return 400 if the trainee does not exist", async () => {
        const { token, instructor } = await getInstructorToken();

        const ratingData = ratingFactory();
        ratingData.traineeID = new mongoose.Types.ObjectId();

        const res = await request.post(`/instructors/${instructor._id}/ratings`).set("Cookie", token).send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
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

async function getTraineeToken() {
    const trainee = new IndividualTrainee(individualTraineeFactory());
    const password = faker.internet.password();
    trainee.passwordHash = password;
    await trainee.save();

    const res = await request.post("/auth/login").send({
        email: trainee.email,
        password: password
    });
    const token = res.header["set-cookie"][0];
    return { token, trainee };
}
