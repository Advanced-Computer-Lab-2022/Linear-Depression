import Rating from "../../../models/Rating";
import { ratingFactory } from "./factory";
import { TIME_OUT } from "../../../utils/testUtilities";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";

describe("Rating Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should create a new Rating", async () => {
        const rating = new Rating(ratingFactory());
        await rating.save();
        // make sure rating exists in db.
        const ratings = await Rating.find({});
        expect(ratings.length).toBe(1);
        // make sure rating has the same id.
        expect(ratings[0].id).toBe(rating.id);
    });

    it("Should create a new Rating with no comment", async () => {
        const rating = new Rating(ratingFactory());
        rating.comment = undefined;
        await rating.save();
        // make sure rating exists in db.
        const ratings = await Rating.find({});
        expect(ratings.length).toBe(1);
        // make sure rating has the same id.
        expect(ratings[0].id).toBe(rating.id);
    });

    it("Should throw an error when rating is not between 1 and 5", async () => {
        const rating = new Rating(ratingFactory());
        rating.rating = 0;
        await expect(rating.save()).rejects.toThrow();
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});
