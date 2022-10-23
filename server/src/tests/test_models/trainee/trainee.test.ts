import { corporateTraineeFactory, individualTraineeFactory } from "./factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";
import IndividualTrainee from "../../../models/IndividualTrainee";
import CorporateTrainee from "../../../models/CorporateTrainee";
import { TIME_OUT } from "../../../utils/testUtilities";

describe("Trainee Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    }, TIME_OUT);
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
        console.log(corporateTrainees[0]);
        expect(corporateTrainees.length).toBe(1);
        // make sure corporateTrainee has the same id.
        expect(corporateTrainees[0].id).toBe(corporateTrainee.id);
        //make sure status compatible with expiredAt
        if (corporateTrainees[0].expiredAt < new Date()) {
            expect(corporateTrainee.status).toBe("EXPIRED");
        } else {
            expect(corporateTrainee.status).toBe("ACTIVE");
        }
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});
