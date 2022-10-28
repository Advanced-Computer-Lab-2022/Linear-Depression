import Course from "../../../models/Course";
import mongoose from "mongoose";
import { courseFactory } from "../../test_models/course/factory";
import { faker } from "@faker-js/faker";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import { StatusCodes } from "http-status-codes";
import { TIME_OUT } from "../../../utils/testUtilities";
import supertest from "supertest";
import app from "../../../server";
const request = supertest(app);

describe("GET /courses/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("should return an empty array when the db is empty", async () => {
        const response = await request.get("/courses");
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.courses).toEqual([]);
    });
    it("Should return all courses correctly", async () => {
        const randomLength = faker.datatype.number({ min: 2, max: 10 });
        const courses = [];
        for (let i = 0; i < randomLength; i++) {
            const course = new Course(courseFactory());
            await course.save();
            courses.push(course);
        }

        const res = await request.get("/courses");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.courses.length).toBe(courses.length);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("GET /courses/:courseId", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    let cookie: string;
    it("Should return an course successfully", async () => {
        const course = new Course(courseFactory());
        await course.save();
        // set cookie country to US
        const res = await request.get(`/courses/${course._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.course.title).toEqual(course.title);
        expect(res.body.course.currency).toEqual("USD");
    });

    //FIXME: This is an issue with `supertest` and `Jest` that I can't figure out
    // it's still an open issue on github, so tested using postman
    // I've spent a lot of time on this, so I'm just going to leave it for now.

    // it("Should return an course successfully with currency set to EG", async () => {
    //     const course = new Course(courseFactory());
    //     await course.save();
    // change the cookie to EG
    //     const resp = await request.post("/country/eg");
    //     cookie = resp.header["set-cookie"][0];
    //     const res = await request.get(`/courses/${course._id}`).set("Cookie", cookie);
    //     const res = await request.get(`/courses/${course._id}`).set("Cookie", cookie);
    //     expect(res.status).toBe(StatusCodes.OK);
    //     expect(res.body.course.title).toEqual(course.title);
    //     expect(res.body.course.currency).toEqual("EGP");
    // });

    it("Should raise 404 when given wrong id", async () => {
        const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
        const res = await request.get(`/courses/${fakeId}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });
    it("Should return an error if the courseId is undefined", async () => {
        const res = await request.get(`/courses/${undefined}`);
        expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
    it("Should return an error if courseId is not a valid ObjectId", async () => {
        const res = await request.get("/courses/123");
        expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("POST /courses/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should create a course successfully", async () => {
        const course = courseFactory();
        const res = await request.post("/courses").send(course);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.course.title).toEqual(course.title);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("PUT /courses/:courseId", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should update a course successfully", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const fakeTitle = faker.lorem.word();
        const res = await request.put(`/courses/${course._id}`).send({ title: fakeTitle });
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.course.title).toEqual(fakeTitle);
    });
    it("Should raise 404 when given wrong id", async () => {
        const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
        const res = await request.put(`/courses/${fakeId}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("DELETE /courses/:courseId", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should delete a course successfully", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const res = await request.delete(`/courses/${course._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.course.title).toEqual(course.title);
    });
    it("Should raise error when invalid id", async () => {
        const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
        const res = await request.delete(`/courses/${fakeId}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body.message).toEqual("not found");
    });
    it("Should return an error if the courseId is undefined", async () => {
        const res = await request.delete(`/courses/${undefined}`);
        expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("GET /courses?name=...", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });

    it("Should return a course with the given title", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const res = await request.get(`/courses?title=${course.title}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.courses.length).toBe(1);
        expect(res.body.courses[0].title).toEqual(course.title);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});
