import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CircularProgressBar from "./CircularProgressBar";
import { useAppSelector } from "@internals/redux";

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
    const enrollment = useAppSelector((state) => state.enrollment);

    return (
        <HorizontalContainer>
            <NavItem>
                <Link className="navbar-brand" to="/">
                    Linear Depression
                </Link>
            </NavItem>
            <CustomDivider orientation="vertical" flexItem />
            <NavItem>
                <Link className="navbar-brand" to={`/courses/${course.data?._id}`}>
                    {course.data?.title}
                </Link>
            </NavItem>
            <ProgressContainer>
                <NavItem>
                    <CircularProgressBar value={enrollment.data?.progress} />
                </NavItem>
                {enrollment.data?.progress === 100 ? "Get Certificate" : "Your Progress"}
                {/* TODO: Add link to certificate */}
            </ProgressContainer>
        </HorizontalContainer>
    );
};

export default CourseNavbar;
