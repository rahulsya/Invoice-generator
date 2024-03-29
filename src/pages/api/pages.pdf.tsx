import { Settings } from "@/@types/types";
import PdfDocument from "@/app/pdf/document";
import { getSettings } from "@/firebase/settings";
import { getInvoiceDetail } from "@/firebase/store";
import { renderToStream } from "@joshuajaco/react-pdf-renderer-bundled";
import { NextApiRequest, NextApiResponse } from "next";

export const dynamic = "force-dynamic";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const inv_number = req.query.inv_number || `inv-`;
  if (req.query.inv_number) {
    const detailInvoice = await getInvoiceDetail(`${req.query.inv_number}`);
    const settings = (await getSettings()) as Settings;
    if (detailInvoice) {
      const { items, ...detail } = detailInvoice;
      const buffer = await renderToStream(
        <PdfDocument
          data={items}
          detail={detail}
          summaryTotal={req.query?.summary_total?.toString() || ""}
          logoUrl={settings?.logo_url}
          settings={settings}
        />
      );

      res
        .status(200)
        .setHeader("Content-Type", "application/pdf")
        .setHeader(
          "Content-Disposition",
          `attachment; filename=${inv_number}.pdf`
        );
      await res.send(buffer);
    }
  }
}
