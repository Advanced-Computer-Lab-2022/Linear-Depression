import jest from "jest";

import Instructor from "../../../models/Instructor";
import { instructorFactory } from "./factory";
import { connectDBForTesting, disconnectDBForTesting } from "../../connectDBForTesting";

describe("Instructor Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should create a new Instructor", async () => {
        const instructor = new Instructor(instructorFactory());
        await instructor.save();
        // make sure instructor exists in db.
        const instructors = await Instructor.find({});
        expect(instructors.length).toBe(1);
        // make sure instructor has the same id.
        expect(instructors[0].id).toBe(instructor.id);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, 10000);
});
