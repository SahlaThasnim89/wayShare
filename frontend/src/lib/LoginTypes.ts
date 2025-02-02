import {z} from 'zod';


export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6,'Password must contain 6 charecters'),
  })
  
  export type TloginSchema=z.infer<typeof loginSchema>;
