import Exercise from "../../../models/Exercise";
import { exerciseFactory } from "./factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../connectDBForTesting";

describe("Exercise Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should create a new Exercise", async () => {
        const exercise = new Exercise(exerciseFactory());
        await exercise.save();
        // make sure exercise exists in db.
        const exercises = await Exercise.find({});
        expect(exercises.length).toBe(1);
        // make sure exercise has the same id.
        expect(exercises[0].id).toBe(exercise.id);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, 10000);
});
