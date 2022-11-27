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
    it("should return an empty array when the db is empty", async () => {
        const response = await request.get("/courses/1/ratings");
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.ratings).toEqual([]);
    });

    it("Should skip ratings having no comments", async () => {
        const { course, rating } = await createCourseWithRatings();

        const rating2 = new Rating(ratingFactory());
        rating2.comment = undefined;
        await rating2.save();
        course.ratings.push(rating2._id);
        const response = await request.get(`/courses/${course._id}/ratings`);
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.ratings).toHaveLength(1);
    });

    it("Should return all ratings correctly with comments", async () => {
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

    it("Should return all ratings correctly with comments and skip ratings having no comments", async () => {
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

    afterEach(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("GET /courses/:courseId/ratings/:ratingId", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it("Should return a rating with the given id", async () => {
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

    it("Should return a 404 error if the rating does not exist", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const response = await request.get(`/courses/${course._id}/ratings/${new mongoose.Types.ObjectId()}`);
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("Should return a 400 error if the rating id is invalid", async () => {
        const course = new Course(courseFactory());
        await course.save();

        const response = await request.get(`/courses/${course._id}/ratings/123`);
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return IndividualTrainee fields", async () => {
        const trainee = new IndividualTrainee(individualTraineeFactory());
        await trainee.save();

        const ratingData = ratingFactory();
        ratingData.traineeID = trainee._id as mongoose.Types.ObjectId;
        const rating = new Rating(ratingData);
        const courseData = courseFactory();
        courseData.ratings.push(rating._id);
        const course = new Course(courseData);
        await course.save();
        await rating.save();

        const res = await request.get(`/courses/${course._id}/ratings/${rating._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating.IndividualTrainee._id).toBe(trainee._id.toString());
        expect(res.body.rating.IndividualTrainee.firstName).toBe(trainee.firstName);
        expect(res.body.rating.IndividualTrainee.lastName).toBe(trainee.lastName);
    });

    it("Should return CorporateTrainee fields", async () => {
        const trainee = new CorporateTrainee(corporateTraineeFactory());
        await trainee.save();

        const ratingData = ratingFactory();
        ratingData.traineeID = trainee._id as mongoose.Types.ObjectId;
        const rating = new Rating(ratingData);
        const courseData = courseFactory();
        courseData.ratings.push(rating._id);
        const course = new Course(courseData);
        await course.save();
        await rating.save();

        const res = await request.get(`/courses/${course._id}/ratings/${rating._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating.CorporateTrainee._id).toBe(trainee._id.toString());
        expect(res.body.rating.CorporateTrainee.firstName).toBe(trainee.firstName);
        expect(res.body.rating.CorporateTrainee.lastName).toBe(trainee.lastName);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

describe("POST /courses/:courseId/ratings", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it("Should create a new rating Successfully", async () => {
        const traineeData = individualTraineeFactory();
        const trainee = new IndividualTrainee(traineeData);
        await trainee.save();

        const courseData = courseFactory();
        const course = new Course(courseData);
        await course.save();

        const ratingData = ratingFactory();
        ratingData.traineeID = trainee._id as mongoose.Types.ObjectId;

        const res = await request.post(`/courses/${course._id}/ratings`).send(ratingData);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBe(ratingData.comment);
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeID).toBe(ratingData.traineeID.toString());

        const courseRes = await request.get(`/courses/${course._id}`);
        expect(courseRes.status).toBe(StatusCodes.OK);
        expect(courseRes.body.course.ratings).toHaveLength(1);
    });

    it("Should return a 400 error if the traineeID is not found", async () => {
        const { course, rating } = await createCourseWithRatings();
        rating.traineeID = new mongoose.Types.ObjectId();
        const res = await request.post(`/courses/${course._id}/ratings`).send(getRatingData(rating));
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return a 200 ok if no comment is provided", async () => {
        const traineeData = individualTraineeFactory();
        const trainee = new IndividualTrainee(traineeData);
        await trainee.save();

        const courseData = courseFactory();
        const course = new Course(courseData);
        await course.save();

        const ratingData = ratingFactory();
        ratingData.traineeID = trainee._id as mongoose.Types.ObjectId;
        ratingData.comment = undefined;

        const res = await request.post(`/courses/${course._id}/ratings`).send(ratingData);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBeUndefined();
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeID).toBe(ratingData.traineeID.toString());
    });

    it("Should return a 400 error if the rating is missing", async () => {
        const traineeData = individualTraineeFactory();
        const trainee = new IndividualTrainee(traineeData);
        await trainee.save();

        const { course, rating } = await createCourseWithRatings();
        rating.traineeID = trainee._id;
        rating.rating = undefined!;
        const res = await request.post(`/courses/${course._id}/ratings`).send(getRatingData(rating));
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return a 400 error if the rating exists for the trainee and course", async () => {
        const traineeData = individualTraineeFactory();
        const trainee = new IndividualTrainee(traineeData);
        await trainee.save();

        const { course, rating } = await createCourseWithRatings();
        rating.traineeID = trainee._id;
        await request.post(`/courses/${course._id}/ratings`).send(getRatingData(rating));
        const res = await request.post(`/courses/${course._id}/ratings`).send(getRatingData(rating));
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return a 201 if the rating exists for the course but not the trainee", async () => {
        const traineeData = individualTraineeFactory();
        const trainee = new IndividualTrainee(traineeData);
        await trainee.save();

        const courseData = courseFactory();
        const course = new Course(courseData);
        await course.save();

        const ratingData = ratingFactory();
        ratingData.traineeID = trainee._id as mongoose.Types.ObjectId;
        const rating = new Rating(ratingData);
        await rating.save();

        const traineeData2 = individualTraineeFactory();
        const trainee2 = new IndividualTrainee(traineeData2);
        await trainee2.save();

        const ratingData2 = ratingFactory();
        ratingData2.traineeID = trainee2._id as mongoose.Types.ObjectId;

        const res = await request.post(`/courses/${course._id}/ratings`).send(ratingData2);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBe(ratingData2.comment);
        expect(res.body.rating.rating).toBe(ratingData2.rating);
        expect(res.body.rating.traineeID).toBe(ratingData2.traineeID.toString());
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

describe("PUT /courses/:courseId/ratings/:ratingId", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it("Should update a rating Successfully", async () => {
        const { course, rating } = await createCourseWithRatings();
        const ratingData = getRatingData(rating);
        ratingData.comment = "New Comment";
        ratingData.rating = 5;

        const res = await request.put(`/courses/${course._id}/ratings/${rating._id}`).send(ratingData);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating._id).toBe(rating._id.toString());
        expect(res.body.rating.comment).toBe(ratingData.comment);
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeID).toBe(ratingData.traineeID.toString());
    });

    it("Should return a 400 error if the rating is invalid", async () => {
        const { course, rating } = await createCourseWithRatings();
        const ratingData = getRatingData(rating);
        ratingData.rating = 6;

        const res = await request.put(`/courses/${course._id}/ratings/${rating._id}`).send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return a 400 error if the traineeID is invalid", async () => {
        const { course, rating } = await createCourseWithRatings();
        const ratingData = getRatingData(rating);
        ratingData.traineeID = "invalid";

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

    it("Should delete a rating Successfully", async () => {
        const { course, rating } = await createCourseWithRatings();

        const res = await request.delete(`/courses/${course._id}/ratings/${rating._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating._id).toBe(rating._id.toString());
        expect(res.body.rating.comment).toBe(rating.comment);
        expect(res.body.rating.rating).toBe(rating.rating);
        expect(res.body.rating.traineeID).toBe(rating.traineeID.toString());

        expect(await Rating.findById(rating._id)).toBeNull();
        const courseAfterDelete = (await Course.findById(course._id)) as ICourse;
        expect(courseAfterDelete.ratings).not.toContain(rating._id);
    });

    it("Should return a 404 error if the rating is not found", async () => {
        const { course } = await createCourseWithRatings();
        const res = await request.delete(`/courses/${course._id}/ratings/${new mongoose.Types.ObjectId()}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("Should return a 400 error if the ratingId is invalid", async () => {
        const res = await request.delete(`/courses/${new mongoose.Types.ObjectId()}/ratings/invalid`);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});
