import { Box, Button, Textarea } from "@mui/joy";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { HandleThreadReplyFormSubmit } from "@internals/handlers";

const ReplyForm: React.FC = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { reportId } = useParams<{ reportId: string }>();

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                mt: 3,
                justifySelf: "center",
                alignSelf: "center",
                gap: 2
            }}
        >
            <Textarea
                placeholder="Type a reply..."
                minRows={3}
                sx={{
                    width: "100%",
                    borderRadius: "sm",
                    boxShadow: "0 0 0 0px rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)",
                    alignSelf: "center"
                }}
                variant="soft"
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                loading={loading}
                sx={{
                    width: "20%",
                    alignSelf: "center",
                    justifySelf: "center"
                }}
                variant="soft"
                color="primary"
                onClick={() => HandleThreadReplyFormSubmit(reportId, message, setLoading)}
            >
                <b>Post</b>
            </Button>
        </Box>
    );
};

export default ReplyForm;
