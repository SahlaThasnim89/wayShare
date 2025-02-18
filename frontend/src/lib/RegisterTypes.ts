import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
    .string()
    .min(1, { message: "Full name is required" }) 
    .trim() 
    .refine((value) => value.length > 0, { message: "Full name cannot be only spaces" }), 

    email: z.string().email({ message: "Invalid email address" }),
    mobile: z
      .string()
      .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;

  

