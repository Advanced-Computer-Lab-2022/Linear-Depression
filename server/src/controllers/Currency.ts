// set language for the user and save it in cookies

import { Request, Response } from "express";
import StatusCodes from "http-status-codes";

const setCountry = (req: Request, res: Response) => {
    const { country } = req.params;
    res.cookie("country", country);
    res.status(StatusCodes.OK).json({ message: "Language set" });
};

// get language from cookies
const getCountry = (req: Request, res: Response) => {
    const country = req.cookies.country;
    res.status(StatusCodes.OK).json({ language: country });
};

export default {
    setCountry,
    getCountry
};
