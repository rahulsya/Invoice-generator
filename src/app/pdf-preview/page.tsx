"use client";
import React from "react";
import ReactPDF, {
  renderToFile,
  PDFViewer,
} from "@joshuajaco/react-pdf-renderer-bundled";
import PdfDocument from "./document";

function PdfPreview() {
  const onDownload = () => {};
  return (
    <div>
      <a download href="/api/pages.pdf">
        Download PDF from pages directory
      </a>
      <br />
      {/* <PDFViewer> */}
      {/* <PdfDocument /> */}
      {/* </PDFViewer> */}
    </div>
  );
}
export default PdfPreview;
