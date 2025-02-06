import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';



const navigate=useNavigate()



// const register = async (data: any) => {
//     try {
//         console.log('uiuy')
//       navigate('/otp')  
//       const res = await axios.post("/api/register", data);
//       console.log(res.data)
//       localStorage.setItem("email", data.email);
//     } catch (error: any) {
//       console.log(error.message);
//       toast('you may facing network issue, check your connection');
//     }
//   };

//   export {register}