import Cookies from "universal-cookie";

const getInstructorContractStatus = () => {
    return new Cookies().get("instructor-accept-contract") === "true";
};

export default getInstructorContractStatus;
