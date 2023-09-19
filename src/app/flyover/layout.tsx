"use client";
import Navigation from "@/components/Navigation";
import { useAuthContext } from "@/firebase/AuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideNavigation from "@/components/SideNavigation";

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
    <div className="w-full bg-gray-300">
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/6">
          <SideNavigation />
        </div>
        {!user ? (
          "Check login status..."
        ) : (
          <div className="w-full lg:w-5/6">
            {/* <Navigation /> */}
            <div className="container mx-auto px-4 py-4">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlyoverInvoiceLayout;
