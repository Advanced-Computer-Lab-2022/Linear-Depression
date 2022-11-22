import { config } from "../config/config";
import { StatusCodes } from "http-status-codes";
import axios from "axios";
import getCurrency from "../services/getCurrency";
import { useState } from "react";

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

const fetchCountryCode = (): Promise<string> => {
    const COUNTRY_URL = `${config.API_URL}/country`;
    return new Promise((resolve, reject) => {
        axios
            .get(COUNTRY_URL, { withCredentials: true })
            .then((res) => {
                if (res.status === StatusCodes.OK) {
                    resolve(res.data.language);
                } else {
                    resolve("");
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default useGetLocalizationData;
