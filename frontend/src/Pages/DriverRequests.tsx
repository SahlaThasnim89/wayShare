import { Header, Footer } from "../components/index";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";

const DriverRequests = () => {
  return (
    <div className="bg-green-50">
      <Header />
      <>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <header className="flex flex-row justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">WayShare</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Requests</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div></div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                <Alert className="flex items-center justify-between gap-4 p-4 border rounded-lg bg-white shadow">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="size-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                    <div>
                      <AlertTitle>Robert kay</AlertTitle>
                      <AlertDescription>Robert123@gmail.com.</AlertDescription>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 w-1/6">
                    <Button
                      variant="outline"
                      className="px-3 py-1 w-1/2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Delete
                    </Button>
                    <Link to="/admin/applicationDetails" className="w-full">
                      <Button
                        variant="outline"
                        className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </Alert>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </>

      <Footer />
    </div>
  );
};

export default DriverRequests;
