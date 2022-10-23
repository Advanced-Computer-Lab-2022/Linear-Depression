import Instructor from "../../../models/Instructor";
import { instructorFactory } from "../../test_models/instructor/factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../../server";

const request = supertest(app);

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
    }, 10000);
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
    }, 10000);
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
    }, 10000);
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
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.instructor.firstName).toEqual(fakeFirstName);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, 10000);
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
    }, 10000);
});
