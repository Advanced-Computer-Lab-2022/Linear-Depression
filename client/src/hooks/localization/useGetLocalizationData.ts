import { useState } from "react";

import { getCurrency } from "@internals/services";
import { fetchCountryCode } from "@internals/services";

const useGetLocalizationData = () => {
    const [country, setCountry] = useState("US");
    const [currency, setCurrency] = useState("USD");

    fetchCountryCode()
        .then((countryCode) => {
            const countryCurrency = getCurrency(countryCode);
            setCountry(countryCode);
            setCurrency(countryCurrency);
        })
        .catch((err) => {
            console.log(err);
        });
    return { country, setCountry, currency, setCurrency };
};

export default useGetLocalizationData;
