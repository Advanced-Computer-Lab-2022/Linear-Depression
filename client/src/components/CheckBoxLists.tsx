import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const CheckboxItem = styled(Checkbox)`
    color: red;
`;

const CheckBoxLists: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
    const [checked, setChecked] = React.useState(-1);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleToggle = (value: string, index: number) => () => {
        if (title == "Price") {
            searchParams.delete("isFree");
        } else {
            searchParams.delete(title.toLowerCase());
        }
        if (checked == index) {
            setChecked(-1);
        } else {
            setChecked(index);
            if (title == "Price" && value == "Free") {
                searchParams.append("isFree", "true");
            } else if (title == "Price" && value == "Paid") {
                searchParams.append("isFree", "false");
            } else {
                searchParams.append(title.toLowerCase(), value);
            }
        }
        setSearchParams(searchParams);
    };

    return (
        <List>
            {items.map((value, index) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(value, index)} dense>
                            <ListItemIcon>
                                <CheckboxItem
                                    edge="start"
                                    checked={checked === index}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default CheckBoxLists;
