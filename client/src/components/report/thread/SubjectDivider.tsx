import { ListDivider, Typography } from "@mui/joy";
import React from "react";

interface SubjectDividerProps {
    repliesCount: number;
}

const SubjectDivider: React.FC<SubjectDividerProps> = ({ repliesCount }) => {
    return (
        <ListDivider inset="gutter" sx={{ mt: 0, mb: 2 }}>
            <Typography level="body1" sx={{ alignSelf: "center" }} color="neutral">
                <b>
                    {repliesCount} {repliesCount > 1 || repliesCount === 0 ? "replies" : "reply"}
                </b>
            </Typography>
        </ListDivider>
    );
};

export default SubjectDivider;
