import { config } from "@internals/config";

const downloadPDF = (noteId: string) => {
    fetch(`${config.API_URL}/notes/${noteId}.pdf`, { method: "get" })
        .then((res) => res.blob())
        .then((res) => {
            const aElement = document.createElement("a");
            aElement.setAttribute("download", "notes.pdf");
            const href = URL.createObjectURL(res);
            aElement.href = href;
            aElement.setAttribute("target", "_blank");
            aElement.click();
            URL.revokeObjectURL(href);
        });
};

export default downloadPDF;
