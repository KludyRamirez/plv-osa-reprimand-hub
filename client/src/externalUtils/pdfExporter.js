import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";

export default function pdfExporter(selectedItems, items, setExportTrigger) {
  const exportItems = items.filter((c) => selectedItems.includes(c._id));

  const pdfElement = document.createElement("div");
  pdfElement.style.position = "absolute";
  pdfElement.style.left = "-9999px";
  pdfElement.style.top = "0";
  pdfElement.style.width = "210mm";
  pdfElement.style.minHeight = "297mm";
  pdfElement.style.color = "black";
  document.body.appendChild(pdfElement);

  const root = createRoot(pdfElement);
  root.render(
    <div id="pdf-content">
      {exportItems.map((c) => (
        <div className="w-[710px] border-[1px]" key={c._id}>
          {c.typeOfViolation}
        </div>
      ))}
    </div>
  );

  setTimeout(() => {
    html2canvas(pdfElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10);
        pdf.save("download.pdf");
        document.body.removeChild(pdfElement);
        setExportTrigger(false);
      })
      .catch((error) => {
        console.error("Error creating PDF:", error);
        document.body.removeChild(pdfElement);
        setExportTrigger(false);
      });
  }, 1000);
}
