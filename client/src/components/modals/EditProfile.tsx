import { Dialog, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@internals/hooks";
import { getProfile, useAppDispatch } from "@internals/redux";
import { editProfile } from "@internals/services";

const EditProfile: React.FC<{
    params: {
        instructorFirstName: string;
        instructorLastName: string;
        instructorEmail: string;
        instructorBiography: string;
    };
}> = ({ params }) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const closeModal = () => {
        navigate(-1);
    };

    const handleClose = () => {
        closeModal();
    };

    const { auth } = useAuth();

    const { instructorFirstName, instructorLastName, instructorEmail, instructorBiography } = params;

    const [firstName, setFirstName] = useState(instructorFirstName);
    const [lastName, setLastName] = useState(instructorLastName);
    const [email, setEmail] = useState(instructorEmail);
    const [biography, setBiography] = useState(instructorBiography);

    const handleSubmit = () => {
        const profile = {
            firstName,
            lastName,
            email,
            biography
        };

        editProfile(profile)
            .then(() => {
                dispatch(getProfile(auth.accessToken));
                closeModal();
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogContentText>Edit Profile</DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="biography"
                    label="Biography"
                    type="text"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={6}
                    variant="outlined"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfile;
