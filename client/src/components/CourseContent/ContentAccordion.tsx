import React from "react";
import ContentItem from "./ContentItem";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./ContentAccordion.css";
import { Lesson as ILessonProps } from "@internals/types";

const ContentAccordion: React.FC<{
    lesson: ILessonProps;
}> = ({ lesson: { _id, title, totalHours, video, exercises } }) => {
    return (
        <>
            <h2 className="accordion-header" id={`panelsStayOpen-heading${_id}`}>
                <button
                    className="accordion-header-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapse${_id}`}
                    aria-expanded="false"
                    aria-controls={`panelsStayOpen-collapse${_id}`}
                >
                    <MdKeyboardArrowDown className="accordion-icon" />
                    <div className="accordion-title">{title}</div>
                    <div className="accordion-subtitle">{`${totalHours} hours`}</div>
                </button>
            </h2>
            <div
                id={`panelsStayOpen-collapse${_id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`panelsStayOpen-heading${_id}`}
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
                            <ContentItem key={exercise._id} title={exercise.title} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ContentAccordion;
