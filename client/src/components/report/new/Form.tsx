import { FormLabel, Select, Option, TextField, Textarea, Button, Sheet } from "@mui/joy";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HandleReportFormSubmit } from "@internals/handlers";
import { ReportType } from "@internals/types";

const reportTypes = Object.values(ReportType);

const Form: React.FC = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    return (
        <Sheet
            sx={{
                width: "auto",
                px: 4,
                py: 3,
                display: "flex",
                flexDirection: "column",
                borderRadius: "sm",
                boxShadow: "0 0 0 0px rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)"
            }}
        >
            <FormLabel htmlFor="select" id="select-label" required>
                Issue Type
            </FormLabel>
            <Select
                placeholder="Choose one…"
                size="lg"
                variant="soft"
                slotProps={{
                    button: {
                        id: "select",
                        "aria-labelledby": "select-label"
                    }
                }}
                onChange={(_e, value) => setSelectedType(value as ReportType)}
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
                placeholder="Subject"
                size="lg"
                variant="soft"
                slotProps={{
                    input: {
                        id: "subject",
                        "aria-labelledby": "subject-label"
                    }
                }}
                required
                onChange={(e) => setSubject(e.target.value)}
            />

            <FormLabel htmlFor="textarea" id="textarea-label" sx={{ mt: 2 }} required>
                Describtion
            </FormLabel>
            <Textarea
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
                required
                onChange={(e) => setDescription(e.target.value)}
            />

            <Button
                sx={{ mt: 3, width: "30%", alignSelf: "center" }}
                loading={loading}
                onClick={() =>
                    HandleReportFormSubmit({ type: selectedType, subject, description }, setLoading, navigate)
                }
            >
                Submit
            </Button>
        </Sheet>
    );
};

export default Form;
