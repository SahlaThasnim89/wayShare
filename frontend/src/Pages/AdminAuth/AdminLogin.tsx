import { Header, Footer, GreenButton, InputField } from "../../components/index";
import Image from "../../assets/login-img.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm,SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { selectUser,login } from "@/features/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { loginSchema,TloginSchema } from "@/lib/LoginTypes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


const AdminLogin = () => {

  const {
    register,
    handleSubmit,
    formState:{errors,isSubmitting},
    setError
  }=useForm<TloginSchema>({resolver:zodResolver(loginSchema)})

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const user=useSelector(selectUser)

  useEffect(()=>{
    if(user){
      navigate('/admin/Dashboard')
    }
  },[navigate,user])


  
const onSubmit:SubmitHandler<TloginSchema>=async(data)=>{
  try {    
    const res=await axios.post('/api/admin/login',data)
    
    if(res.data.errors){
      const errors=res.data.errors;
    
      if(errors.email){
        setError('email',{
          type:'server',
          message:errors.email,
        })
      }else if(errors.password){
          setError('password',{
            type:'server',
            message:errors.password,
          })
        }else{
          toast.error('something went wrong');
          
        }
      }else{
        // await loginApiCall({email:res.data.email,password:res.data.password}).unwrap()
        toast.success('successfully logged in')        
        dispatch(login({
          name:res.data.name,
          email:res.data.email,
          loggedIn:true,
        }))        
      }
    }
    
    
   catch (error) {
    setError("root", {
      message: "This email is already taken",
    });
    toast("This email is already taken");
  }
}


const errHandler=(e:any)=>{
  Object.values(e).reverse().forEach(e=>{
    toast.error("sign up failed",{
      description:e.message as string
    })
  })
  
}







  return (
    <div>
      <Header />
      <div className="bg-green-50 place-items-center">
        <div className="flex flex-row py-10">
          <div className="w-3/4">
            <h1 className="text-center font-bold pb-11 text-2xl">
              Login to Admin panel
            </h1>
            
            <form onSubmit={handleSubmit(onSubmit,errHandler)} className="flex flex-col gap-4">
              <InputField
                label="Email"
                type="email"
                id="email"
                defaultValue='AdminSahla@gmail.com'
                className="border border-green-600 rounded px-2 py-1"
                {...register('email')}
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                defaultValue='AdminSahla'
                className="border border-green-600 rounded px-2 py-1"
                {...register('password')}
              />

              <GreenButton type='submit'>Login</GreenButton>

            </form>
          </div>
          <div>
            <img className="mt-40 pl-30" src={Image} alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;
