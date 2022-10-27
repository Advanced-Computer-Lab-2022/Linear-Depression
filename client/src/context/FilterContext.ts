import { createContext } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

export const FilterContext = createContext<{
    subjectFilter: string;
    setSubjectFilter: Dispatch<SetStateAction<string>>;
    priceFilter: string;
    setPriceFilter: Dispatch<SetStateAction<string>>;
    ratingFilter: number;
    setRatingFilter: Dispatch<SetStateAction<number>>;
}>({
    subjectFilter: "",
    setSubjectFilter: () => {},
    priceFilter: "",
    setPriceFilter: () => {},
    ratingFilter: 0,
    setRatingFilter: () => {}
});
