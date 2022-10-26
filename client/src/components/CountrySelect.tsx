import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import Flag from "react-world-flags";
import { Country } from "../types/Country";

export interface CountrySelectProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    countries: Country[];
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    open,
    onClose,
    selectedValue,
    countries
}: CountrySelectProps) => {
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Please Select Your Country</DialogTitle>
            <DialogContent style={{ height: "600px", width: "600px" }}>
                <List sx={{ pt: 0 }}>
                    {countries.map((country) => (
                        <ListItem button onClick={() => handleListItemClick(country.CountryCode)} key={country.Country}>
                            <Flag
                                code={country.CountryCode}
                                style={{ height: "25px", width: "25px", padding: "5px" }}
                            />

                            <ListItemText primary={country.Country} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default CountrySelect;
