import { Report, CloseRounded } from "@mui/icons-material";
import {
    FormLabel,
    Select,
    Option,
    TextField,
    Textarea,
    Button,
    Sheet,
    Divider,
    Chip,
    Alert,
    IconButton
} from "@mui/joy";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";

import { AddReport } from "@internals/api";
import { HorizontalCourseCard } from "@internals/components";
import { ReportType, ReportFormProps } from "@internals/types";
import { validateFormData } from "@internals/utils";

const reportTypes = Object.values(ReportType);

const validationRules = {
    type: Yup.string().required("Report type is required").oneOf(reportTypes),
    subject: Yup.string().required("Subject is required").max(45, "Subject must be less than 45 characters"),
    description: Yup.string()
        .required("Description is required")
        .max(500, "Description must be less than 500 characters")
};

const Form: React.FC = () => {
    const [formErrors, setFormErrors] = useState(new Map());
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setFormErrors(new Map());
        setShowAlert(false);

        const formData = getFormData(e) as unknown as ReportFormProps;
        formData.courseId = searchParams.get("course_id") as string;

        validateFormData(formData, validationRules)
            .then(async (data) => {
                const validatedData = data as unknown as ReportFormProps;

                await AddReport(validatedData)
                    .then(() => navigate("/me/reports"))
                    .catch((err) => {
                        if (err.response?.status === StatusCodes.BAD_REQUEST) {
                            setFormErrors(new Map([["courseId", true]]));
                        }

                        setShowAlert(true);
                    })
                    .finally(() => setLoading(false));
            })
            .catch((errors) => setFormErrors(errors))
            .finally(() => setLoading(false));
    };

    const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
        return Object.fromEntries(new FormData(event.currentTarget).entries());
    };

    return (
        <Sheet
            sx={{
                width: "auto",
                px: 4,
                py: 3,
                display: "flex",
                flexDirection: "column",
                borderRadius: "sm",
                boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)"
            }}
        >
            <HorizontalCourseCard />

            <Divider sx={{ my: 1 }}>
                <Chip variant="soft" color="neutral">
                    Report Form
                </Chip>
            </Divider>

            <Sheet
                component="form"
                onSubmit={(e) => {
                    handleFormSubmit(e);
                }}
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <FormLabel htmlFor="select" id="select-label" required>
                    Report Type
                </FormLabel>
                <Select
                    name="type"
                    defaultValue={reportTypes[0]}
                    size="lg"
                    variant="soft"
                    slotProps={{
                        button: {
                            id: "select",
                            "aria-labelledby": "select-label"
                        }
                    }}
                    sx={{ width: "100%" }}
                >
                    {reportTypes.map((type) => (
                        <Option key={reportTypes.indexOf(type)} value={type}>
                            {type}
                        </Option>
                    ))}
                </Select>

                <FormLabel htmlFor="subject" id="subject-label" sx={{ mt: 2 }} required>
                    Subject
                </FormLabel>
                <TextField
                    name="subject"
                    placeholder="Subject"
                    size="lg"
                    variant="soft"
                    slotProps={{
                        input: {
                            id: "subject",
                            "aria-labelledby": "subject-label"
                        }
                    }}
                    sx={{ width: "100%" }}
                    onInput={(e) => {
                        formErrors.delete("subject");
                        setFormErrors(new Map(formErrors));

                        const target = e.target as HTMLInputElement;
                        target.value = target.value.slice(0, 45);
                    }}
                    error={formErrors.has("subject")}
                />

                <FormLabel htmlFor="textarea" id="textarea-label" sx={{ mt: 2 }} required>
                    Description
                </FormLabel>
                <Textarea
                    name="description"
                    minRows={5}
                    placeholder="Describe the issue you are facing"
                    size="lg"
                    variant="soft"
                    slotProps={{
                        textarea: {
                            id: "textarea",
                            "aria-labelledby": "textarea-label"
                        }
                    }}
                    sx={{ width: "100%" }}
                    onInput={(e) => {
                        formErrors.delete("description");
                        setFormErrors(new Map(formErrors));

                        const target = e.target as HTMLInputElement;
                        target.value = target.value.slice(0, 500);
                    }}
                    error={formErrors.has("description")}
                />

                <Button
                    sx={{ mt: 3, width: "30%", alignSelf: "center", justifySelf: "center" }}
                    loading={loading}
                    type="submit"
                >
                    Submit
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
        </Sheet>
    );
};

export default Form;
