import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo-black.png";
import CircularProgressBar from "./CircularProgressBar";
import { useFetchMyEnrollment } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";
import { downloadCertificate } from "@internals/services";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Image = styled.img`
    width: 200px;
    height: 30px;
    cursor: pointer;
`;

const HorizontalContainer = styled.div`
    display: flex;
    background-color: #1c1d1f;
    height: 60px;
`;

const NavItem = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    color: white;
    font-size: 18px;
`;

const CustomDivider = styled(Divider)`
    background-color: white;
    margin: 10px 10px 10px 10px !important;
`;

const ProgressContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 20px;
    color: white;
`;

const CourseNavbar: React.FC = () => {
    const course = useAppSelector((state) => state.course);
    useFetchMyEnrollment(course.data?._id);
    const enrollment = useAppSelector((state) => state.enrollment);

    const navigate = useNavigate();

    const handleDownloadCertificate = () => {
        downloadCertificate(enrollment.data?._id);
    };

    return (
        <HorizontalContainer>
            <NavItem>
                <Image src={logo} alt="logo" onClick={() => navigate("/")} />
            </NavItem>
            <CustomDivider orientation="vertical" flexItem />
            <NavItem>
                <ArrowBackIcon sx={{ marginRight: "10px" }} />
                <Link className="navbar-brand" to={`/courses/${course.data?._id}`}>
                    {course.data?.title}
                </Link>
            </NavItem>
            {enrollment.data && (
                <ProgressContainer>
                    <NavItem>{enrollment.data && <CircularProgressBar value={enrollment.data?.progress} />}</NavItem>
                    {enrollment.data?.progress === 100 ? (
                        <Button
                            sx={{
                                color: "white",
                                textTransform: "none"
                            }}
                            onClick={handleDownloadCertificate}
                        >
                            Get Certificate
                        </Button>
                    ) : (
                        "Your Progress"
                    )}
                </ProgressContainer>
            )}
        </HorizontalContainer>
    );
};

export default CourseNavbar;
