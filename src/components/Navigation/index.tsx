import { useAuthContext } from "@/firebase/AuthContext";
import { logout } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

function Navigation() {
  const { user } = useAuthContext();
  const router = useRouter();

  const onLogout = async () => {
    const signout = await logout();
    if (signout) {
      router.push("/login");
    }
  };
  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-8 py-4 mb-4 drop-shadow-xl">
      <div className="text-lg font-semibold">Invoices</div>
      <div className="flex ">
        {user && (
          <div
            onClick={() => onLogout()}
            className="px-4 py-2 bg-white rounded-lg text-blue-800 cursor-pointer"
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
