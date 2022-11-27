import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCourse, useAppDispatch } from "@internals/redux";
import { addPromotion } from "@internals/services";

const AddPromotion: React.FC<{
    params: {
        courseId: string;
    };
}> = ({ params }) => {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const { courseId } = params;

    const handleClose = () => {
        closeModal();
    };

    const [name, setName] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        const promotion = { name, discountPercent, startDate, endDate, courses: [courseId] };
        addPromotion(promotion).then(() => {
            dispatch(getCourse(courseId));
            closeModal();
        });
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogContentText>Add a new Promotion</DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="percentage"
                    label="Percentage"
                    type="number"
                    fullWidth
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value as unknown as number)}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    autoFocus
                    margin="dense"
                    id="startDate"
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value as unknown as Date)}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    autoFocus
                    margin="dense"
                    id="endDate"
                    label="End Date"
                    type="date"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value as unknown as Date)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPromotion;
