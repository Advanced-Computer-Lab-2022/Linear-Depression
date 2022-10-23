import Instructor from "../../../models/Instructor";
import mongoose from "mongoose";
import { instructorFactory } from "../../test_models/instructor/factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";
import { TIME_OUT } from "../../../utils/testUtilities";
import supertest from "supertest";
import app from "../../../server";

const request = supertest(app);

describe("GET /instructors/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    });

    it("should return an empty array", async () => {
        const response = await request.get("/instructors");
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.instructors).toEqual([]);
    });
});

describe("GET /instructors/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should return all instructors", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();

        const res = await request.get("/instructors");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.instructors.length).toBe(1);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("GET /instructors/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should return all instructors", async () => {
        const randomLength = faker.datatype.number({ min: 2, max: 10 });
        const instructors = [];
        for (let i = 0; i < randomLength; i++) {
            const instructor = new Instructor(instructorFactory());
            await instructor.save();
            instructors.push(instructor);
        }

        const res = await request.get("/instructors");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.instructors.length).toBe(instructors.length);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("GET /instructors/:instructorId", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should return an instructor", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();

        const res = await request.get(`/instructors/${instructor._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.instructor.firstName).toEqual(instructor.firstName);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("GET /instructors/:instructorId", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should not return an instructor", async () => {
        const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
        const res = await request.get(`/instructors/${fakeId}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("POST /instructors/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should create an instructor", async () => {
        const instructor = instructorFactory();
        const res = await request.post("/instructors").send(instructor);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.instructor.firstName).toEqual(instructor.firstName);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("POST /instructors/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should not create an instructor", async () => {
        const firstInstructor = instructorFactory();
        const firstRes = await request.post("/instructors").send(firstInstructor);
        expect(firstRes.status).toBe(StatusCodes.CREATED);
        expect(firstRes.body.instructor.firstName).toEqual(firstInstructor.firstName);

        const secondInstructor = instructorFactory();
        secondInstructor.userName = firstInstructor.userName;
        const secondRes = await request.post("/instructors").send(secondInstructor);
        expect(secondRes.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("PUT /instructors/:instructorId", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should update an instructor", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();

        const fakeFirstName = faker.name.firstName();
        const res = await request.put(`/instructors/${instructor._id}`).send({ firstName: fakeFirstName });
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.instructor.firstName).toEqual(fakeFirstName);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("DELETE /instructors/:instructorId", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should delete an instructor", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();

        const res = await request.delete(`/instructors/${instructor._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.instructor.firstName).toEqual(instructor.firstName);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});
