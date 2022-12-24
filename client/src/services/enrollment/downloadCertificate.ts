import { config } from "@internals/config";

const downloadCertificate = (enrollmentId: string) => {
    fetch(`${config.API_URL}/certificates/${enrollmentId}.pdf`, { method: "get" })
        .then((res) => res.blob())
        .then((res) => {
            const aElement = document.createElement("a");
            aElement.setAttribute("download", `${enrollmentId}.pdf`);
            const href = URL.createObjectURL(res);
            aElement.href = href;
            aElement.setAttribute("target", "_blank");
            aElement.click();
            URL.revokeObjectURL(href);
        });
};

export default downloadCertificate;
