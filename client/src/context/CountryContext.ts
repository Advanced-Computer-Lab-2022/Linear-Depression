import { createContext } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

export const CountryContext = createContext({ country: "us", setCountry: {} as Dispatch<SetStateAction<string>> });
