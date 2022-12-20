import { useEffect, useState } from "react";

import { fetchMyNote } from "@internals/services";
import { Note } from "@internals/types";

const useFetchMyNote = (lessonId: string) => {
    const [note, setNote] = useState({
        data: null as Note | null,
        loading: true,
        error: null
    });
    const [savedContent, setSavedContent] = useState("");

    const [content, setContent] = useState("");

    const updateNote = () => {
        fetchMyNote(lessonId)
            .then((data) => {
                setNote({
                    data,
                    loading: false,
                    error: null
                });
                setSavedContent(data.content);
                setContent(data.content);
            })
            .catch((error) => {
                setNote({
                    data: null,
                    loading: false,
                    error
                });
                setSavedContent("");
                setContent("");
            });
    };

    useEffect(() => {
        updateNote();
    }, [lessonId]);

    return { note, setNote, savedContent, setSavedContent, content, setContent, updateNote };
};

export default useFetchMyNote;
