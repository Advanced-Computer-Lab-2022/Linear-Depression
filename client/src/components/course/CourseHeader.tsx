import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useContext } from "react";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import OptionsButton from "../OptionsButton";
import CourseActions from "./courseHeader/CourseActions";
import CourseInfo from "./courseHeader/CourseInfo";
import { UserContext } from "@internals/contexts";
import { useAppSelector } from "@internals/redux";
import { User } from "@internals/types";

const Header = styled.div`
    height: 370px;
    background-color: #1e1f1f;
    padding: 32px 96px;
    color: white;
    display: flex;
`;

const CourseHeader: React.FC = () => {
    const { data, loading } = useAppSelector((state) => state.course);
    const {
        _id,
        title,
        description,
        averageRating,
        instructor: { firstName, lastName },
        price,
        activePromotion,
        currency
    } = data;
    const { userType } = useContext(UserContext);
    const options = [
        {
            label: "Edit",
            onClick: () => {
                openModal({
                    name: "editCourse"
                });
            }
        },
        {
            label: "Delete",
            onClick: () => console.log("Delete")
        }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Header>
            <CourseInfo
                title={title}
                description={description}
                instructor={`${firstName} ${lastName}`}
                rating={averageRating}
            />
            <CourseActions price={price} currency={currency} promotion={activePromotion} courseId={_id} />

            {userType == User.INSTRUCTOR && <OptionsButton options={options} color="white" icon={<MoreVertIcon />} />}
        </Header>
    );
};

export default CourseHeader;
