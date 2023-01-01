import { faker } from "@faker-js/faker";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import supertest from "supertest";
import Course from "../../../models/Course";
import Instructor from "../../../models/Instructor";
import app from "../../../server";
import { connectDBForTesting, disconnectDBForTesting, TIME_OUT } from "../../../utils/testUtilities";
import { courseFactory } from "../../test_models/course/factory";
import { instructorFactory } from "../../test_models/instructor/factory";
import { lessonFactory } from "../../test_models/lesson/factory";
const request = supertest(app);

describe("GET /courses/", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it.skip("should return an empty array when the db is empty", async () => {
        const response = await request.get("/courses");
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.courses).toEqual([]);
    });
    it.skip("Should return all courses correctly", async () => {
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
    it.skip("Should return an course successfully", async () => {
        const course = new Course(courseFactory());
        await course.save();
        // set cookie country to US
        const res = await request.get(`/courses/${course._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.course.title).toEqual(course.title);
        expect(res.body.course.currency).toEqual("USD");
    });

    //FIXME: This is an issue with `supertest` and `Jest` that I can't figure out
    // it.skip's still an open issue on github, so tested using postman
    // I've spent a lot of time on this, so I'm just going to leave it.skip for now.

    // it.skip("Should return an course successfully with currency set to EG", async () => {
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

    it.skip("Should raise 404 when given wrong id", async () => {
        const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
        const res = await request.get(`/courses/${fakeId}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });
    it.skip("Should return an error if the courseId is undefined", async () => {
        const res = await request.get(`/courses/${undefined}`);
        expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
    it.skip("Should return an error if courseId is not a valid ObjectId", async () => {
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
    it.skip("Should create a course successfully", async () => {
        const { token } = await getInstructorToken();

        const course = courseFactory();
        const response = await request.post("/courses").set("Cookie", token).send(course);
        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body.course.title).toEqual(course.title);
        expect(response.body.course.description).toEqual(course.description);
        expect(response.body.course.price).toEqual(course.price);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("PUT /courses/:courseId", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it.skip("Should update a course successfully", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const fakeTitle = faker.lorem.word();
        const res = await request.put(`/courses/${course._id}`).send({ title: fakeTitle });
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.course.title).toEqual(fakeTitle);
    });
    it.skip("Should raise 404 when given wrong id", async () => {
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
    it.skip("Should delete a course successfully", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const res = await request.delete(`/courses/${course._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.course.title).toEqual(course.title);
    });
    it.skip("Should raise error when invalid id", async () => {
        const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
        const res = await request.delete(`/courses/${fakeId}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body.message).toEqual("not found");
    });
    it.skip("Should return an error if the courseId is undefined", async () => {
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

    it.skip("Should return a course with the given title", async () => {
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

describe("Post /courses/:courseId/lessons", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });

    it.skip("Should create a lesson successfully", async () => {
        const course = new Course(courseFactory());
        course.lessons = [];
        await course.save();
        expect(course.lessons.length).toBe(0);
        const lesson = lessonFactory();
        const res = await request.post(`/courses/${course._id}/lessons`).send(lesson);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.lesson.title).toEqual(lesson.title);
        expect(res.body.lesson.video).toEqual(lesson.video);

        const courseFromDB = await Course.findById(course._id);
        expect(courseFromDB?.lessons.length).toBe(1);
    });

    // TODO: fix this @Abdulaziz
    it.todo("Should raise 404 when given wrong id");
    //     const fakeId = new mongoose.Types.ObjectId(faker.database.mongodbObjectId());
    //     const res = await request.post(`/courses/${fakeId}/lessons`);
    //     expect(res.status).toBe(StatusCodes.NOT_FOUND);

    it.skip("Should return an error if the courseId is undefined", async () => {
        const res = await request.post(`/courses/${undefined}/lessons`);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it.skip("Should update course total hours when a lesson is created", async () => {
        const course = new Course(courseFactory());
        course.lessons = [];
        course.totalHours = 0;
        await course.save();

        const lesson = lessonFactory();
        const res = await request.post(`/courses/${course._id}/lessons`).send(lesson);
        expect(res.status).toBe(StatusCodes.CREATED);

        const updatedCourse = await Course.findById(course._id);
        expect(updatedCourse?.lessons).toHaveLength(1);
        expect(updatedCourse?.totalHours).toEqual(lesson.totalHours);
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
