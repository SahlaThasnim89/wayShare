import { Header, Footer, DataCards } from "../../components/index";
import { Link } from "react-router-dom";
import { AdminSidebar } from "@/components/admin-sidebar";
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
import { RiUser2Fill } from "react-icons/ri";
import { profileimg } from "../../assets/index";
import { AspectRatio } from "@/components/ui/aspect-ratio";



const DriverApplicationDetails = () => {
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
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Request in Detail</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div></div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <div className="flex flex-row px-10 py-5 justify-between">
              <div className="w-[150px]">
                    {/* <AspectRatio ratio={16 / 9}> */}
                      <img
                        src={profileimg}
                        alt="Image"
                        className="rounded-md object-cover w-36 h-36"
                      />
                    {/* </AspectRatio> */}
                  </div>
                  <div className="flex flex-col gap-2 text-start">
                  <h1 className="font-bold ">Name: Robert</h1>
                  <p>Email:Robert@gmail.com</p>
                  <p>Age:25</p>
                  <p>Vehicle type: Car</p>

                </div>
                <div className="flex flex-col gap-4 w-1/6">
    
    <Button variant="outline" className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
    <Link to='/admin/approve'>Approve</Link> 
            </Button>
    <Button variant="outline" className="px-3 py-1  text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
    Delete
    </Button>
  </div>
  </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:mx-10 m-10'>
            <DataCards type="Driving Lisence" unique='no:67668668'/>
            <DataCards type="Aadhar card" unique='no:67668668'/>
            <DataCards type="PAN Card" unique='no:67668668'/>
            <DataCards type="Registration Certificate(rc)" unique='no:67668668'/>
            <DataCards type="Vehicle Insurance" unique='no:67668668'/>
            <DataCards type="Permit" unique='no:67668668'/>

        </div> 
              </div>
            </div>
            
          </SidebarInset>
        </SidebarProvider>
      </>

      <Footer />
    </div>
  );
};

export default DriverApplicationDetails;
