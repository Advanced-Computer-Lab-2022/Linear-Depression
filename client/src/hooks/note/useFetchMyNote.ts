import { useEffect, useState } from "react";

import { fetchMyNote } from "@internals/services";
import { Note } from "@internals/types";

const useFetchMyNote = (lessonId: string) => {
    const [note, setNote] = useState({
        data: null as Note | null,
        loading: true,
        error: null
    });
    const [content, setContent] = useState("");

    const updateNote = () => {
        fetchMyNote(lessonId)
            .then((data) => {
                setNote({
                    data,
                    loading: false,
                    error: null
                });
                setContent(data.content);
            })
            .catch((error) => {
                setNote({
                    data: null,
                    loading: false,
                    error
                });
                setContent("");
            });
    };

    useEffect(() => {
        updateNote();
    }, [lessonId]);

    return { note, setNote, content, setContent, updateNote };
};

export default useFetchMyNote;
