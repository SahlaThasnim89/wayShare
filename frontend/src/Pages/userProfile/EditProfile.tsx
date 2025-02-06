

// import React, { useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { SubmitHandler, useForm } from 'react-hook-form';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { login, selectUser } from '@/features/userSlice';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { CircleUser, Loader } from 'lucide-react';
// import { toast } from 'sonner';
// import { ProfileSchema,TProfileSchema } from '@/lib/ProfileTypes';
// import { Header, Footer,ProfileCard, InputField } from "../../components/index";
// import { Link, useNavigate } from "react-router-dom";
// import { UserSidebar } from "@/components/user-sidebar";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";






// const EditProfile = () => {
//   const {register,
//     handleSubmit,
//     formState:{errors,isSubmitting},
//     // reset,
//     setError,
//   }=useForm<TProfileSchema>({
//     resolver:zodResolver(ProfileSchema),
//   })

//   const user=useSelector(selectUser)

//   const navigate=useNavigate()
//   const dispatch=useDispatch()
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [currentUser, setCurrentUser] = useState(null); 
//   const [imagepreview,setImagePreview]=useState<string|null>(null)

 
//   useEffect(() => {
//     if (user) {
//         getUser();
        
//     }
// }, [user]);

// const getUser = async () => {
//   try {
//       const res = await axios.get('/api/account');
//       const userProfile = res.data;
//       setCurrentUser(userProfile);
//   } catch (error) {
//       console.log('Error fetching user data',error);
      
//   }
// };






// const handleImageChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
//   const file=event.target.files?.[0]
//   if(file){
//     const reader=new FileReader();
//     reader.onloadend=()=>{
//       setImagePreview(reader.result as string)
//       setImageFile(file);
//     };
//     reader.readAsDataURL(file)
//   }
// }



// const onSubmit: SubmitHandler<TProfileSchema> = async (data) => {
//   try {
//     const isNameChanged = data.name && data.name.trim() !== "" && data.name !== currentUser?.name;
//     const isPasswordChanged = data.password && data.password.trim() !== "";
//     const isImageChanged = imageFile !== null;
    
//     if (!isNameChanged && !isPasswordChanged && !isImageChanged) {
//       toast.error("No changes were made!");
//       return; 
//     }

    
//   let imageUrl=null
//   if(imageFile){    
//     const img=new FormData()    
//     img.append("file", imageFile);    
//     img.append("upload_preset", "chat-app");
    
//   // data.append("cloud_name", "piyushproj");
// //   const ImageRes=await fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
//     const ImageRes=await fetch("https://api.cloudinary.com/v1_1/dnfpxezyi/image/upload", {

//     method: "POST",
//     body: img,
//   });
//   const imageUploadResult=await ImageRes.json()
    
// if(imageUploadResult.url){
//   imageUrl=imageUploadResult.url;
// }else{
//   throw new Error('Image upload failed')
// }
//   }

// const profileData={
//   name:data.name||user.name,
//   password:data.password?data.password:undefined,
//   image:imageUrl||user.image,
// }
 
//  console.log(profileData,'profileData');
 
  
//   const res=await axios.put('/api/Profile',profileData)
//     console.log("Profile update response:", res.data);
    
//   if(res.data.errors){
//     const errors=res.data.errors;

//     if(errors.name){
//       setError("name",{
//         type:"server",
//         message:errors.name,
//       })
    
//     }
//     else if(errors.email){
//         setError("email",{
//           type:"server",
//           message:errors.email,
//         })
//     }else if(errors.password){
//       setError("password",{
//         type:"server",
//         message:errors.password,
//       })
//   }else if(errors.confirmPassword){
//     setError("confirmPassword",{
//       type:"server",
//       message:errors.confirmPassword,
//     })

//   }else{
//     toast.error("something went wrong!")
//   }
//   }else{
//     dispatch(login({
//       name:res.data.name,
//       email:res.data.email,
//       image:res.data.image,
//       loggedIn:true,
//     }))
//     toast.success('profile updated successfully')
//     navigate('/Profile')
//     //  throw new Error();
//     //  console.log(data);
//   }
// }
//  catch (e) {
//   setError("root", {
//     message: "This email is already taken",
//   });
//   toast("Some error happened");
// }
// }



//   const errHandler=(e:any)=>{
//     Object.values(e).reverse().forEach(e=>{
//       toast.error("sign up failed",{
//         description:e.message as string
//       })
//     })
    
//   }


