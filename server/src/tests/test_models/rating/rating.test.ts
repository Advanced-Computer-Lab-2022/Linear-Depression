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

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});
