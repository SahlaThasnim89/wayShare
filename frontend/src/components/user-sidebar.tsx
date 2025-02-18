import { AppSidebar } from "./App-sidebar";

export function UserSidebar() {
  const menuItems = [
    { link: "/overView", name: "Overview" },
    { link: "/Profile", name: "Account Info"},
    { link: "/Activity", name: "My Activity" },
    { link: "/Notifications", name: "Notifications", count: 3 },
    { link: "/Refer & Earn", name: "Refer & Earn" },
    { link: "/changePassword", name: "Change password" },
    { link: "/settings", name: "Settings" },
    { link: "/logout", name: "Logout" }
  ];

  return <AppSidebar menuItems={menuItems} />;
}
