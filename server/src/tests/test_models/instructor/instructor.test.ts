import Instructor from "../../../models/Instructor";
import { instructorFactory } from "./factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import { TIME_OUT } from "../../../utils/testUtilities";
import Rating from "../../../models/Rating";
import { ratingFactory } from "../rating/factory";

describe("Instructor Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    }, TIME_OUT);

    it("Should create a new Instructor", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();
        // make sure instructor exists in db.
        const instructors = await Instructor.find({});
        expect(instructors.length).toBe(1);
        // make sure instructor has the same id.
        expect(instructors[0].id).toBe(instructor.id);
    });

    it.skip("Should update the average rating of an instructor", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();

        const rating = new Rating(ratingFactory());
        await rating.save();

        instructor.ratings.push(rating.id);
        await instructor.save();

        const updatedInstructor = await Instructor.findById(instructor.id);
        expect(updatedInstructor.averageRating).toBe(rating.rating);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});
