import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useContext } from "react";
import styled from "styled-components";
import { CountryContext } from "../context/CountryContext";

const HorizontalLayout = styled.div`
    display: flex;
`;
const PriceFilter: React.FC = () => {
    // const [value, setValue] = React.useState('')
    const { currency } = useContext(CountryContext);
    return (
        <HorizontalLayout>
            <TextField
                label="min "
                id="outlined-start-adornment"
                type="number"
                sx={{ m: 1 }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                }}
            />
            <TextField
                label="max "
                id="outlined-start-adornment"
                type="number"
                sx={{ m: 1 }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                }}
            />
            <Button variant="outlined" color="primary" sx={{ m: 1 }} style={{ width: "5px" }}>
                set
            </Button>
        </HorizontalLayout>
    );
};

export default PriceFilter;
