import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import styled from "styled-components";

const RatingContainer = styled(Rating)`
    float: left;
    margin-top: 10px;
    margin-left: 10px;
`;

const StarRating: React.FC = () => {
    const [value, setValue] = useState<number | null>(2);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (_event: React.SyntheticEvent<{}>, newValue: number | null) => {
        setValue(newValue);
        if (newValue) {
            setSearchParams({ "averageRating[lte]": newValue.toString() });
        } else {
            searchParams.delete("averageRating[lte]");
            setSearchParams(searchParams);
        }
    };

    return (
        <Box
            sx={{
                "& > legend": { mt: 2 }
            }}
        >
            <RatingContainer name="simple-controlled" value={value} onChange={handleChange} />
        </Box>
    );
};

export default StarRating;
