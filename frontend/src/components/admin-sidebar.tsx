import { AppSidebar } from "./App-sidebar";

export function AdminSidebar() {
  const menuItems = [
    { link: "/admin/dashboard", name: "Dashboard" },
    { link: "/admin/UserList", name: "UserList", count: 7 },
    { link: "/admin/DriverList", name: "DriverList", count: 3 },
    { link: "/admin/RidesList", name: "RidesList" },
    { link: "/admin/Reviews", name: "Reviews" },
    { link: "/admin/Complaints", name: "Complaints" },
    { link: "/admin/Chats", name: "Chats" },
    { link: "/admin/Reviews", name: "Reviews" },
    { link: "/admin/Complaints", name: "Complaints" },
    { link: "/admin/profile", name: "profile" },
    { link: "/logout", name: "Logout" }
  ];

  return <AppSidebar menuItems={menuItems} />;
}
