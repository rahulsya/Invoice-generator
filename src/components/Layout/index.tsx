"use client";
import { useAuthContext } from "@/firebase/AuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideNavigation from "@/components/SideNavigation";
import Loader from "@/components/Loader";

type Iprops = {
  children: React.ReactNode;
};
function Layout({ children }: Iprops) {
  const { user, authLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user]);

  return (
    <div className="h-screen w-full bg-white">
      <div className="relative flex h-full flex-col lg:flex-row">
        <div className="min-w-[300px] border-r">
          <SideNavigation />
        </div>
        {!user ? (
          <Loader />
        ) : (
          <div className="h-screen w-full w-full overflow-y-auto px-0 py-4 lg:px-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Layout;
