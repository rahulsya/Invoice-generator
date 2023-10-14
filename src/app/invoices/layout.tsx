"use client";
import Navigation from "@/components/Navigation";
import React, { useEffect, useState } from "react";

type Iprops = {
  children: React.ReactNode;
};
function InvoiceLayout({ children }: Iprops) {
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="w-full bg-gray-400">
      <Navigation />
      <div className="mx-auto px-12 pb-12">{children}</div>
    </div>
  );
}

export default InvoiceLayout;
