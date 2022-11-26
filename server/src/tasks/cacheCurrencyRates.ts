import { CronJob } from "cron";
import fs from "fs";
import { getCurrencyRate } from "../services/CourseServices";

interface CurrencyRate {
    [key: string]: number;
}
// run every day at 00:00
const getCurrencyRatesTask = new CronJob("0 0 0 * * *", async () => {
    console.log("Cache currency rates");
    const data = fs.readFileSync("src/media/country-currency.json", "utf8");
    const currencies = JSON.parse(data);
    // convert to distinct currency codes
    const currencyCodes = currencies.map((currency: any) => currency.Code) as string[];
    const distinctCurrencyCodes = [...new Set(currencyCodes)] as string[];

    const currencyRates = {} as CurrencyRate;
    for (const currencyCode of distinctCurrencyCodes) {
        try {
            const rate = await getCurrencyRate(currencyCode, "USD");
            console.log(`Currency code: ${currencyCode}, rate: ${rate}`);
            currencyRates[currencyCode] = rate;
        } catch (error) {
            console.log(error);
        }
    }
    fs.writeFileSync("src/media/currency-rates.json", JSON.stringify(currencyRates));
});

export default getCurrencyRatesTask;
