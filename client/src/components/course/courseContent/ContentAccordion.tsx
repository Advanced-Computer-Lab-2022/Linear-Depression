import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useParams } from "react-router-dom";
import { openModal } from "react-url-modal";

import OptionsButton from "../../OptionsButton";
import "./ContentAccordion.css";
import ContentItem from "./ContentItem";
import { useAuth } from "@internals/hooks";
import { AddExercise } from "@internals/modals";
import { useAppSelector } from "@internals/redux";
import { getLessonElementsStatus } from "@internals/services";
import { Lesson as ILessonProps, User } from "@internals/types";

const ContentAccordion: React.FC<{
    lesson: ILessonProps;
    showLessonStatus?: boolean;
}> = ({ lesson: { _id, title, totalHours, video, exercises }, showLessonStatus }) => {
    const {
        auth: { userType }
    } = useAuth();

    const enrollement = useAppSelector((state) => state.enrollement);

    const { courseId } = useParams();
    const lessonId = _id;

    let lessonElementsStatus: boolean[] = null;
    if (showLessonStatus && enrollement.data) {
        lessonElementsStatus = getLessonElementsStatus(_id, enrollement.data);
    }

    const [openExerciseModal, setOpenExerciseModal] = useState(false);

    const handleCloseExerciseModal = () => {
        setOpenExerciseModal(false);
    };

    const options = [
        {
            label: "Add Exercise",
            onClick: () => {
                setOpenExerciseModal(true);
            }
        },
        {
            label: "Edit",
            onClick: () => {
                openModal({
                    name: "editLesson",
                    params: {
                        courseId,
                        lessonId,
                        lessonTitle: title,
                        lessonTotalHours: totalHours,
                        lessonVideo: video
                    }
                });
            }
        },
        {
            label: "Delete",
            onClick: () => console.log("Delete")
        }
    ];

    return (
        <>
            <h2 className="accordion-header" id={`panelsStayOpen-heading${_id}`}>
                <div
                    className="accordion-header-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapse${_id}`}
                    aria-expanded="false"
                    aria-controls={`panelsStayOpen-collapse${_id}`}
                >
                    <MdKeyboardArrowDown className="accordion-icon" />
                    <div className="accordion-title">{title}</div>
                    <div className="accordion-subtitle">{`${totalHours} hours`}</div>
                    {userType === User.INSTRUCTOR && <OptionsButton options={options} icon={<MoreVertIcon />} />}
                </div>
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
                            <ContentItem
                                title={video.title}
                                link={video.videoLink}
                                lessonId={lessonId}
                                seen={lessonElementsStatus ? lessonElementsStatus[0] : null}
                            />
                        </ul>
                    )}

                    <ul>
                        {exercises.map((exercise, index) => (
                            <ContentItem
                                key={exercise._id}
                                title={exercise.title}
                                exerciseId={exercise._id}
                                lessonId={lessonId}
                                seen={lessonElementsStatus ? lessonElementsStatus[index + 1] : null}
                            />
                        ))}
                    </ul>
                </div>
                <AddExercise
                    courseId={courseId}
                    lessonId={lessonId}
                    open={openExerciseModal}
                    onClose={handleCloseExerciseModal}
                />
            </div>
        </>
    );
};

export default ContentAccordion;
