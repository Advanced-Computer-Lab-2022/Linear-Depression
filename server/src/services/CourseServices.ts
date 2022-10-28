// search for courses by name
import Course from "../models/Course";
import FuzzySearch from "fuzzy-search";
import Instructor from "../models/Instructor";
import fs from "fs";
import axios from "axios";

export const searchCoursesByTitle = async (name: string) => {
    if (name === undefined) {
        return [];
    }
    const courses = await Course.find();
    const searcher = new FuzzySearch(courses, ["title"], {
        caseSensitive: false,
        sort: true // sort by score
    });
    console.log(searcher.search(name));

    return searcher.search(name);
};

export const searchCoursesByInstructor = async (name: string) => {
    if (name === undefined) {
        return [];
    }
    const courses = await Course.find();
    const instructorIds = courses.map((course) => course.instructor);
    const instructors = await Instructor.find({ _id: { $in: instructorIds } });
    const searcher = new FuzzySearch(instructors, ["firstName", "lastName"], {
        caseSensitive: false,
        sort: true // sort by score (best match first)
    });
    const foundInstructors = searcher.search(name);
    const foundInstructorIds = foundInstructors.map((instructor) => instructor._id);
    // filter courses by found instructors
    const filteredCourses = [];
    for (const course of courses) {
        for (const instructorId of foundInstructorIds) {
            if (course.instructor.equals(instructorId)) {
                filteredCourses.push(course);
            }
        }
    }
    return filteredCourses;
};

export const searchCoursesBySubject = async (name: string) => {
    if (name === undefined) {
        return [];
    }
    const courses = await Course.find();
    const searcher = new FuzzySearch(courses, ["subject"], {
        caseSensitive: false,
        sort: true // sort by score
    });
    return searcher.search(name);
};

/**
 * Given a country name, return it's currency code
 *
 * @param countryName
 * @returns currency code
 * @throws Error if country name is not found
 */
export const getCurrencyCode = (countryName: string) => {
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
        if (currency.Country.toLowerCase() === countryName.toLowerCase()) {
            return currency.Code;
        }
    }
    throw new Error("Country not found");
};

export const getCurrencyRate = async (currencyCode: string) => {
    const BASE_CURRENCY = "usd";
    const API_URl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${BASE_CURRENCY}/${currencyCode.toLowerCase()}.json`;

    const response = await axios.get(API_URl);
    return response.data[currencyCode.toLowerCase()];
};
