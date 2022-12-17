import { FormLabel, Select, Option, TextField, Textarea, Button } from "@mui/joy";
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
        <>
            <FormLabel htmlFor="select" id="select-label" sx={{ mt: 2 }} required>
                Issue Type
            </FormLabel>
            <Select
                placeholder="Choose one…"
                size="lg"
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
        </>
    );
};

export default Form;
