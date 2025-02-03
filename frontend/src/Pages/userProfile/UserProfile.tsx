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






const UserProfile = () => {
  const user=useSelector(selectUser)
  const navigate=useNavigate()

  const [currentUser,setCurrentUser]=useState(null)

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


  const getProfileEditPage = async (e) => {
    try {
      navigate('/editProfile');
    } catch (error:any) {
      console.log(error.message);
    }
  }




  return (
    <div className="bg-green-50">
      <Header />
      <>
      <SidebarProvider>
          <UserSidebar />
          <SidebarInset className="bg-green-50">
         
                  <Card className="mx-auto max-w-md w-[28rem] my-10">
        <CardHeader>
          <CardTitle className="text-xl text-center">My Account</CardTitle>
          <CardDescription className='text-center'>
            Account Details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center mb-4'>
            {/* {currentUser?.image ? (
              <img className="h-28 w-28 rounded-full" src={currentUser.image} alt="User" /> */}
            {/* // ) : ( */}
              <CircleUser className="h-20 w-20" />
            {/* )} */}
          </div>
          <h1 className='text-center font-semibold mt-6'>{currentUser?.name}</h1>
          {/* <h1 className='mt-1 text-center font-normal'>Mobile number</h1> */}
          <h1 className='mt-1 text-center font-normal'>{currentUser?.email}</h1>
          {/* <h2 className='mt-3 mb-8 text-center text-xs text-gray-400'>Member since: {new Date(currentUser?.createdTime).toLocaleString()}</h2>  */}

          <Button className="w-full my-5" 
          onClick={getProfileEditPage}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>

          </SidebarInset>
        </SidebarProvider>
      </>
   

      <Footer />
    </div>
  );
};



export default UserProfile