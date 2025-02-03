import { AppSidebar } from "./App-sidebar";

export function UserSidebar() {
  const menuItems = [
    { link: "/", name: "Home" },
    { link: "/Profile", name: "My Account"},
    { link: "/Activity", name: "My Activity" },
    { link: "/Notifications", name: "Notifications", count: 3 },
    { link: "/Refer & Earn", name: "Refer & Earn" },
    { link: "/settings", name: "Settings" },
    { link: "/logout", name: "Logout" }
  ];

  return <AppSidebar menuItems={menuItems} />;
}
