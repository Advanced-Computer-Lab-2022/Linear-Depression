import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgress } from "@mui/material";
import React from "react";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import OptionsButton from "../OptionsButton";
import CourseActions from "./courseHeader/CourseActions";
import CourseInfo from "./courseHeader/CourseInfo";
import { useAuth } from "@internals/hooks";
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
        currency,
        preview,
        isPublished
    } = data;
    const {
        auth: { userType }
    } = useAuth();
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

    if (loading || !data) {
        return (
            <Header>
                <CircularProgress
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                />
            </Header>
        );
    }
    return (
        <Header>
            <CourseInfo
                title={title}
                description={description}
                instructor={`${firstName} ${lastName}`}
                rating={averageRating}
                isPublished={isPublished}
            />
            <CourseActions
                price={price}
                currency={currency}
                promotion={activePromotion}
                courseId={_id}
                videoUrl={preview}
                isPublished={isPublished}
            />

            {userType === User.INSTRUCTOR && !isPublished && (
                <OptionsButton options={options} color="white" icon={<MoreVertIcon />} />
            )}
        </Header>
    );
};

export default CourseHeader;
