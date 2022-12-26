import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    Typography
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useFetchMySettlements } from "@internals/hooks";

const MonthSettlement = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    height: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    padding-bottom: 0;
    background-color: lightgray;
`;

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const ViewMySettlements: React.FC = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    const { settlements } = useFetchMySettlements();

    return (
        <Dialog open={true} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{"My monthly settlements"}</DialogTitle>
            <DialogContent
                style={{
                    height: "500px",
                    width: "600px"
                }}
            >
                {settlements.data ? (
                    <List style={{ maxHeight: "400px", overflow: "auto" }}>
                        {Object.entries(settlements.data)
                            .reverse()
                            .map(([year, yearData]) => (
                                <Accordion key={year}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${year}-content`}
                                        id={`panel${year}-header`}
                                    >
                                        <Typography>{year}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {Object.entries(yearData).map(([month, monthData]) => (
                                            <MonthSettlement key={month}>
                                                <p>{`🗓️ ${monthNames[(month as unknown as number) - 1]}`}</p>
                                                <p>Profit: {`💲${monthData.amount}`}</p>
                                            </MonthSettlement>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                    </List>
                ) : (
                    <CircularProgress
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-20px",
                            marginLeft: "-20px"
                        }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewMySettlements;
