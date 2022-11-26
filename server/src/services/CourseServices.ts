// search for courses by name
import fs from "fs";
import axios from "axios";

/**
 * Given a country name, return it's currency code
 *
 * @param countryName
 * @returns currency code
 * @throws Error if country name is not found
 */
export const getCurrencyCode = (countryName: string): string => {
    /**
     * [
     *    {
     *       "country": "Afghanistan",
     *        "currency": "Afghan afghani",
     *        "code": "AFN",
     *    }
     * ]
     */

    const data = fs.readFileSync("src/media/country-currency.json", "utf8");
    const currencies = JSON.parse(data);
    for (const currency of currencies) {
        if (currency.CountryCode.toLowerCase() === countryName.toLowerCase()) {
            return currency.Code;
        }
    }
    // throw new Error("Country not found");
    // instead of throwing an error, return USD as default
    return "US";
};

export const getCurrencyRate = async (currencyCode: string, baseCurrency: string): Promise<number> => {
    const API_URl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency.toLowerCase()}/${currencyCode.toLowerCase()}.json`;

    const response = await axios.get(API_URl);
    return response.data[currencyCode.toLowerCase()];
};

export const getCurrencyRateFromCache = async (currencyCode: string, baseCurrency: string): Promise<number> => {
    const data = fs.readFileSync("src/media/currency-rates.json", "utf8");
    const currencyRates = JSON.parse(data);
    if (currencyRates[currencyCode]) {
        return currencyRates[currencyCode];
    } else {
        return await getCurrencyRate(currencyCode, baseCurrency);
    }
};
