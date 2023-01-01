import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useToast } from "@internals/hooks";
import { getCourse, useAppDispatch } from "@internals/redux";
import { addPromotion } from "@internals/services";
import { Promotion } from "@internals/types";
import { validateFormData } from "@internals/utils";

const AddPromotion: React.FC<{
    params: {
        courseId: string;
        activePromotion: Promotion;
    };
}> = ({ params }) => {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const { courseId, activePromotion } = params;

    const handleClose = () => {
        closeModal();
    };

    const [name, setName] = useState(activePromotion?.name || "");
    const [discountPercent, setDiscountPercent] = useState(activePromotion?.discountPercent || 0);
    const [startDate, setStartDate] = useState(moment(activePromotion?.startDate).format("YYYY-MM-DD") || new Date());
    const [endDate, setEndDate] = useState(moment(activePromotion?.endDate).format("YYYY-MM-DD") || new Date());
    const [formErrors, setFormErrors] = useState(new Map());
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const { showToast } = useToast();

    const handleSubmit = () => {
        setFormErrors(new Map());
        setLoading(true);

        validateFormData(getFormData(), validationRules)
            .then(async (data: any) => {
                const promotion = { ...data, courses: [courseId] };
                await addPromotion(promotion)
                    .then(() => {
                        dispatch(getCourse(courseId));
                        closeModal();
                        showToast({
                            message: "Promotion added successfully",
                            type: "success"
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        showToast({
                            message: "Failed to add promotion",
                            type: "error"
                        });
                    });
            })
            .catch((errors: any) => {
                setFormErrors(errors);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getFormData = () => {
        return { name, discountPercent, startDate, endDate };
    };

    const validationRules = {
        name: Yup.string().required("Name is required"),
        discountPercent: Yup.number().required("Discount percent is required").min(1).max(100),
        startDate: Yup.date().required("Start date is required"),
        endDate: Yup.date().required("End date is required")
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                {!activePromotion && <DialogContentText>Add Promotion</DialogContentText>}
                {activePromotion && <DialogContentText>Edit Active Promotion</DialogContentText>}
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
                    error={formErrors.has("name")}
                    helperText={formErrors.get("name")}
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
                    error={formErrors.has("discountPercent")}
                    helperText={formErrors.get("discountPercent")}
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
                    error={formErrors.has("startDate")}
                    helperText={formErrors.get("startDate")}
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
                    error={formErrors.has("endDate")}
                    helperText={formErrors.get("endDate")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton loading={loading} onClick={handleSubmit}>
                    Submit
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default AddPromotion;
