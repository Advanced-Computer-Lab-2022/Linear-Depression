import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="white" align="center" {...props}>
            {"Copyright © "}
            <Link
                color="#a435f0"
                to="/"
                style={{
                    color: "#a435f0"
                }}
            >
                Linear Depression
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

export default Copyright;
