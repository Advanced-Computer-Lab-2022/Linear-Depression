import { disconnectDBForTesting, connectDBForTesting, TIME_OUT } from "../../../utils/testUtilities";
import supertest from "supertest";
import app from "../../../server";
import { corporateTraineeFactory } from "../../test_models/trainee/factory";
import { StatusCodes } from "http-status-codes";
import Course from "../../../models/Course";
import { courseFactory } from "../../test_models/course/factory";
import CorporateTrainee from "../../../models/CorporateTrainee";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
const request = supertest(app);

describe("CorporateTrainee APIs", () => {
    describe("Test GET /corporate-trainees/ ", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it.skip("should return an empty array when database is empty", async () => {
            const response = await request.get("/corporate-trainees");
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.corporateTrainees).toEqual([]);
        });

        it.skip("should return an array of individual trainees", async () => {
            const randomLength = Math.floor(Math.random() * 10) + 1;
            for (let i = 0; i < randomLength; i++) {
                const corporateTrainee = new CorporateTrainee(corporateTraineeFactory());
                await corporateTrainee.save();
            }
            const response = await request.get("/corporate-trainees");
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.corporateTrainees.length).toBe(randomLength);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });

    describe("Test GET /corporate-trainees/:corporateTraineeId", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it.skip(
            "should return an corporateTrainee",
            async () => {
                const corporateTrainee = new CorporateTrainee(corporateTraineeFactory());
                await corporateTrainee.save();
                const response = await request.get(`/corporate-trainees/${corporateTrainee._id}`);
                expect(response.status).toBe(StatusCodes.OK);
                expect(response.body.corporateTrainee.firstName).toEqual(corporateTrainee.firstName);
            },
            TIME_OUT
        );

        it.skip("should populate Courses", async () => {
            const course = new Course(courseFactory());
            await course.save();
            const corporateTrainee = new CorporateTrainee(corporateTraineeFactory());
            corporateTrainee.courses = [course._id];
            await corporateTrainee.save();
            const response = await request.get(`/corporate-trainees/${corporateTrainee._id}`);
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.corporateTrainee.courses[0].title).toEqual(course.title);
        });

        it.skip("should not return an corporateTrainee", async () => {
            const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
            const response = await request.get(`/corporate-trainees/${fakeId}`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it.skip("should return an error when id is undefined", async () => {
            const response = await request.get(`/corporate-trainees/${undefined}`);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });

        it.skip("should return an error when id is invalid", async () => {
            const response = await request.get(`/corporate-trainees/123`);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });

    describe("Test POST /corporate-trainees/", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);
        it.skip("should create an corporateTrainee", async () => {
            let corporateTrainee = corporateTraineeFactory();
            corporateTrainee["userName"] = "test";
            corporateTrainee["firstName"] = "first";
            const response = await request.post("/corporate-trainees").send(corporateTrainee);
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.corporateTrainee.firstName).toEqual(corporateTrainee.firstName);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });

    describe("Test PUT /corporate-trainees/:corporateTraineeId", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it.skip("should update an corporateTrainee", async () => {
            const corporateTrainee = new CorporateTrainee(corporateTraineeFactory());
            await corporateTrainee.save();
            const fakeFirstName = faker.name.firstName();
            const response = await request
                .put(`/corporate-trainees/${corporateTrainee._id}`)
                .send({ firstName: fakeFirstName });
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.corporateTrainee.firstName).toEqual(fakeFirstName);
        });

        it.skip("should not update an corporateTrainee", async () => {
            const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
            const response = await request.put(`/corporate-trainees/${fakeId}`).send({ firstName: "newFirstName" });
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });

    describe("Test DELETE /corporate-trainees/:corporateTraineeId", () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it.skip("should delete an corporateTrainee", async () => {
            const corporateTrainee = new CorporateTrainee(corporateTraineeFactory());
            await corporateTrainee.save();
            const response = await request.delete(`/corporate-trainees/${corporateTrainee._id}`);
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.corporateTrainee.firstName).toEqual(corporateTrainee.firstName);
        });

        it.skip("should not delete an corporateTrainee", async () => {
            const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
            const response = await request.delete(`/corporate-trainees/${fakeId}`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it.skip("should return an error when id is undefined", async () => {
            const response = await request.delete(`/corporate-trainees/${undefined}`);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });
});
