import React from "react";
import ContentItem from "./ContentItem";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./ContentAccordion.css";
import ILessonProps from "../../types/Lesson";

const ContentAccordion: React.FC<{
    lesson: ILessonProps;
}> = ({ lesson: { id, title, totalDuration, video, exercises } }) => {
    return (
        <>
            <h2 className="accordion-header" id={`panelsStayOpen-heading${id}`}>
                <button
                    className="accordion-header-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapse${id}`}
                    aria-expanded="false"
                    aria-controls={`panelsStayOpen-collapse${id}`}
                >
                    <MdKeyboardArrowDown className="accordion-icon" />
                    <div className="accordion-title">{title}</div>
                    <div className="accordion-subtitle">{`${totalDuration} hours`}</div>
                </button>
            </h2>
            <div
                id={`panelsStayOpen-collapse${id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`panelsStayOpen-heading${id}`}
                data-bs-parent="#accordionpanelsStayOpenExample"
            >
                <div className="accordion-body">
                    {video && (
                        <ul>
                            <ContentItem title={video.description} link={video.videoLink} />
                        </ul>
                    )}

                    <ul>
                        {exercises.map((exercise) => (
                            <ContentItem key={exercise.id} title={exercise.question} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ContentAccordion;
