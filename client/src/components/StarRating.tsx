import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "./StarRating.css";
import { CoursesContext } from "../context/CoursesContext";
import { useContext } from "react";
import axios from "axios";

const StarRating: React.FC = () => {
    const { coursesResultSet, setCoursesResultSet } = useContext(CoursesContext);
    const [value, setValue] = React.useState<number | null>(2);

    useEffect(() => {
        axios.get(`http://localhost:8080/courses?averageRating[lt]=${value}`).then((res) => {
            setCoursesResultSet(res.data.courses);
        });
    }, [value]);

    return (
        <Box
            sx={{
                "& > legend": { mt: 2 }
            }}
        >
            <Rating
                className="rating"
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    );
};

export default StarRating;
