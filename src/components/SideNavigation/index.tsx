"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { dashboardIC, fileIC, settingIC, menuIC } from "@/assets/icons";
import Button from "@/components/button";
import { logout } from "@/firebase/auth";

const Menus = [
  {
    title: "Dashboard",
    link: "/dashboard",
    active: false,
    icon: dashboardIC,
  },
  {
    title: "Invoices",
    link: "/invoices",
    active: true,
    icon: fileIC,
  },
  {
    title: "Documents",
    link: "/document",
    active: false,
    icon: fileIC,
  },
  {
    title: "Settings",
    link: "/setting",
    active: false,
    icon: settingIC,
  },
];

function SideNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isShowMenu, setIsShowMenu] = useState(false);

  const onLogout = () => {
    logout()
      .then((response) => {
        router.push("/login");
      })
      .catch((err) => console.log(err));
  };

  const Menu = () => {
    return (
      <>
        {Menus.map((menu, index) => {
          const active = pathname == menu.link;
          return (
            <div
              key={index}
              className="mb-2 w-full cursor-pointer px-0 lg:px-8"
            >
              <Link href={`${menu.link}`} onClick={() => setIsShowMenu(false)}>
                <div
                  className={`flex rounded p-3 text-sm font-semibold ${
                    active
                      ? "bg-gray-300 text-gray-900"
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
      </>
    );
  };

  return (
    <div className="h-full w-full bg-white">
      <div className="flex h-full flex-col">
        {/* Company Logo */}
        <div className="flex flex-row justify-between border-b border-gray-300 px-4 py-4 lg:px-8">
          <div>
            <div className="text-sm font-bold">Flyover Sticker</div>
            <div className="text-xs font-semibold text-gray-500">Workspace</div>
          </div>
          <button
            className="block lg:hidden"
            onClick={() => setIsShowMenu(!isShowMenu)}
          >
            <Image
              className="mr-3"
              width={20}
              height={20}
              src={menuIC}
              alt="icon"
            />
          </button>
        </div>
        {/* end company logo */}

        {/* menus */}
        {isShowMenu && (
          <div className="absolute mt-[70px] flex min-h-screen w-full flex-col border-b bg-white shadow lg:hidden">
            <Menu />
            <Button className="m-2" title="Logout" onClick={onLogout} />
          </div>
        )}
        <div className="mt-2 hidden h-full flex-col justify-between lg:flex">
          <div>
            <Menu />
          </div>
          <Button className="m-2" title="Logout" onClick={onLogout} />
        </div>
        {/* end menus */}
      </div>
    </div>
  );
}

export default SideNavigation;
