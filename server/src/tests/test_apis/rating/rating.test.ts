import Rating from "../../../models/Rating";
import mongoose from "mongoose";
import { ratingFactory } from "../../test_models/rating/factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";
import { TIME_OUT } from "../../../utils/testUtilities";
import supertest from "supertest";
import app from "../../../server";
import { individualTraineeFactory } from "../../test_models/trainee/factory";
import IndividualTrainee from "../../../models/IndividualTrainee";

const request = supertest(app);

describe("GET /ratings/", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });
    it("should return an empty array when the db is empty", async () => {
        const response = await request.get("/ratings");
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.ratings).toEqual([]);
    });

    it("Should skip ratings having no comments", async () => {
        const randomLength = faker.datatype.number({ min: 2, max: 10 });
        const ratings = [];
        for (let i = 0; i < randomLength; i++) {
            const ratingData = ratingFactory();
            ratingData.comment = undefined;
            const rating = new Rating(ratingData);
            await rating.save();
            ratings.push(rating);
        }

        const res = await request.get("/ratings");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.ratings.length).toBe(0);
    });

    it("Should return all ratings correctly with comments", async () => {
        const randomLength = faker.datatype.number({ min: 2, max: 10 });
        const ratings = [];
        for (let i = 0; i < randomLength; i++) {
            const rating = new Rating(ratingFactory());
            await rating.save();
            ratings.push(rating);
        }

        const res = await request.get("/ratings");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.ratings.length).toBe(ratings.length);
    });

    it("Should return all ratings correctly with comments and skip ratings having no comments", async () => {
        const randomLength = faker.datatype.number({ min: 2, max: 10 });
        const ratings = [];
        for (let i = 0; i < randomLength; i++) {
            const rating = new Rating(ratingFactory());
            await rating.save();
            ratings.push(rating);
        }

        const ratingData = ratingFactory();
        ratingData.comment = undefined;
        const rating = new Rating(ratingData);
        await rating.save();
        ratings.push(rating);

        const res = await request.get("/ratings");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.ratings.length).toBe(randomLength);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});

describe("GET /ratings/:ratingId", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it("Should return a rating with the given id", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();

        const res = await request.get(`/ratings/${rating._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating._id).toBe(rating._id.toString());
    });

    it("Should return a 404 error if the rating does not exist", async () => {
        const res = await request.get(`/ratings/${new mongoose.Types.ObjectId()}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("Should return a 400 error if the rating id is invalid", async () => {
        const res = await request.get(`/ratings/invalidId`);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

describe("POST /ratings/", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it("Should create a new rating Successfully", async () => {
        const traineeData = individualTraineeFactory();
        const trainee = new IndividualTrainee(traineeData);
        await trainee.save();
        const ratingData = ratingFactory();
        ratingData.traineeID = trainee._id;
        const res = await request.post("/ratings").send(ratingData);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBe(ratingData.comment);
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeID).toBe(ratingData.traineeID.toString());
    });

    it("Should return a 400 error if the rating is invalid", async () => {
        const ratingData = ratingFactory();
        ratingData.rating = 6;
        const res = await request.post("/ratings").send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return a 400 error if the traineeID is invalid", async () => {
        const ratingData = ratingFactory();
        ratingData.traineeID = "invalidId";
        const res = await request.post("/ratings").send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return a 400 error if the traineeID is not found", async () => {
        const ratingData = ratingFactory();
        ratingData.traineeID = new mongoose.Types.ObjectId();
        const res = await request.post("/ratings").send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return a 200 ok if no comment is provided", async () => {
        const traineeData = individualTraineeFactory();
        const trainee = new IndividualTrainee(traineeData);
        await trainee.save();
        const ratingData = ratingFactory();
        ratingData.traineeID = trainee._id;
        ratingData.comment = undefined;
        const res = await request.post("/ratings").send(ratingData);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.rating._id).toBeDefined();
        expect(res.body.rating.comment).toBeUndefined();
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeID).toBe(ratingData.traineeID.toString());
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

describe("PUT /ratings/:ratingId", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it("Should update a rating Successfully", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();
        const ratingData = ratingFactory();
        const res = await request.put(`/ratings/${rating._id}`).send(ratingData);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating._id).toBe(rating._id.toString());
        expect(res.body.rating.comment).toBe(ratingData.comment);
        expect(res.body.rating.rating).toBe(ratingData.rating);
        expect(res.body.rating.traineeID).toBe(ratingData.traineeID.toString());
    });

    it("Should return a 400 error if the rating is invalid", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();
        const ratingData = ratingFactory();
        ratingData.rating = 6;
        const res = await request.put(`/ratings/${rating._id}`).send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("Should return a 400 error if the traineeID is invalid", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();
        const ratingData = ratingFactory();
        ratingData.traineeID = "invalidId";
        const res = await request.put(`/ratings/${rating._id}`).send(ratingData);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});

describe("DELETE /ratings/:ratingId", () => {
    beforeEach(async () => {
        await connectDBForTesting();
    });

    it("Should delete a rating Successfully", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();

        const res = await request.delete(`/ratings/${rating._id}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.rating._id).toBe(rating._id.toString());
        expect(res.body.rating.comment).toBe(rating.comment);
        expect(res.body.rating.rating).toBe(rating.rating);
        expect(res.body.rating.traineeID).toBe(rating.traineeID.toString());

        const deletedRating = await Rating.findById(rating._id);
        expect(deletedRating).toBeNull();
    });

    it("Should return a 404 error if the rating is not found", async () => {
        const res = await request.delete(`/ratings/${new mongoose.Types.ObjectId()}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("Should return a 400 error if the ratingId is invalid", async () => {
        const res = await request.delete(`/ratings/invalidId`);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    afterEach(async () => {
        await disconnectDBForTesting();
    });
});
