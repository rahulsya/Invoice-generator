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

  const Loader = () => {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="flex items-center">
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-lg font-semibold text-blue-500">Loading...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-white">
      <div className="relative flex h-full flex-col lg:flex-row">
        <div className="min-w-[300px] border-r">
          <SideNavigation />
        </div>
        {!user ? (
          <Loader />
        ) : (
          <div className="h-screen w-full overflow-y-auto px-0 py-4 lg:w-5/6 lg:px-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default FlyoverInvoiceLayout;
