import axios from "axios";
import { toast } from "sonner";



const fetchUsers = async () => {
    try {
      console.log('jghhk')
      const res = await axios.get("/api/admin/UserList");
      console.log(res,'trfuyetuf')
      if (res.data.errors) {
        toast.error("something went wrong");
      } else {
        return res.data;
      }
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const blockUser = async (id, isBlocked) => {
    try {
      const res = await axios.patch(`/api/admin/blockUser/${id}`, {
        isBlocked: !isBlocked,
      });
      return res.data;
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      throw error;
    }
  };

  export {
    fetchUsers,
    blockUser
  }