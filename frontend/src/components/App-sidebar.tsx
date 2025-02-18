

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar({ menuItems }) {
  return (
    <SidebarProvider className="w-2/12">
      <SidebarTrigger className="lg:hidden">Open Menu</SidebarTrigger>
      <SidebarInset className="w-64 bg-white h-full p-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
            
                    <Link
        to={item.link}
        className="block py-2 px-4 hover:bg-green-50 focus:bg-green-50"
      >
        {item.name}
        {item.count !== undefined && (
          <span className="ml-2 text-sm text-red-500">{item.count}</span>
        )}
      </Link>
            </li>
          ))}
        </ul>
      </SidebarInset>
    </SidebarProvider>
  );
}

