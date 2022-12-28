import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Copyright } from "@internals/components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const PrivacyPolicy = () => {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/");
    };

    return (
        <Container>
            <h1>Privacy Policy</h1>
            <object width="80%" height="1000px" data="https://www.lipsum.com/privacy.pdf" type="application/pdf">
                {" "}
            </object>
            <br />

            <div>
                <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
                {"  I agree to the terms and conditions"}
            </div>
            <br />

            <Button variant="contained" color="primary" disabled={!checked} onClick={handleSubmit}>
                Submit
            </Button>

            <br />

            <Copyright />
        </Container>
    );
};

export default PrivacyPolicy;
