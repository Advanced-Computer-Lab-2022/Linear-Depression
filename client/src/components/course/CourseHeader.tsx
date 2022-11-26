import React from "react";
import styled from "styled-components";

import CourseActions from "./courseHeader/CourseActions";
import CourseInfo from "./courseHeader/CourseInfo";
import { useAppSelector } from "@internals/redux";

const Header = styled.div`
    height: 370px;
    background-color: #1e1f1f;
    justify-content: center;
    padding: 32px 0;
    color: white;
    display: flex;
`;

const CourseHeader: React.FC = () => {
    const { data, loading } = useAppSelector((state) => state.course);
    const {
        title,
        description,
        averageRating,
        instructor: { firstName, lastName },
        price,
        promotion,
        currency
    } = data;

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
            <CourseActions price={price} currency={currency} promotion={promotion} />
        </Header>
    );
};

export default CourseHeader;
