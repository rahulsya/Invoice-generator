import React from "react";

const Menus = [
  {
    title: "Dashboard",
    link: "/dashboard",
    active: false,
  },
  {
    title: "Invoices",
    link: "/dashboard",
    active: true,
  },
  {
    title: "Documents",
    link: "/dashboard",
    active: false,
  },
  {
    title: "Settings",
    link: "/dashboard",
    active: false,
  },
];

function SideNavigation() {
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
          {Menus.map((menu) => (
            <div className="pb-4 px-8">
              {menu.active ? (
                <div className="text-sm font-semibold text-gray-900 bg-gray-300 p-3 rounded">
                  {menu.title}
                </div>
              ) : (
                <div className="text-sm font-semibold text-gray-500 px-3">
                  {menu.title}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* end menus */}
      </div>
    </div>
  );
}

export default SideNavigation;
