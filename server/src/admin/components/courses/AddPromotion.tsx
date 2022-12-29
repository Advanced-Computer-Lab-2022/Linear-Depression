import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    H3,
    Input,
    InputProps,
    InputCSS,
    FormGroup,
    InputGroup,
    Button,
    FormMessage,
    Icon,
    Label
} from "@adminjs/design-system";
import { ActionProps } from "adminjs";

import styled from "styled-components";
import axios from "axios";

import { API_URL } from "../../config";

const InputContainer = styled.div`
    margin: 10px 0;
`;

const FormAction = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const AddPromotion = (props: ActionProps) => {
    const [name, setName] = React.useState<string>("");
    const [discountPercent, setDiscountPercent] = React.useState(0);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const { records } = props;

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (records) {
            const courseIds = records.map((record) => record.id);
            const promotion = {
                name,
                discountPercent,
                startDate,
                endDate,
                courses: courseIds
            };

            axios
                .post(`${API_URL}/promotions`, promotion)
                .then((res) => {
                    console.log("res", res);
                    navigate("/admin/resources/Course");
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };

    return (
        <Box variant="white" width={2 / 3} boxShadow="card" mr="xxl" flexShrink={0}>
            <FormGroup>
                <InputContainer>
                    <Label htmlFor="name">Name</Label>
                    <Input required id="name" width={1} value={name} onChange={(e) => setName(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <Label htmlFor="percentage">Percentage</Label>
                    <Input
                        required
                        type="number"
                        max="100"
                        min="0"
                        id="percentage"
                        width={1}
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                        required
                        type="date"
                        id="startDate"
                        width={1}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                        required
                        type="date"
                        id="endDate"
                        width={1}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </InputContainer>
                <FormAction>
                    <Button type="submit" label="Submit" onClick={handleSubmit} />
                </FormAction>
            </FormGroup>
        </Box>
    );
};

export default AddPromotion;
