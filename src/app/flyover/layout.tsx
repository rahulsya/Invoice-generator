"use client";
import Navigation from "@/components/Navigation";
import { useAuthContext } from "@/firebase/AuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type Iprops = {
  children: React.ReactNode;
};
function FlyoverInvoiceLayout({ children }: Iprops) {
  const { user, authLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user]);

  return (
    <div className="w-full bg-gray-400">
      <Navigation />
      {!user ? (
        "Check login status..."
      ) : (
        <div className="mx-auto px-12 pb-12">{children}</div>
      )}
    </div>
  );
}

export default FlyoverInvoiceLayout;
