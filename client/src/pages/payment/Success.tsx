import { useNavigate, useParams } from "react-router-dom";
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

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    setTimeout(() => {
        navigate(`/courses/${courseId}`, { replace: true });
    }, 5000);

    return (
        <CardContainer>
            <h1>Payment Issued Successfully</h1>
            <h2>Congratulation you enrolled in the course</h2>
            <br />
            <p>Payment was issued. you will be redirected to the course right now</p>
        </CardContainer>
    );
};

export default PaymentSuccess;
