import {
  Header,
  Footer,
  ProfileCard,
  InputField,
} from "../../components/index";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema, TPasswordSchema } from "@/lib/passwordSchema";


const changePassword = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<TPasswordSchema>({ resolver: zodResolver(PasswordSchema) });
  


    const navigate=useNavigate()

  const onSubmit = async (data: any) => {
    try {
      const updatedProfile = await axios.put("/api/Profile", {
        currentPassword: data.currentPassword,
        password:data.password,
      });
        console.log(updatedProfile,'fghdgjg')
        if (updatedProfile.status === 200) {
          toast.success(updatedProfile.data.message || "Password updated successfully!");
          navigate('/Profile')
        } else {
          toast.error("Something went wrong. Please try again.");
        }
    } catch (error: any) {
      console.log(error.message);
      toast('you may facing network issue, check your connection');
    }
  };


  return (
    <div className="bg-green-50">
      <Header />
      <>
        <SidebarProvider>
          <UserSidebar />
          <SidebarInset className="bg-green-50">
            <div className="m-6 bg-white p-4 border-2 border-green-100 w-3/6">
              <h1 className="text-3xl font-semibold mt-1">Change Password</h1>

              <div className="max-w-xl w-[64rem] my-2">
                <h1 className="text-md font-medium mb-4">
                  Set up your new password
                </h1>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <div>
                    <InputField
                      label="current Password"
                      type="password"
                      id="password"
                      placeholder="Enter current password"
                      {...register("currentPassword")}
                      className={`border rounded px-2 py-1 ${
                        errors.currentPassword ? "border-red-600" : "border-green-600"
                      }`}
                    />
            
                    {/* Show error message */}
                     {errors.currentPassword && (
                <p className="text-red-600 text-sm">{errors.currentPassword.message}</p>
              )}
                  </div>
                  <div>
                  <InputField
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    {...register("password")}
                    className={`border rounded px-2 py-1 ${
                      errors.password ? "border-red-600" : "border-green-600"
                    }`}
                  />
          
                  {/* Show error message */}
                   {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
                  </div>
                  <div>
                  <InputField
                    label="Confirm Password"
                    type="password"
                    id="c-password"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                    className={`border rounded px-2 py-1 ${
                      errors.confirmPassword ? "border-red-600" : "border-green-600"
                    }`}
                  />
          
                  {/* Show error message */}
                   {errors.confirmPassword && (
              <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
            )}   
                  </div>
                  <div className="flex justify-start">
                    {/* <Link to="/checkup"> */}
                      <button className="bg-slate-900 px-10 py-3 text-white w:full md:w-auto">
                        Update Password
                      </button>
                    {/* </Link> */}
                  </div>
                </form>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </>

      <Footer />
    </div>
  );
};

export default changePassword;
