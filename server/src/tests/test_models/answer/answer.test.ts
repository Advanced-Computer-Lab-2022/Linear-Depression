import Answer from "../../../models/Answer";
import { TIME_OUT } from "../../../utils/testUtilities";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import { answerFactory } from "./factory";

describe("Answer Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should create a new Answer", async () => {
        const answer = new Answer(answerFactory());
        await answer.save();
        // make sure answer exists in db.
        const answers = await Answer.find({});
        expect(answers.length).toBe(1);
        // make sure answer has the same id.
        expect(answers[0].id).toBe(answer.id);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});
