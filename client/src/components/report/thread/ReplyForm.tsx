import { Report, CloseRounded } from "@mui/icons-material";
import { Sheet, Button, Textarea, Alert, IconButton } from "@mui/joy";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import { AddThreadReply } from "@internals/api";
import { validateFormData } from "@internals/utils";

const validationRules = {
    reply: Yup.string().required("Reply is required").max(500, "Reply must be less than 500 characters")
};

const ReplyForm: React.FC = () => {
    const [formErrors, setFormErrors] = useState(new Map());
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const { reportId } = useParams<{ reportId: string }>();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setFormErrors(new Map());
        setShowAlert(false);

        const reply = e.currentTarget.reply.value;

        validateFormData({ reply }, validationRules)
            .then(async (data) => {
                const validatedData = data as unknown as { reply: string };

                await AddThreadReply(reportId, validatedData.reply)
                    .then(() => window.location.reload()) // TODO: use Redux to update state instead
                    .catch(() => setShowAlert(true))
                    .finally(() => setLoading(false));
            })
            .catch((errors) => setFormErrors(errors))
            .finally(() => setLoading(false));
    };

    return (
        <Sheet
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                mt: 3,
                justifySelf: "center",
                alignSelf: "center",
                gap: 2
            }}
            component="form"
            onSubmit={handleFormSubmit}
        >
            <Textarea
                name="reply"
                placeholder="Type a reply..."
                minRows={3}
                sx={{
                    width: "100%",
                    borderRadius: "sm",
                    boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
                    alignSelf: "center"
                }}
                variant="soft"
                error={formErrors.has("reply")}
                onInput={(e) => {
                    setFormErrors(new Map());

                    const target = e.target as HTMLTextAreaElement;
                    target.value = target.value.slice(0, 500);
                }}
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
                type="submit"
            >
                <b>Post</b>
            </Button>

            {showAlert && (
                <Alert
                    size="lg"
                    key="Error"
                    sx={{ mt: 2 }}
                    variant="soft"
                    color="danger"
                    startDecorator={<Report />}
                    endDecorator={
                        <IconButton variant="soft" size="sm" color="danger" onClick={() => setShowAlert(false)}>
                            <CloseRounded />
                        </IconButton>
                    }
                >
                    {formErrors.has("courseId")
                        ? "Invalid course. Please make sure you are reporting a valid course."
                        : "An error occurred while submitting the report. Please try again later."}
                </Alert>
            )}
        </Sheet>
    );
};

export default ReplyForm;
