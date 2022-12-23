import { List, Sheet } from "@mui/joy";
import React from "react";

interface TableContainerProps {
    children: React.ReactNode;
}

const TableContainer: React.FC<TableContainerProps> = ({ children }) => {
    return (
        <Sheet
            sx={{
                width: "auto",
                px: 4,
                display: "flex",
                flexDirection: "column",
                borderRadius: "sm",
                boxShadow: "0 0 0 0px rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)"
            }}
        >
            <List
                sx={{
                    "& ul": {
                        "--List-gap": "0px",
                        bgcolor: "background.surface",
                        '& > li:first-child > [role="button"]': {
                            borderTopRightRadius: "var(--List-radius)",
                            borderTopLeftRadius: "var(--List-radius)"
                        },
                        '& > li:last-child > [role="button"]': {
                            borderBottomRightRadius: "var(--List-radius)",
                            borderBottomLeftRadius: "var(--List-radius)"
                        }
                    },
                    "--List-radius": "8px",
                    "--List-divider-gap": "3px",
                    "--List-item-paddingY": "1rem",
                    "--joy-palette-neutral-plainHoverBg": "rgba(0 0 0 / 0.08)",
                    "--joy-palette-neutral-plainActiveBg": "rgba(0 0 1 / 0.12)"
                }}
            >
                {children}
            </List>
        </Sheet>
    );
};

export default TableContainer;
