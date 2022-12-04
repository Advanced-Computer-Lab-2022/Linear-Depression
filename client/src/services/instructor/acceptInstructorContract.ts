import Cookies from "universal-cookie";

const setInstructorAcceptedContract = (accepted: boolean) => {
    (new Cookies()).set("instructor-accept-contract", accepted, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    });
};

export default setInstructorAcceptedContract;
