import { Header, Footer } from "../components/index";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/App-sidebar";
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
import {DataTableDemo} from '../components/Table'
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin-sidebar";


const DriversList = () => {
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
                      <BreadcrumbLink href="#">
                        WayShare
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>List</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            <div>
            <Link to='/admin/DriverRequests'>
            <Button variant="outline" className="mr-5">
               Requests
            </Button>
            </Link>
            </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
              <DataTableDemo/>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </>

      <Footer />
    </div>
  )
}

export default DriversList



