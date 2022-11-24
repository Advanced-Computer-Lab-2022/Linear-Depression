import Lesson from "../../../models/Lesson";
import { lessonFactory } from "./factory";
import { TIME_OUT } from "../../../utils/testUtilities";
import { connectDBForTesting, disconnectDBForTesting } from "../../../utils/testUtilities";

describe("Lesson Model Test", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    it("Should create a new Lesson", async () => {
        const lesson = new Lesson(lessonFactory());
        await lesson.save();
        // make sure lesson exists in db.
        const lessons = await Lesson.find({});
        expect(lessons.length).toBe(1);
        // make sure lesson has the same id.
        expect(lessons[0].id).toBe(lesson.id);
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    }, TIME_OUT);
});
