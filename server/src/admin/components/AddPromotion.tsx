import React from "react";
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

const AddPromotion = (props: ActionProps) => {
    const [name, setName] = React.useState<string>("helloo");
    const [discountPercent, setDiscountPercent] = React.useState(0);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const { records } = props;
    console.log("records", records);

    return (
        <Box variant="white" width={2 / 3} boxShadow="card" mr="xxl" flexShrink={0}>
            <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input required id="name" width={1 / 2} value={name} onChange={(e) => setName(e.target.value)} />
                <Label htmlFor="percentage">Percentage</Label>
                <Input
                    required
                    type="number"
                    max="100"
                    min="0"
                    id="percentage"
                    width={1 / 2}
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                />
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                    required
                    type="date"
                    id="startDate"
                    width={1 / 2}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Label htmlFor="endDate">End Date</Label>
                <Input
                    required
                    type="date"
                    id="endDate"
                    width={1 / 2}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </FormGroup>
        </Box>
    );
};

export default AddPromotion;
