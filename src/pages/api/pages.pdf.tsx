import PdfDocument from "@/app/pdf-preview/document";
import {
  renderToBuffer,
  renderToStream,
  Page,
  View,
  Text,
  Document,
} from "@joshuajaco/react-pdf-renderer-bundled";
import { NextApiRequest, NextApiResponse } from "next";

export const dynamic = "force-dynamic";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const buffer = await renderToStream(<PdfDocument />);

  res
    .status(200)
    .setHeader("Content-Type", "application/pdf")
    .setHeader("Content-Disposition", `attachment; filename="pagesz.pdf"`);

  res.send(buffer);
}
