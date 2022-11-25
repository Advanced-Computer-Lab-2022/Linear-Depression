import React, { useState } from "react";
import styled from "styled-components";

import ContentAccordion from "./CourseContent/ContentAccordion";
import { Lesson as ILessonProps } from "@internals/types";

const MAX_COUNT_SECTIONS = 10;

const CourseContentInfo = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const ExpandAllButton = styled.button`
    color: #5624d0;
    font-weight: 700 !important;
    font-size: 14px;
    margin-left: auto;
    border: none;
    background: none;
`;

const MoreSectionsButton = styled.button`
    height: 40px;
    width: 100%;
    background-color: transparent;
    margin-top: 16px;
    font-weight: 700;
    font-size: 14px;
    border: 1px solid black;
`;

const CourseContent: React.FC<{
    lessons: ILessonProps[];
}> = ({ lessons }) => {
    const [sectionsExpanded, setSectionsExpanded] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const toggleSectionsExpanded = () => {
        if (!sectionsExpanded) {
            setSectionsExpanded(true);
            document.querySelectorAll(".accordion-header-button.collapsed").forEach((button: any) => {
                button.click();
            });
        } else {
            setSectionsExpanded(false);
            document.querySelectorAll(".accordion-header-button:not(.collapsed)").forEach((button: any) => {
                button.click();
            });
        }
    };
    const clickShowMore = (event: any) => {
        setShowMore(true);
        event.target.style.display = "none";
    };

    return (
        <>
            <CourseContentInfo>
                <ExpandAllButton onClick={toggleSectionsExpanded}>
                    {sectionsExpanded ? "Collapse all sections" : "Expand all sections"}
                </ExpandAllButton>
            </CourseContentInfo>
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {(showMore ? lessons : lessons.slice(0, MAX_COUNT_SECTIONS)).map((lesson) => (
                    <ContentAccordion key={lesson._id} lesson={lesson} />
                ))}
            </div>
            {lessons.length > MAX_COUNT_SECTIONS && (
                <MoreSectionsButton onClick={clickShowMore}>
                    {`${lessons.length - MAX_COUNT_SECTIONS} more lessons`}
                </MoreSectionsButton>
            )}
        </>
    );
};

export default CourseContent;
