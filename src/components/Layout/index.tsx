"use client";
import { useAuthContext } from "@/firebase/AuthContext";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SideNavigation from "@/components/SideNavigation";
import Loader from "@/components/Loader";

type Iprops = {
  children: React.ReactNode;
};
function Layout({ children }: Iprops) {
  const { user, authLoading } = useAuthContext();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user]);

  if (path && ["/login"].includes(path)) {
    return <div className="h-screen w-full bg-white">{children}</div>;
  }

  return (
    <div className="h-screen w-full bg-white">
      <div className="relative flex h-full flex-col lg:flex-row">
        <div className="min-w-[300px] border-r bg-gray-400">
          <SideNavigation />
        </div>
        {!user ? (
          <Loader />
        ) : (
          <div className="h-screen w-full w-full overflow-y-auto px-0 pb-4 pt-8 lg:px-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Layout;
