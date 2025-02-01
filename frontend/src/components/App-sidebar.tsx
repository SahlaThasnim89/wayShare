import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <SidebarProvider className="w-2/12">
      <SidebarTrigger className="lg:hidden">Open Menu</SidebarTrigger>
      <SidebarInset className="w-64 bg-gray-100 h-full p-4">
        <ul>
          <li>
          <Link to="/admin/dashboard">
            <a className="block py-2 px-4 rounded hover:bg-gray-200">
               Dashboard
            </a>
            </Link>
          </li>
          <li>
          <Link to="/admin/UserList">
            <a className="block py-2 px-4 rounded hover:bg-gray-200">
               Users
            </a>
            </Link>
          </li>
          <li>
            <Link to="/admin/DriverList">
              <a className="block py-2 px-4 rounded hover:bg-gray-200">
                Drivers
              </a>
            </Link>
          </li>
          <li>
          <Link to="/admin/RidesList">
            <a className="block py-2 px-4 rounded hover:bg-gray-200">
               Rides
            </a>
            </Link>
          </li>
          <li>
            <a className="block py-2 px-4 rounded hover:bg-gray-200">
              <Link to="/Reviews"> Reviews</Link>
            </a>
          </li>
          <li>
            <a className="block py-2 px-4 rounded hover:bg-gray-200">
              <Link to="/Complaints"> Complaints</Link>
            </a>
          </li>
          <li>
            <a className="block py-2 px-4 rounded hover:bg-gray-200">
              <Link to="/Chats"> Chats</Link>
            </a>
          </li>

          <li>
            <a
              href="/profile"
              className="block py-2 px-4 rounded hover:bg-gray-200"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="block py-2 px-4 rounded hover:bg-gray-200"
            >
              Settings
            </a>
          </li>
          <li>
            <a className="block py-2 px-4 rounded hover:bg-gray-200">
              <Link to="/logout"> Logout</Link>
            </a>
          </li>
        </ul>
      </SidebarInset>
    </SidebarProvider>
  );
}
