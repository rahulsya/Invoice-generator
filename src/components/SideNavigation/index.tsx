import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { dashboardIC, fileIC, settingIC } from "@/assets/icons";

const Menus = [
  {
    title: "Dashboard",
    link: "/flyover/dashboard",
    active: false,
    icon: dashboardIC,
  },
  {
    title: "Invoices",
    link: "/flyover/invoices",
    active: true,
    icon: fileIC,
  },
  {
    title: "Documents",
    link: "/flyover/document",
    active: false,
    icon: fileIC,
  },
  {
    title: "Settings",
    link: "/flyover/setting",
    active: false,
    icon: settingIC,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-r-2 border-gray-300 h-full w-full">
      <div className="flex flex-col">
        {/* Company Logo */}
        <div className="border-b py-4 px-8 border-gray-300">
          <div className="text-sm font-bold">Flyover Sticker</div>
          <div className="text-xs font-semibold text-gray-500">Workspace</div>
        </div>
        {/* end company logo */}

        {/* menus */}
        <div className="mt-4">
          {Menus.map((menu, index) => {
            const active = pathname == menu.link;
            return (
              <div
                key={index}
                className="w-full mb-2 px-0 lg:px-8 cursor-pointer"
              >
                <Link href={`${menu.link}`}>
                  <div
                    className={`flex text-sm font-semibold p-3 rounded ${
                      active
                        ? "text-gray-900 bg-gray-300"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <Image
                      className="mr-3"
                      width={20}
                      height={20}
                      src={menu.icon}
                      alt="icon"
                    />
                    <div className="">{menu.title}</div>
                  </div>
                  {/* )} */}
                </Link>
              </div>
            );
          })}
        </div>
        {/* end menus */}
      </div>
    </div>
  );
}

export default SideNavigation;
