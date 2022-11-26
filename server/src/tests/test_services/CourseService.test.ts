import { getCurrencyCode, getCurrencyRate } from "../../services/CourseServices";
import { connectDBForTesting, disconnectDBForTesting } from "../../utils/testUtilities";

import axios from "axios";
jest.mock("axios");

describe("CourseServices", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    });

    describe("Test getCurrencyCode", () => {
        it("should return the currency code for a valid country", async () => {
            const currencyCode = await getCurrencyCode("Eg");
            expect(currencyCode).toBe("EGP");
        });

        it("should return the currency code for a valid country", async () => {
            const currencyCode = await getCurrencyCode("us");
            expect(currencyCode).toBe("USD");
        });

        it("should return the currency code for a valid country", async () => {
            const currencyCode = await getCurrencyCode("GB");
            expect(currencyCode).toBe("GBP");
        });

        it("should return the currency code for a valid country with different case", async () => {
            const currencyCode = await getCurrencyCode("eg");
            expect(currencyCode).toBe("EGP");
        });
    });

    describe("Test mocked getCurrencyRate", () => {
        it("should return the currency rate for a valid currency code", async () => {
            axios.get = jest.fn().mockResolvedValue({
                data: {
                    date: "2021-04-01",
                    egp: 15.7
                }
            });
            const currencyRate = await getCurrencyRate("EGP", "usd");
            expect(currencyRate).toBe(15.7);
        });
    });

    describe("Test getCurrencyRate", () => {
        it("should return the currency rate for a valid currency code", async () => {
            const axios = require("axios");
            const currencyRate = await getCurrencyRate("EGP", "usd");
            expect(currencyRate).toBeGreaterThan(10); // don't worry this will be true everyday, if not f*** test. :D
        });
    });
});
