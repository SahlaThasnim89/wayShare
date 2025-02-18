import React, { useEffect, useState } from 'react'
import { Header, Footer } from "../../components/index";
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
import { AdminSidebar } from "@/components/admin-sidebar";
import { fetchUsers,blockUser } from '@/API/admin';
import { Plus, PlusCircle, Search, UserRound, UserRoundCheck, UserRoundX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";







const UserList = () => {

  const [user, setUser] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [blocked,setBlocked]=useState(new Set())



  console.log(user,'yyegj')

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUser(data); 
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load users"); 
        setLoading(false);
      });
  }, []);

  const FilterUser = user?.filter((user) => {
    const creationTime = new Date(user.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creationTime.includes(searchQuery)
    );
  });


  const BlockUser = async (e, id, isBlocked) => {
    try {
      console.log(id, isBlocked)
      const updatedUser = await blockUser(id, isBlocked);
  
      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
  
      setBlocked((prev) => {
        const updated = new Set(prev);
        if (isBlocked) {
          updated.delete(id);
        } else {
          updated.add(id);
        }
        return updated;
      });
  
      const action = isBlocked ? "User unblocked successfully" : "User blocked successfully";
      toast(action);
    } catch (error) {
      toast("Action failed");
    }
  };



  return (
    <div className="bg-green-50">
    <Header />
    <>
      <SidebarProvider>
      <AdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
             
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2 relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                      Manage your Users and view their Details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            Image
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>email</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Mobile Number
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created at
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Block
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {FilterUser?.length > 0 ? (
                          FilterUser?.map((user) => (
                            <TableRow key={user._id}>
                              <TableCell className="hidden sm:table-cell">
                                {user.image ? (
                                  <img
                                    alt="User image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={user.image}
                                    width="64"
                                  />
                                ) : (
                                  <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-16 w-16 rounded-md flex items-center justify-center"
                                  >
                                    <UserRound className="h-8 w-8" />
                                  </Button>
                                )}
                              </TableCell>
                              <TableCell className="font-medium">
                                {user.name}
                              </TableCell>

                              <TableCell className="hidden md:table-cell">
                                {user.email}
                              </TableCell>
                                <TableCell>
                                {user.mobile}
                              </TableCell>

                              <TableCell className="hidden md:table-cell">
                                {new Date(user.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </TableCell>
                            

                              <TableCell>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            variant="secondary"
                                            size="icon"
                                            className="rounded-full"
                                          >
                                            {user.isBlocked ? (
                                              <UserRoundCheck className="h-5 w-5" />
                                            ) : (
                                              <UserRoundX className="h-5 w-5" />
                                            )}

                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>
                                              Are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                            Please confirm: this action will affect their access. Do you want to proceed?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>
                                              Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={(e) =>
                                                BlockUser(e, user._id,user.isBlocked)
                                              }
                                            >
                                              Continue
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                    <p>{user.isBlocked ? "Unblock user" : "Block user"}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">
                              No users found
                            </TableCell>  
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>

    <Footer />
  </div>
  )
}

export default UserList