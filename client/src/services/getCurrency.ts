import countries from "../media/country-currency.json";
import { Country } from "../types/Country";

const getCurrency = (country: string) => {
    const currency = countries.find((item: Country) => item.CountryCode === country);
    return currency ? currency.Code : "USD";
};

export default getCurrency;
