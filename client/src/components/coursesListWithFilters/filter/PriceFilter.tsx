import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { CountryContext } from "@internals/contexts";

const HorizontalLayout = styled.div`
    display: flex;
`;

const PriceFilter: React.FC = () => {
    const [minValue, setMinValue] = React.useState("");
    const [maxValue, setMaxValue] = React.useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClick = () => {
        searchParams.delete("price[gte]");
        searchParams.delete("price[lte]");
        if (minValue !== "") {
            searchParams.append("price[gte]", minValue);
        }
        if (maxValue !== "") {
            searchParams.append("price[lte]", maxValue);
        }
        setSearchParams(searchParams);
    };

    const { currency } = useContext(CountryContext);
    return (
        <HorizontalLayout>
            <TextField
                style={{ width: "45%", margin: "2px", marginTop: "4px" }}
                label="min "
                id="outlined-start-adornment"
                type="number"
                InputProps={{
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                }}
                onChange={(e) => setMinValue(e.target.value)}
            />
            <TextField
                style={{ width: "45%", margin: "2px", marginTop: "4px" }}
                label="max "
                id="outlined-start-adornment"
                type="number"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" style={{ fontSize: "0.5em" }}>
                            {currency}
                        </InputAdornment>
                    )
                }}
                onChange={(e) => setMaxValue(e.target.value)}
            />
            <Button variant="outlined" size="small" style={{ margin: "2px", marginTop: "4px" }} onClick={handleClick}>
                set
            </Button>
        </HorizontalLayout>
    );
};

export default PriceFilter;
