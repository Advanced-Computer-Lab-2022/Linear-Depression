import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useFetchMyNote } from "@internals/hooks";
import { addNote, editNote, downloadPDF, saveAsPDF } from "@internals/services";

const Container = styled.div`
    width: 650px;
`;

const HorizontalBar = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #0d1117;
`;

const Note: React.FC<{
    setOpen: (open: boolean) => void;
}> = ({ setOpen }) => {
    const { lessonId } = useParams();
    const { note, content, setContent, updateNote } = useFetchMyNote(lessonId);

    const saveNote = async () => {
        console.log("Save: ", content);
        if (note.data) {
            console.log("Update");
            const newNote = note.data;
            newNote.content = content;
            await editNote(lessonId, newNote._id, newNote);
        } else {
            addNote(lessonId, content)
                .then(() => {
                    updateNote();
                })
                .catch((err) => {
                    console.log("Add error: ", err);
                });
        }
    };

    const handleSave = () => {
        saveNote()
            .then(() => {
                console.log("Save success");
            })
            .catch((err) => {
                console.log("Save error: ", err);
            });
    };

    const handleDownload = () => {
        saveNote()
            .then(async () => {
                await saveAsPDF(lessonId, note.data?._id);
                downloadPDF(note.data?._id);
            })
            .catch((err) => {
                console.log("Save error: ", err);
            });
    };

    const closeNote = {
        name: "close",
        keyCommand: "close",
        value: "close",
        icon: (
            <CloseIcon
                onClick={() => {
                    setOpen(false);
                }}
            />
        )
    };

    return (
        <Container>
            <MDEditor
                height={300}
                value={content}
                onChange={setContent}
                extraCommands={[commands.fullscreen, commands.codeEdit, commands.codePreview, closeNote]}
                preview={"edit"}
            />
            <HorizontalBar>
                <Button
                    sx={{
                        color: "white"
                    }}
                    onClick={handleDownload}
                >
                    <DownloadIcon
                        sx={{
                            width: "20px"
                        }}
                    />
                </Button>
                <Button
                    sx={{
                        color: "white"
                    }}
                    onClick={handleSave}
                >
                    <SaveIcon
                        sx={{
                            width: "20px"
                        }}
                    />
                </Button>
            </HorizontalBar>
        </Container>
    );
};

export default Note;
