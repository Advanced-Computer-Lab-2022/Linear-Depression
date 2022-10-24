import { disconnectDBForTesting, connectDBForTesting, TIME_OUT } from "../../../utils/testUtilities";
import supertest from "supertest";
import app from "../../../server";
import { individualTraineeFactory } from "../../test_models/trainee/factory";
import { StatusCodes } from "http-status-codes";
import Course from "../../../models/Course";
import { courseFactory } from "../../test_models/course/factory";
import IndividualTrainee from "../../../models/IndividualTrainee";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Logger from "../../../library/Logger";
const request = supertest(app);

describe("IndividualTrainee APIs", () => {
    describe("Test GET /individual-trainees/ ", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it("should return an empty array when database is empty", async () => {
            const response = await request.get("/individual-trainees");
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.individualTrainees).toEqual([]);
        });

        it("should return an array of individual trainees", async () => {
            const randomLength = Math.floor(Math.random() * 10) + 1;
            for (let i = 0; i < randomLength; i++) {
                const individualTrainee = new IndividualTrainee(individualTraineeFactory());
                await individualTrainee.save();
            }
            const response = await request.get("/individual-trainees");
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.individualTrainees.length).toBe(randomLength);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });

    describe("Test GET /individual-trainees/:individualTraineeId", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it("should return an individualTrainee", async () => {
            const individualTrainee = new IndividualTrainee(individualTraineeFactory());
            await individualTrainee.save();
            const response = await request.get(`/individual-trainees/${individualTrainee._id}`);
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.individualTrainee.firstName).toEqual(individualTrainee.firstName);
        });

        it("should populate Courses", async () => {
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

        it("should not return an individualTrainee", async () => {
            const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
            const response = await request.get(`/individual-trainees/${fakeId}`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it("should return an error when id is undefined", async () => {
            const response = await request.get(`/individual-trainees/${undefined}`);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });

        it("should return an error when id is invalid", async () => {
            const response = await request.get(`/individual-trainees/123`);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });

    describe("Test POST /individual-trainees/", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);
        it("should create an individualTrainee", async () => {
            let individualTrainee = individualTraineeFactory();
            individualTrainee["userName"] = "test";
            individualTrainee["firstName"] = "first";
            const response = await request.post("/individual-trainees").send(individualTrainee);
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.individualTrainee.firstName).toEqual(individualTrainee.firstName);
            console.log(request.body.individualTrainee);
        });
        it("should return error if duplicate email", async () => {
            const secondIndividualTrainee = individualTraineeFactory();
            secondIndividualTrainee["userName"] = "test";
            secondIndividualTrainee.firstName = "second";
            const res = await IndividualTrainee.find().exec();
            expect(res.length).toBe(1);
            const secondRes = await request.post("/individual-trainees").send(secondIndividualTrainee);
            const res1 = await IndividualTrainee.find().exec();
            for (const ind of res1) {
                console.log(ind);
            }
            expect(res.length).toBe(1);

            expect(secondRes.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });

    describe("Test PUT /individual-trainees/:individualTraineeId", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it("should update an individualTrainee", async () => {
            const individualTrainee = new IndividualTrainee(individualTraineeFactory());
            await individualTrainee.save();
            const fakeFirstName = faker.name.firstName();
            const response = await request
                .put(`/individual-trainees/${individualTrainee._id}`)
                .send({ firstName: fakeFirstName });
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.individualTrainee.firstName).toEqual(fakeFirstName);
        });

        it("should not update an individualTrainee", async () => {
            const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
            const response = await request.put(`/individual-trainees/${fakeId}`).send({ firstName: "newFirstName" });
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });

    describe("Test DELETE /individual-trainees/:individualTraineeId", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it("should delete an individualTrainee", async () => {
            const individualTrainee = new IndividualTrainee(individualTraineeFactory());
            await individualTrainee.save();
            const response = await request.delete(`/individual-trainees/${individualTrainee._id}`);
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.individualTrainee.firstName).toEqual(individualTrainee.firstName);
        });

        it("should not delete an individualTrainee", async () => {
            const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
            const response = await request.delete(`/individual-trainees/${fakeId}`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it("should return an error when id is undefined", async () => {
            const response = await request.delete(`/individual-trainees/${undefined}`);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });
});
