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

const changePassword = () => {
    return (
        <div className="bg-green-50">
        <Header />
        <>
        <SidebarProvider>
            <UserSidebar />
            <SidebarInset className="bg-green-50">
           
    
    
            </SidebarInset>
          </SidebarProvider>
        </>
     
    
        <Footer />
      </div>
      )
}

export default changePassword