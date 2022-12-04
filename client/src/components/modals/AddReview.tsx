import { Dialog, DialogContent, DialogContentText, DialogActions, TextField, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getCourse, useAppDispatch, useAppSelector } from "@internals/redux";
import { addCourseReview, addInstructorReview } from "@internals/services";

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

    const [courseComment, setCourseComment] = useState("");
    const [courseRating, setCourseRating] = useState(0);
    const [instructorComment, setInstructorComment] = useState("");
    const [instructorRating, setInstructorRating] = useState(0);

    const handleSubmit = async () => {
        try {
            await addCourseReview(courseId, courseRating, courseComment);
            dispatch(getCourse(courseId));
            await addInstructorReview(instructorId, instructorRating, instructorComment);
            closeModal();
        } catch (err) {
            alert(err);
        }
    };

    const handleCourseReviewChange = (_event: React.SyntheticEvent<{}>, newValue: number | null) => {
        setCourseRating(newValue);
    };

    const handleInstructorReviewChange = (_event: React.SyntheticEvent<{}>, newValue: number | null) => {
        setInstructorRating(newValue);
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogContentText>Add a review</DialogContentText>
                <SectionContainer>
                    <Typography component="legend">Course Review</Typography>
                    <RatingContainer>
                        <Rating
                            name="size-large"
                            size="large"
                            value={courseRating}
                            onChange={handleCourseReviewChange}
                        />
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
                        value={courseComment}
                        onChange={(e) => setCourseComment(e.target.value)}
                    />
                </SectionContainer>
                <SectionContainer>
                    <Typography component="legend">Instructor Review</Typography>
                    <RatingContainer>
                        <Rating
                            name="size-large"
                            size="large"
                            value={instructorRating}
                            onChange={handleInstructorReviewChange}
                        />
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
                        value={instructorComment}
                        onChange={(e) => setInstructorComment(e.target.value)}
                    />
                </SectionContainer>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddReview;
