import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
    width: 500px;
    height: 500px;
    margin: 100px auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 16px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14);
    border-radius: 4px;
`;

const PaymentCancelled = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate("/", { replace: true });
    }, 5000);

    return (
        <CardContainer>
            <h1>Payment Cancelled Successfully</h1>
            <br />
            <p>Payment was cancelled. Please try again if you want to enroll in the course.</p>
            <p>you will be directed to the home page shortly.</p>
        </CardContainer>
    );
};

export default PaymentCancelled;
