import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogContent, DialogContentText, DialogActions, TextField, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";

import { useFetchMyReviewSubmission } from "@internals/hooks";
import { getCourse, useAppDispatch, useAppSelector } from "@internals/redux";
import { addCourseReview, addInstructorReview, updateCourseReview, updateInstructorReview } from "@internals/services";
import { ReviewSubmission } from "@internals/types";
import { validateFormData } from "@internals/utils";

const RatingContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
`;

const SectionContainer = styled.div`
    border: 1px solid #e0e0e0;
    padding: 16px;
    margin: 16px 0;
    border-radius: 10px;
    // shadow
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const AddReview: React.FC = () => {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const handleClose = () => {
        closeModal();
    };

    const courseId = useAppSelector((state) => state.course).data?._id;
    const instructorId = useAppSelector((state) => state.course).data?.instructor._id;
    const dispatch = useAppDispatch();

    const {
        review: formData,
        setReview: setFormData,
        isNewReview
    } = useFetchMyReviewSubmission(courseId, instructorId);
    const [formErrors, setFormErrors] = useState(new Map());
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        setFormErrors(new Map());

        validateFormData(formData, validationRules)
            .then(async (data: any) => {
                const validatedData = data as unknown as ReviewSubmission;
                try {
                    await addCourseReview(courseId, validatedData.courseRating, validatedData.courseComment);
                    await addInstructorReview(
                        instructorId,
                        validatedData.instructorRating,
                        validatedData.instructorComment
                    );
                    dispatch(getCourse(courseId));
                } catch (error) {
                    console.log(error);
                } finally {
                    closeModal();
                    setLoading(false);
                }
            })
            .catch((errors: React.SetStateAction<Map<any, any>>) => {
                setFormErrors(errors);
                setLoading(false);
            });
    };
    const handleUpdate = () => {
        setFormErrors(new Map());
        setLoading(true);

        validateFormData(formData, validationRules)
            .then(async (data: any) => {
                const validatedData = data as unknown as ReviewSubmission;
                try {
                    await updateCourseReview(courseId, validatedData.courseRating, validatedData.courseComment);
                    await updateInstructorReview(
                        instructorId,
                        validatedData.instructorRating,
                        validatedData.instructorComment
                    );
                    dispatch(getCourse(courseId));
                } catch (error) {
                    console.log(error);
                } finally {
                    closeModal();
                    setLoading(false);
                }
            })
            .catch((errors: React.SetStateAction<Map<any, any>>) => {
                setFormErrors(errors);
                setLoading(false);
            });
    };

    const handleCourseReviewChange = (_event: React.SyntheticEvent<{}>, newValue: number | null) => {
        setFormData({ ...formData, courseRating: newValue });
    };

    const handleInstructorReviewChange = (_event: React.SyntheticEvent<{}>, newValue: number | null) => {
        setFormData({ ...formData, instructorRating: newValue });
    };

    const validationRules = {
        courseComment: Yup.string(),
        courseRating: Yup.number().min(1, "Please rate the course"),
        instructorComment: Yup.string(),
        instructorRating: Yup.number().min(1, "Please rate the instructor")
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                {isNewReview ? (
                    <DialogContentText>Add a review</DialogContentText>
                ) : (
                    <DialogContentText>Update your review</DialogContentText>
                )}
                <SectionContainer>
                    <Typography component="legend">Course Review</Typography>
                    <RatingContainer>
                        <Rating
                            name="size-large"
                            size="large"
                            value={formData.courseRating}
                            onChange={handleCourseReviewChange}
                            sx={
                                formErrors.has("courseRating") && {
                                    "& .MuiRating-iconEmpty": {
                                        color: formData.courseRating === 0 && "#f44336"
                                    }
                                }
                            }
                        />
                        {formErrors.has("courseRating") && formData.courseRating === 0 && (
                            <Typography variant="caption" color="error">
                                {formErrors.get("courseRating")}
                            </Typography>
                        )}
                    </RatingContainer>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="course-comment"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        minRows={3}
                        maxRows={5}
                        value={formData.courseComment}
                        onChange={(e) => setFormData({ ...formData, courseComment: e.target.value })}
                        error={formErrors.has("courseComment")}
                        helperText={formErrors.get("courseComment")}
                    />
                </SectionContainer>
                <SectionContainer>
                    <Typography component="legend">Instructor Review</Typography>
                    <RatingContainer>
                        <Rating
                            name="size-large"
                            size="large"
                            value={formData.instructorRating}
                            onChange={handleInstructorReviewChange}
                            sx={
                                formErrors.has("instructorRating") && {
                                    "& .MuiRating-iconEmpty": {
                                        color: formData.instructorRating === 0 && "#f44336"
                                    }
                                }
                            }
                        />
                        {formErrors.has("instructorRating") && formData.instructorRating === 0 && (
                            <Typography variant="caption" color="error">
                                {formErrors.get("instructorRating")}
                            </Typography>
                        )}
                    </RatingContainer>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="instructor-comment"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        minRows={3}
                        maxRows={5}
                        value={formData.instructorComment}
                        onChange={(e) => setFormData({ ...formData, instructorComment: e.target.value })}
                        error={formErrors.has("instructorComment")}
                        helperText={formErrors.get("instructorComment")}
                    />
                </SectionContainer>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>

                {isNewReview ? (
                    <LoadingButton loading={loading} onClick={handleCreate}>
                        Add
                    </LoadingButton>
                ) : (
                    <LoadingButton loading={loading} onClick={handleUpdate}>
                        Update
                    </LoadingButton>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AddReview;
