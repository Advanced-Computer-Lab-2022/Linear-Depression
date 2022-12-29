import WalletIcon from "@mui/icons-material/Wallet";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAppSelector } from "@internals/redux";

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Amount = styled.div`
    margin-top: 20px;
    font-size: 30px;
`;

const ViewMyWallet: React.FC = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };
    const profile = useAppSelector((state) => state.profile);
    return (
        <Dialog open={true} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{"My Wallet"}</DialogTitle>
            <DialogContent
                style={{
                    height: "150px",
                    width: "250px",
                    margin: "25px"
                }}
            >
                <Center>
                    <div>
                        <Center>
                            <div>
                                <WalletIcon sx={{ fontSize: 50 }} />
                            </div>
                        </Center>

                        <Amount>{`${profile.data.individualTrainee.wallet} USD`}</Amount>
                    </div>
                </Center>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewMyWallet;
