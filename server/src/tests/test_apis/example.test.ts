// This in example of how to write test for your API

import { disconnectDBForTesting, connectDBForTesting } from "../../utils/testUtilities";

import supertest from "supertest";
import app from "../../server";
const request = supertest(app);

describe("Example API", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    afterAll(async () => {
        await disconnectDBForTesting();
    });

    describe("GET /api/example", () => {
        it("should return 200 OK", async () => {
            const response = await request.get("/test");
            expect(response.status).toBe(200);
        });
    });
});
