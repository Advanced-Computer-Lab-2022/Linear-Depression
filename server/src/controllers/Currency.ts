// set language for the user and save it in cookies

import { Request, Response } from "express";

const setCountry = (req: Request, res: Response) => {
    console.log(req.params);
    const { country } = req.params;
    res.cookie("country", country);
    res.status(200).json({ message: "Language set" });
};

// get language from cookies
const getCountry = (req: Request, res: Response) => {
    const country = req.cookies.country;
    res.status(200).json({ language: country });
};

export default {
    setCountry,
    getCountry
};
