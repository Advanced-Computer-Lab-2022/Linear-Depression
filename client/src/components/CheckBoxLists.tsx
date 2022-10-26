import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import "./CheckBoxLists.css";

const CheckBoxLists: React.FC<{ items: string[] }> = ({ items }) => {
    const [checked, setChecked] = React.useState(-1);

    const handleToggle = (value: number) => () => {
        if (checked == value) {
            setChecked(-1);
        } else {
            setChecked(value);
        }
    };

    return (
        <List className="list">
            {items.map((value, index) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                            <ListItemIcon>
                                <Checkbox
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
