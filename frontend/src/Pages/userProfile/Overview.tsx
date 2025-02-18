

import { Header, Footer,ProfileCard } from "../../components/index";
import { Link, useNavigate } from "react-router-dom";
import { UserSidebar } from "@/components/user-sidebar";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";
import { toast } from "sonner";
import axios from 'axios'
import { useEffect, useState } from "react";






const Overview  = () => {
  const user=useSelector(selectUser)
  const navigate=useNavigate()

  const [currentUser,setCurrentUser]=useState(null)
  console.log(currentUser,'hgjhg')

  useEffect(()=>{
    if(user){
      getUser()
    }
  },[user])


  const getUser=async()=>{
    try {
      const res=await axios.get('/api/Profile')
      const userProfile=res.data
      setCurrentUser(userProfile)
     
    } catch (error:any) {
      console.log('Error fetching user data',error);
      toast(error.message)
    }
  }





  return (
    <div className="bg-green-50">
      <Header />
      <>
      <SidebarProvider>
          <UserSidebar />
          <SidebarInset className="bg-green-50 justify-start">
         <div className="m-4">
            <h1 className="text-3xl font-semibold mt-5">Welcome, {user.name}</h1>
            <p className="text-md my-3">Manage your info, security and data to make Wayshare work better for you.</p>

            <Card className="max-w-xl w-[64rem] my-4">
        <CardHeader>
          <CardTitle className="text-3xl">Complete your account checkup</CardTitle>
          <CardDescription className="text-md">
          Complete your account check-up to make Wayshare work better for you and keep you secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex justify-start">
                   <Link to="/checkup">
                <button className="bg-slate-900 px-10 py-3 text-white w:full md:w-auto">
                  Account Check-up
                </button>
                </Link>
                </div>
       
          
        </CardContent>
      </Card>
      </div>
          </SidebarInset>
        </SidebarProvider>
      </>
   

      <Footer />
    </div>
  );
};



export default Overview