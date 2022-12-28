import { Box, Typography } from "@mui/joy";
import moment from "moment";
import React from "react";

import { ThreadCardContainer, Author } from "@internals/components";

interface CardProps {
    authorName: string;
    authorType: string;
    createdAt: string;
    content: string;
    isOwner?: boolean;
    courseId?: string;
}

const Card: React.FC<CardProps> = ({ authorName, authorType, createdAt, content, isOwner, courseId }) => {
    return (
        <ThreadCardContainer>
            <Author
                name={authorName}
                type={authorType}
                date={moment(createdAt).format("MMMM Do, YYYY - hh:mm A")}
                isOwner={isOwner}
                courseId={courseId}
            />

            <Box sx={{ mt: 2 }}>
                <Typography level="h6" sx={{ alignSelf: "flex-start" }}>
                    {content}
                </Typography>
            </Box>
        </ThreadCardContainer>
    );
};

export default Card;
