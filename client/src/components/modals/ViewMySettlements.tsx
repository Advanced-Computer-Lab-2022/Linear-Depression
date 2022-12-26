import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useFetchMySettlements } from "@internals/hooks";

const ViewMySettlements: React.FC = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    const { settlements } = useFetchMySettlements();

    return (
        <Dialog open={true} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{"My monthly settlements"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{settlements.data}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewMySettlements;
