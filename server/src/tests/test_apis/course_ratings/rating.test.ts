import Rating, { IRating } from "../../../models/Rating";
import mongoose from "mongoose";
import { ratingFactory } from "../../test_models/rating/factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";
import { TIME_OUT } from "../../../utils/testUtilities";
import supertest from "supertest";
import app from "../../../server";
import { corporateTraineeFactory, individualTraineeFactory } from "../../test_models/trainee/factory";
import IndividualTrainee from "../../../models/IndividualTrainee";
import CorporateTrainee from "../../../models/CorporateTrainee";
import Course, { ICourse } from "../../../models/Course";
import { courseFactory } from "../../test_models/course/factory";

const createCourseWithRatings = async () => {
    const courseData = courseFactory();
    const rating = new Rating(ratingFactory());
    await rating.save();
    courseData.ratings = [rating._id];
    const course = new Course(courseData);
    await course.save();
    return { course, rating };
};

function getRatingData(rating: IRating) {
    const ratingData = rating.toJSON();
    delete ratingData.id;
    delete ratingData._id;
    return ratingData;
}
const request = supertest(app);

describe("GET /courses/:courseId/ratings", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });
    it.skip("It should return 404 if course is not found", async () => {
        const response = await request.get(`/courses/${new mongoose.Types.ObjectId()}/ratings`);
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it.skip("Should skip ratings having no comments", async () => {
        const { course } = await createCourseWithRatings();

        const rating2 = new Rating(ratingFactory());
        rating2.comment = undefined;
        await rating2.save();
        course.ratings.push(rating2._id);
        const response = await request.get(`/courses/${course._id}/ratings`);
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.ratings).toHaveLength(1);
    });

    it.skip("Should return all ratings correctly with comments", async () => {
        const course = new Course(courseFactory());

        const randomLength = faker.datatype.number({ min: 1, max: 10 });
        const ratings = [];
        for (let i = 0; i < randomLength; i++) {
            const rating = new Rating(ratingFactory());
            course.ratings.push(rating._id);
            await rating.save();
            ratings.push(rating);
        }
        await course.save();
        const response = await request.get(`/courses/${course._id}/ratings`);
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.ratings).toHaveLength(randomLength);
    });

    it.skip("Should return all ratings correctly with comments and skip ratings having no comments", async () => {
        const course = new Course(courseFactory());

        const randomLength = faker.datatype.number({ min: 1, max: 10 });
        const ratings = [];
        for (let i = 0; i < randomLength; i++) {
            const rating = new Rating(ratingFactory());
            course.ratings.push(rating._id);
            await rating.save();
            ratings.push(rating);
        }

        const rating = new Rating(ratingFactory());
        rating.comment = undefined;
        course.ratings.push(rating._id);
        await rating.save();
        await course.save();

        const response = await request.get(`/courses/${course._id}/ratings`);
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.ratings).toHaveLength(randomLength);
    });

    it.skip("Should return only this course's ratings", async () => {
        const { course } = await createCourseWithRatings();
        const course2 = new Course(courseFactory());
        const rating2 = new Rating(ratingFactory());
        await rating2.save();
        course2.ratings.push(rating2._id);
        await course2.save();
        const response = await request.get(`/courses/${course._id}/ratings`);
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.ratings).toHaveLength(1);
    });

    it.skip("Should return empty array if no ratings", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const rating = new Rating(ratingFactory());
        await rating.save();

        const response = await request.get(`/courses/${course._id}/ratings`);
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.ratings).toHaveLength(0);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("GET /courses/:courseId/ratings/:ratingId", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it.skip("Should return a rating with the given id", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();

        const courseData = courseFactory();
        courseData.ratings.push(rating._id);
        const course = new Course(courseData);
        await course.save();

        const response = await request.get(`/courses/${course._id}/ratings/${rating._id}`);
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.rating).toBeDefined();
        expect(response.body.rating._id).toEqual(rating._id.toString());
    });

    it.skip("Should return a 404 error if the rating does not exist", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const response = await request.get(`/courses/${course._id}/ratings/${new mongoose.Types.ObjectId()}`);
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it.skip("Should return a 400 error if the rating id is invalid", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const response = await request.get(`/courses/${course._id}/ratings/123`);
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it.skip("Should return IndividualTrainee fields", async () => {
        const trainee = new IndividualTrainee(individualTraineeFactory());
        await trainee.save();

        const ratingData = ratingFactory();
        ratingData.traineeId = trainee._id as mongoose.Types.ObjectId;
        const rating = new Rating(ratingData);
        const courseData = courseFactory();
        courseData.ratings.push(rating._id);
        const course = new Course(courseData);
        await course.save();
        await rating.save();

        const res = await request.get(`/courses/${course._id}/ratings/${rating._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating.trainee._id).toEqual(trainee._id.toString());
        expect(res.body.rating.trainee.firstName).toBe(trainee.firstName);
        expect(res.body.rating.trainee.lastName).toBe(trainee.lastName);
    });

    it.skip("Should return CorporateTrainee fields", async () => {
        const trainee = new CorporateTrainee(corporateTraineeFactory());
        await trainee.save();

        const ratingData = ratingFactory();
        ratingData.traineeId = trainee._id as mongoose.Types.ObjectId;
        const rating = new Rating(ratingData);
        const courseData = courseFactory();
        courseData.ratings.push(rating._id);
        const course = new Course(courseData);
        await course.save();
        await rating.save();

        const res = await request.get(`/courses/${course._id}/ratings/${rating._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating.trainee._id).toBe(trainee._id.toString());
        expect(res.body.rating.trainee.firstName).toBe(trainee.firstName);
        expect(res.body.rating.trainee.lastName).toBe(trainee.lastName);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

describe("POST /courses/:courseId/ratings", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it.skip("Should create a new rating Successfully", async () => {
        const { token, trainee } = await getTraineeToken();

        const courseData = courseFactory();
        const course = new Course(courseData);
        await course.save();

        const ratingData = ratingFactory();
        ratingData.traineeId = trainee._id as mongoose.Types.ObjectId;

        const res = await request.post(`/courses/${course._id}/ratings`).send(ratingData).set("Cookie", token);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBe(ratingData.comment);
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeId).toBe(ratingData.traineeId.toString());

        const courseRes = await request.get(`/courses/${course._id}`);
        expect(courseRes.status).toBe(StatusCodes.OK);
        expect(courseRes.body.course.ratings).toHaveLength(1);
    });

    it.skip("Should return a 200 ok if no comment is provided", async () => {
        const { token, trainee } = await getTraineeToken();

        const courseData = courseFactory();
        const course = new Course(courseData);
        await course.save();

        const ratingData = ratingFactory();
        ratingData.traineeId = trainee._id as mongoose.Types.ObjectId;
        ratingData.comment = undefined;

        const res = await request.post(`/courses/${course._id}/ratings`).send(ratingData).set("Cookie", token);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBeUndefined();
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeId).toBe(ratingData.traineeId.toString());
    });

    it.skip("Should return a 400 error if the rating is missing", async () => {
        const { token, trainee } = await getTraineeToken();

        const { course, rating } = await createCourseWithRatings();
        rating.traineeId = trainee._id;
        rating.rating = undefined!;
        const res = await request
            .post(`/courses/${course._id}/ratings`)
            .send(getRatingData(rating))
            .set("Cookie", token);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it.skip("Should return a 400 error if the rating exists for the trainee and course", async () => {
        const { token, trainee } = await getTraineeToken();

        const { course, rating } = await createCourseWithRatings();
        rating.traineeId = trainee._id;
        rating.save();
        await request.post(`/courses/${course._id}/ratings`).send(getRatingData(rating));
        const res = await request
            .post(`/courses/${course._id}/ratings`)
            .send(getRatingData(rating))
            .set("Cookie", token);

        console.log(res.body);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it.skip("Should return a 201 if the rating exists for the course but not the trainee", async () => {
        const { token, trainee } = await getTraineeToken();

        const courseData = courseFactory();
        const course = new Course(courseData);
        await course.save();

        const ratingData = ratingFactory();
        ratingData.traineeId = trainee._id as mongoose.Types.ObjectId;
        const rating = new Rating(ratingData);
        await rating.save();

        const traineeData2 = individualTraineeFactory();
        const trainee2 = new IndividualTrainee(traineeData2);
        await trainee2.save();

        const ratingData2 = ratingFactory();
        ratingData2.traineeId = trainee2._id as mongoose.Types.ObjectId;

        const res = await request.post(`/courses/${course._id}/ratings`).send(ratingData2).set("Cookie", token);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBe(ratingData2.comment);
        expect(res.body.rating.rating).toBe(ratingData2.rating);
        expect(res.body.rating.traineeId).toBe(ratingData2.traineeId.toString());
    });

    it.skip("should return 200 if the rating exists for the trainee but not the course", async () => {
        const { token, trainee } = await getTraineeToken();

        const courseData = courseFactory();
        const course = new Course(courseData);
        await course.save();

        const ratingData = ratingFactory();
        ratingData.traineeId = trainee._id as mongoose.Types.ObjectId;
        const rating = new Rating(ratingData);
        await rating.save();
        course.ratings.push(rating._id);
        await course.save();

        const courseData2 = courseFactory();
        const course2 = new Course(courseData2);
        await course2.save();

        const res = await request.post(`/courses/${course2._id}/ratings`).send(ratingData).set("Cookie", token);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBe(ratingData.comment);
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeId).toBe(ratingData.traineeId.toString());
    });
    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

describe("PUT /courses/:courseId/ratings/:ratingId", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it.skip("Should update a rating Successfully", async () => {
        const { course, rating } = await createCourseWithRatings();
        const ratingData = getRatingData(rating);
        ratingData.comment = "New Comment";
        ratingData.rating = 5;

        const res = await request.put(`/courses/${course._id}/ratings/${rating._id}`).send(ratingData);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating._id).toBe(rating._id.toString());
        expect(res.body.rating.comment).toBe(ratingData.comment);
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeId).toBe(ratingData.traineeId.toString());
    });

    it.skip("Should return a 400 error if the rating is invalid", async () => {
        const { course, rating } = await createCourseWithRatings();
        const ratingData = getRatingData(rating);
        ratingData.rating = 6;

        const res = await request.put(`/courses/${course._id}/ratings/${rating._id}`).send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it.skip("Should return a 400 error if the traineeId is invalid", async () => {
        const { course, rating } = await createCourseWithRatings();
        const ratingData = getRatingData(rating);
        ratingData.traineeId = "invalid";

        const res = await request.put(`/courses/${course._id}/ratings/${rating._id}`).send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

describe("DELETE /courses/:courseId/ratings/:ratingId", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it.skip("Should delete a rating Successfully", async () => {
        const { course, rating } = await createCourseWithRatings();
        const { token, trainee } = await getTraineeToken();
        rating.traineeId = trainee._id;
        await rating.save();
        const res = await request.delete(`/courses/${course._id}/ratings/${rating._id}`).set("Cookie", token);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating._id).toBe(rating._id.toString());
        expect(res.body.rating.comment).toBe(rating.comment);
        expect(res.body.rating.rating).toBe(rating.rating);
        expect(res.body.rating.traineeId).toBe(rating.traineeId.toString());

        expect(await Rating.findById(rating._id)).toBeNull();
        const courseAfterDelete = (await Course.findById(course._id)) as ICourse;
        expect(courseAfterDelete.ratings).not.toContain(rating._id);
    });

    it.skip("Should return a 404 error if the rating is not found", async () => {
        const { course } = await createCourseWithRatings();
        const { token, trainee } = await getTraineeToken();
        const res = await request
            .delete(`/courses/${course._id}/ratings/${new mongoose.Types.ObjectId()}`)
            .set("Cookie", token);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

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
