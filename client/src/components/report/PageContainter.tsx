import { Sheet, CircularProgress } from "@mui/joy";
import React from "react";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
    components: {
        JoyButton: {
            styleOverrides: {
                root: {
                    borderRadius: "sm",
                    boxShadow: "0 0 0 0px rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)"
                }
            },
            defaultProps: {
                loadingPosition: "start",
                variant: "soft"
            }
        }
    },
    fontFamily: {
        body: "Inter, sans-serif",
        display: "Inter, sans-serif"
    }
});

interface PageContainerProps {
    width: number;
    children: React.ReactNode;
    loading: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ width, children, loading }) => {
    return (
        <CssVarsProvider theme={theme}>
            <Sheet
                sx={{
                    width: width,
                    mx: "auto",
                    py: 3,
                    px: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    borderRadius: "sm",
                    height: loading ? "100vh" : "auto"
                }}
                variant="plain"
            >
                {loading ? <CircularProgress size="lg" variant="soft" sx={{ mx: "auto" }} /> : children}
            </Sheet>
        </CssVarsProvider>
    );
};

export default PageContainer;
