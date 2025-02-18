import axios from 'axios'
import { toast } from 'sonner';




const register = async (data: any) => {
  try {
    const res = await axios.post("/api/register", data);
    return res.data; 
  } catch (error: any) {
    throw new Error(error.message || "There was an error processing your request.");
  }
};



const getUserProfile = async () => {
  try {
    console.log('jkkjljl')
    const res = await axios.get("/api/Profile");
    console.log(res.data,'uiuiuiu')
    return res.data;  
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching user data");
  }
};

const updateUser = async (data: any) => {
  try {
    console.log("Updating user with data:", data);
    const res = await axios.put("/api/Profile", data);

    if (res.data.errors) {
      toast.error("Something went wrong");
      return null;
    } else {
      return res.data;
    }
  } catch (error: any) {
    console.log(error.message);
    toast.error("Update request failed.");
    return null;
  }
};

   export {
    getUserProfile,
    updateUser,
    register,
}