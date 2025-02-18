import axios from "axios";

const applyToDrive = async (data: any) => {
    try {
      const response = await axios.post("/api/applyToDrive", data);
      return response.data; 
    } catch (error: any) {
      throw new Error(error.message || "There was an error processing your request.");
    }
  };

  export {
    applyToDrive,
    // blockUser
  }