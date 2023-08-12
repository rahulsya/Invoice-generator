import PdfDocument from "@/app/flyover/pdf/document";
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
  const logoURL = `https://${req.headers["x-forwarded-host"]}/logoFlyover.png`;
  const inv_number = req.query.inv_number || `inv-`;

  const buffer = await renderToStream(
    <PdfDocument
      data={req.query?.data?.toString() || ""}
      detail={req.query?.detail?.toString() || ""}
      summaryTotal={req.query?.summary_total?.toString() || ""}
      logoUrl={logoURL}
    />
  );

  res
    .status(200)
    .setHeader("Content-Type", "application/pdf")
    .setHeader("Content-Disposition", `attachment; filename=${inv_number}.pdf`);
  await res.send(buffer);
}
