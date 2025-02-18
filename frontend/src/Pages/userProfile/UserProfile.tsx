import { Header, Footer, ProfileCard } from "../../components/index";
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

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@/assets";
import { MdNavigateNext } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TiTick } from "react-icons/ti";
import { ProfileSchema, TProfileSchema } from "@/lib/ProfileTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getUserProfile, updateUser } from "@/API/user";

const UserProfile = () => {
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

  const [currentUser, setCurrentUser] = useState(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(true);
  const [showMobileModal, setShowMobileModal] = useState(true);
  const [showNameModal, setShowNameModal] = useState(true);




  const [userInfo, setUserInfo] = useState({
    name: "",
    mobile: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        name: currentUser.name || "",
        mobile: currentUser.mobile || "",
        image: currentUser.image || "",
      });
    }
  }, [currentUser]);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/Profile");
      const userProfile = res.data;
      setCurrentUser(userProfile);
    } catch (error: any) {
      console.log("Error fetching user data", error);
      toast(error.message);
    }
  };

  // const saveProfileChanges = async (data: TProfileSchema) => {
  //   try {
  //     const res = await axios.put("/api/Profile", data);
  //     setCurrentUser(res.data);
  //     toast.success("Profile updated successfully!");
  //   } catch (error) {
  //     toast.error("Failed to update profile!");
  //   }
  // };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const saveNameChange = async (data: { name: TProfileSchema["name"] }) => {
    try {
      const updatedProfile = await axios.put("/api/Profile", {
        name: data.name,
      });
      console.log(updatedProfile, "updatedProfile");
      setCurrentUser(updatedProfile.data);
      setShowNameModal(false); 
      toast.success("Name updated successfully!");
    } catch (error) {
      toast.error("Failed to update name!");
    }
  };

  const saveMobileChange = async (data: { mobile: TProfileSchema["mobile"] }) => {
    try {
      const updatedProfile = await axios.put("/api/Profile", {
        mobile: data.mobile,
      });
      console.log(updatedProfile, "updatedProfile");
      setCurrentUser(updatedProfile.data);
      setShowMobileModal(false); 
      toast.success("Mobile number updated successfully!");
    } catch (error) {
      toast.error("Failed to update mobile number!");
    }
  };

  const saveImageToBackend = async () => {
    if (imageFile) {
      const img = new FormData();
      img.append("file", imageFile);
      img.append("upload_preset", "chat-app");

      try {
        const ImageRes = await fetch(
          "https://api.cloudinary.com/v1_1/piyushproj/image/upload",
          {
            method: "POST",
            body: img,
          }
        );

        const imageUploadResult = await ImageRes.json();

        if (imageUploadResult.url) {
          const imageUrl = imageUploadResult.url;
          setCurrentUser((prevUser: any) => ({
            ...prevUser,
            image: imageUrl,
          }));
          // toast.success("Profile image updated successfully!");
          try {
            const updatedProfile = await axios.put("/api/Profile", {
              image: imageUrl,
            });

            console.log("Profile updated:", updatedProfile.data);
            setShowButton(false); 
            toast.success("Profile image updated successfully!");
          } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile!");
          }
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to update profile image!");
      }
    } else {
      toast.error("No image selected!");
    }
  };

  return (
    <div className="bg-green-50">
      <Header />
      <>
        <SidebarProvider>
          <UserSidebar />
          <SidebarInset className="bg-green-50 justify-start">
            <div className="m-6 bg-white p-4 border-2 border-green-100 w-3/6">
              <h1 className="text-3xl font-semibold mt-1">Account Info</h1>
              <div className="flex mb-4 flex-col">
                {imagePreview || currentUser?.image ? (
                  <img
                    className="h-28 w-28 mt-3 object-cover"
                    src={imagePreview || currentUser?.image}
                  />
                ) : (
                  <img src={User} alt="" className="h-28 w-28 mt-3" />
                )}
                <div className="text-sm my-2 text-green-600 font-bold cursor-pointer flex items-center gap-2">
                  <label htmlFor="imgUpload">Change Profile Image</label>
                  {imagePreview && showButton && (
                    <span className="text-black">
                      <TiTick
                        onClick={saveImageToBackend}
                        className="h-4 w-4 text-white bg-black rounded-md cursor-pointer"
                      />
                    </span>
                  )}
                  <input
                    accept="image/*"
                    onChange={handleImageChange}
                    type="file"
                    id="imgUpload"
                    className="hidden"
                  />
                </div>
                {/* )} */}
              </div>

              <div className="max-w-xl w-[64rem] my-2">
                <h1 className="text-xl font-medium mb-4">Basic Info</h1>
                <div className="text-md border-b-2 my-3">
                  Full Name
                  <div className="flex flex-row justify-between">
                    <p className="text-xl my-2 font-bold">
                      {currentUser?.name}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <MdNavigateNext className="h-5 w-5" />
                      </DialogTrigger>
                    {showNameModal &&(
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Name</DialogTitle>
                          <DialogDescription>
                            Make changes to your User Name. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name">Username</Label>
                            <Input
                              id="name"
                              defaultValue={currentUser?.name}
                              onChange={handleInputChange}
                              className="col-span-3"
                              {...register("name")}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-600 text-sm">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <DialogFooter>
                          <Button onClick={handleSubmit(saveNameChange)}>
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                     )} 
                    </Dialog>
                  </div>
                </div>
                <div className="text-md border-b-2 my-3">
                  Mobile Number
                  <div className="flex flex-row justify-between">
                    <p className="text-xl my-2 font-bold">
                      {currentUser?.mobile}
                    </p>
                   
                    <Dialog>
                      <DialogTrigger asChild>
                        <MdNavigateNext className="h-5 w-5" />
                      </DialogTrigger>
                        {showMobileModal &&(
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Mobile Number</DialogTitle>
                          <DialogDescription>
                            Make changes to your Mobile Number. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input
                              id="mobile"
                              defaultValue={currentUser?.mobile}
                              onChange={handleInputChange}
                              className="col-span-3"
                              {...register("mobile")}
                            />
                          </div>
                          {errors.mobile && (
                            <p className="text-red-600 text-sm">
                              {errors.mobile.message}
                            </p>
                          )}
                        </div>
                        <DialogFooter>
                          <Button onClick={handleSubmit(saveMobileChange)}>
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                         )}
                    </Dialog>
                  
                  </div>
                </div>
                <div className="text-md my-2">
                  Email
                  <div className="flex flex-row justify-between">
                    <p className="text-xl my-2 font-bold">
                      {currentUser?.email}
                    </p>
                  </div>
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

export default UserProfile;