//   return (
//     <div>
//           <Card className="mx-auto max-w-md w-[28rem] my-4">
//             <CardHeader>
//             <CardTitle className="text-xl text-center">My Account</CardTitle>
//               <CardDescription className='text-center'>
//               Account Details
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//             <form onSubmit={handleSubmit(onSubmit, errHandler)}>
//             <FormItem>
//               <div className='flex justify-center mb-3'>
//               <label htmlFor="imgUpload">
//                 {imagepreview||currentUser?.image?(
//                   <img className="h-24 w-24 rounded-full object-cover" src={imagepreview||currentUser?.image} />
//                 ):(
//                   <CircleUser className="h-24 w-24" />
//                 )}
//               </label>
//               </div>
//               <FormControl className='hidden'>
//                 <Input accept='image/*' 
//                 onChange={(e)=>{
//                   handleImageChange(e)
//                 }} type='file' hidden id='imgUpload' />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//             <FormItem>
//               <FormLabel htmlFor='name'>Username</FormLabel>
//               <FormControl>
//                 <InputField id="name" defaultValue={currentUser?.name} {...register("name")}/>
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//             <FormItem>
//               <FormLabel htmlFor='email'>Email</FormLabel>
//               <FormControl>
//                 <InputField id="email" defaultValue={currentUser?.email}/>
//               </FormControl>
//               <FormDescription>
//                 This is your public email.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//             <div className='w-full flex flex-row gap-7'>
//             <FormItem>
//               <FormLabel htmlFor='password'>Password</FormLabel>
//               <FormControl>
//                 <InputField id="password" placeholder="New password" {...register("password")}/>
//               </FormControl>
//               <FormDescription>
//                 reset your password? new password here.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//             <FormItem>
//               <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
//               <FormControl>
//                 <InputField id="confirm-password" placeholder="confirm-password" {...register('confirmPassword')}/>
//               </FormControl>
//               <FormDescription>
//                 Re-enter new password.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//             </div>
            
//                 <Button
//                   disabled={isSubmitting}
//                   type="submit"
//                   className="w-full mt-3"
//                 >
//                   Edit Profile
//                 </Button>
//                 {/* {errors.root&&(<div className="text-red-500">{errors.root.message}</div>)} */}
//                 {/* {errors.root&&(toast(errors.root.message))} */}
//             </form>
//             </CardContent>
//      </Card>
//     </div>
//   )
// }

//  export default EditProfile

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, selectUser } from "@/features/userSlice";
import { Input } from "@/components/ui/input";
import { CircleUser } from "lucide-react";
import { toast } from "sonner";
import { ProfileSchema, TProfileSchema } from "@/lib/ProfileTypes";
import { Header, Footer, InputField } from "@/components";
import { useNavigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user-sidebar";



const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileSchema),
  });

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  console.log(currentUser,'currentUser')

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getUser = async () => {
    try {
        console.log(user)
      const res = await axios.get("/api/Profile");
      setCurrentUser(res.data);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: TProfileSchema) => {
    try {
      const isNameChanged =
        data.name && data.name.trim() !== "" && data.name !== currentUser?.name;
      const isPasswordChanged = data.password && data.password.trim() !== "";
      const isImageChanged = imageFile !== null;

      if (!isNameChanged && !isPasswordChanged && !isImageChanged) {
        toast.error("No changes were made!");
        return;
      }

      let imageUrl = null;
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "chat-app");

        const ImageRes = await fetch(
          "https://api.cloudinary.com/v1_1/dnfpxezyi/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const imageUploadResult = await ImageRes.json();
        if (imageUploadResult.secure_url) {
          imageUrl = imageUploadResult.secure_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const profileData = {
        name: data.name || currentUser?.name,
        password: data.password || undefined,
        // image: imageUrl || currentUser?.image,
      };

      const res = await axios.put("/api/Profile", profileData);

      if (res.data.errors) {
        Object.entries(res.data.errors).forEach(([key, message]) => {
          setError(key as keyof TProfileSchema, {
            type: "server",
            message: message as string,
          });
        });
        toast.error("Something went wrong!");
      } else {
        dispatch(
          login({
            name: res.data.name,
            email: res.data.email,
            // image: res.data.image,
            loggedIn: true,
          })
        );
        toast.success("Profile updated successfully");
        navigate("/Profile");
      }
    } catch (e) {
      setError("root", {
        message: "This email is already taken",
      });
      toast.error("Some error happened");
    }
  };

  return (
    <div>
           <Header />
      <>
      <SidebarProvider>
          <UserSidebar />
          <SidebarInset className="bg-green-50">
         
      <Card className="mx-auto max-w-md w-[28rem] my-10">
        <CardHeader>
          <CardTitle className="text-xl text-center">My Account</CardTitle>
          <CardDescription className="text-center">Account Details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Image Upload */}
            <div className="flex justify-center m-6">
              <label htmlFor="imgUpload" className="cursor-pointer">
                {imagePreview || currentUser?.image ? (
                  <img
                    className="h-24 w-24 rounded-full object-cover"
                    src={imagePreview || currentUser?.image}
                  />
                ) : (
                  <CircleUser className="h-24 w-24" />
                )}
              </label>
              <input
                accept="image/*"
                onChange={handleImageChange}
                type="file"
                id="imgUpload"
                className="hidden"
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="name">Username</label>
              <InputField id="name" defaultValue={currentUser?.name} {...register("name")} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email (Read-only) */}
            <div>
              <label htmlFor="email">Email</label>
              <InputField id="email" defaultValue={currentUser?.email} readOnly />
            </div>

            {/* Password Fields */}
            <div className="w-full flex flex-row gap-7">
              <div>
                <label htmlFor="password">Password</label>
                <InputField
                  id="password"
                  placeholder="New password"
                  {...register("password")}
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <InputField
                  id="confirmPassword"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  type="password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button disabled={isSubmitting} type="submit" className="w-full mt-3">
              Edit Profile
            </Button>

            {/* Form Root Error */}
            {errors.root && <p className="text-red-500">{errors.root.message}</p>}
          </form>
        </CardContent>
      </Card>
      </SidebarInset>
        </SidebarProvider>
      </>
   

      <Footer />
    </div>
  );
};

export default EditProfile;



