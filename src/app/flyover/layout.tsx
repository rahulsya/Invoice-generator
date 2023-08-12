import Navigation from "@/components/Navigation";
import React from "react";

type Iprops = {
  children: React.ReactNode;
};
function FlyoverInvoiceLayout({ children }: Iprops) {
  return (
    <div className="w-full bg-gray-400">
      <Navigation />
      <div className="mx-auto px-12 pb-12">{children}</div>
    </div>
  );
}

export default FlyoverInvoiceLayout;
