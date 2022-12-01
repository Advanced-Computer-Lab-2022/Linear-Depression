import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grow,
    Typography
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setInstructorAcceptedContract } from "@internals/services";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Grow ref={ref} {...props} />;
});

const ViewAndAcceptContract: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const handleAgree = () => {
        setInstructorAcceptedContract(true);
        setOpen(false);
        navigate(-1);
    };

    const handleDisagree = () => {
        setInstructorAcceptedContract(false);
        setOpen(false);
        navigate("/"); // TODO: navigate to profile page
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Instructor Contract Agreement"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    You agree to upload courses that are not offensive, do not contain any illegal content, and do not
                    violate any intellectual property rights. You also agree to not upload any courses that are not your
                    own.
                    <br />
                    You also agree that{" "}
                    <Typography fontWeight={"bold"} display="inline" component={"span"}>
                        40%
                    </Typography>{" "}
                    of the revenue from your courses will be paid to the platform.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDisagree}>Disagree</Button>
                <Button onClick={handleAgree}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewAndAcceptContract;
