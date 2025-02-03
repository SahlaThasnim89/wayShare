import { z } from "zod";

export const ProfileSchema=z.object({
    name:z.string().optional(),
    password:z.string().optional().refine((val)=>!val||val.length>=6,{
      message:'Password must contain 6 charecters'}),
    confirmPassword:z.string().optional(),
  }).refine((data:any)=>{
    if(data.password){
      return data.password===data.confirmPassword
    }
    return true
  }
    ,{
    message:"password must match",
    path:["confirmPassword"]
  })

  export type TProfileSchema=z.infer<typeof ProfileSchema>;