import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useFetchSubjects } from "@internals/hooks";
import { useAppSelector } from "../../../store";
const CheckboxItem = styled(Checkbox)`
    color: red;
`;

const SubjectsFilter: React.FC = () => {
    const [checked, setChecked] = useState(-1);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useAppSelector((state) => state.subjects);
    useFetchSubjects();

    const handleToggle = (value: string, index: number) => () => {
        searchParams.delete("subject");
        if (checked === index) {
            setChecked(-1);
        } else {
            setChecked(index);
            searchParams.append("subject", value);
        }
        setSearchParams(searchParams);
    };

    return (
        <>
            {data != null && (
                <List>
                    {data.map((subject, index) => {
                        const labelId = `checkbox-list-label-${subject}`;

                        return (
                            <ListItem
                                key={subject}
                                secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(subject, index)} dense>
                                    <ListItemIcon>
                                        <CheckboxItem
                                            edge="start"
                                            checked={checked === index}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ "aria-labelledby": labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${subject}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </>
    );
};

export default SubjectsFilter;
