import { corporateTraineeFactory, individualTraineeFactory } from "./factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../connectDBForTesting";
import IndividualTrainee from "../../../models/IndividualTrainee";
import CorporateTrainee from "../../../models/CorporateTrainee";

describe("Trainee Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    }, 10000);
    it("Should create a new IndividualTrainee", async () => {
        const individualTrainee = new IndividualTrainee(individualTraineeFactory());
        await individualTrainee.save();
        // make sure individualTrainee exists in db.
        const individualTrainees = await IndividualTrainee.find({});
        expect(individualTrainees.length).toBe(1);
        // make sure individualTrainee has the same id.
        expect(individualTrainees[0].id).toBe(individualTrainee.id);
    });
    it("Should create a new CorporateTrainee", async () => {
        const corporateTrainee = new CorporateTrainee(corporateTraineeFactory());
        await corporateTrainee.save();
        // make sure corporateTrainee exists in db.
        const corporateTrainees = await CorporateTrainee.find({});
        expect(corporateTrainees.length).toBe(1);
        // make sure corporateTrainee has the same id.
        expect(corporateTrainees[0].id).toBe(corporateTrainee.id);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, 10000);
});
