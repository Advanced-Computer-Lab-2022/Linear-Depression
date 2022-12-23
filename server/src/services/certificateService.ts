import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const createCertificate = (studentName: string, courseName: string, date: string, fileName: string) => {
    const doc = new PDFDocument({
        size: "A4",
        layout: "landscape"
    });

    const publicDirectory = path.join(__dirname, "../../public");

    doc.pipe(fs.createWriteStream(`${publicDirectory}/certificates/${fileName}.pdf`));
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

    doc.fontSize(10);

    // Margin
    const distanceMargin = 18;

    doc.fillAndStroke("#0e8cc3")
        .lineWidth(20)
        .lineJoin("round")
        .rect(distanceMargin, distanceMargin, doc.page.width - distanceMargin * 2, doc.page.height - distanceMargin * 2)
        .stroke();

    // Header
    const maxWidth = 140;
    const maxHeight = 70;

    // from public folder
    const imagePath = publicDirectory + "/assets/winners.png";

    doc.image(imagePath, doc.page.width / 2 - maxWidth / 2, 60, {
        fit: [maxWidth, maxHeight],
        align: "center"
    });
    const fontDir = publicDirectory + "/fonts";
    jumpLine(doc, 5);

    // Content
    doc.font(`${fontDir}/NotoSansJP-Regular.otf`).fontSize(16).fill("#021c27").text("CERTIFICATE OF COMPLETION", {
        align: "center"
    });

    jumpLine(doc, 1);

    doc.font(`${fontDir}/NotoSansJP-Light.otf`).fontSize(10).fill("#021c27").text("Present to", {
        align: "center"
    });

    jumpLine(doc, 2);

    doc.font(`${fontDir}/NotoSansJP-Bold.otf`).fontSize(24).fill("#021c27").text(studentName, {
        align: "center"
    });

    jumpLine(doc, 1);

    doc.font(`${fontDir}/NotoSansJP-Light.otf`)
        .fontSize(10)
        .fill("#021c27")
        .text(`Successfully completed  ${courseName} on ${date}`, {
            align: "center"
        });

    jumpLine(doc, 7);

    doc.lineWidth(1);

    const lineSize = 174;
    const signatureHeight = 390;

    doc.fillAndStroke("#021c27");
    doc.strokeOpacity(0.2);

    const endLine1 = 128 + lineSize;
    const startLine2 = endLine1 + 32;
    const endLine2 = startLine2 + lineSize;
    doc.moveTo(startLine2, signatureHeight).lineTo(endLine2, signatureHeight).stroke();

    doc.font(`${fontDir}/NotoSansJP-Bold.otf`)
        .fontSize(10)
        .fill("#021c27")
        .text(studentName, startLine2, signatureHeight + 10, {
            columns: 1,
            columnGap: 0,
            height: 40,
            width: lineSize,
            align: "center"
        });

    doc.font(`${fontDir}/NotoSansJP-Light.otf`)
        .fontSize(10)
        .fill("#021c27")
        .text("Student", startLine2, signatureHeight + 25, {
            columns: 1,
            columnGap: 0,
            height: 40,
            width: lineSize,
            align: "center"
        });

    jumpLine(doc, 4);

    // Footer
    const bottomHeight = doc.page.height - 100;

    const qrPath = publicDirectory + "/assets/qr.png";
    doc.image(qrPath, doc.page.width / 2 - 30, bottomHeight, {
        fit: [60, 60]
    });

    doc.end();
};

function jumpLine(doc: PDFKit.PDFDocument, lines: number) {
    for (let index = 0; index < lines; index++) {
        doc.moveDown();
    }
}
export default createCertificate;
