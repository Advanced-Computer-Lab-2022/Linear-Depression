import { handleCheckout } from "@internals/services";

const PaymentTest = () => {
    return <button onClick={handleCheckout}>checkout</button>;
};

export default PaymentTest;
