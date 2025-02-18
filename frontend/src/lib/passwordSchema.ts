import { z } from "zod";

export const PasswordSchema=z.object({
  currentPassword: z
  .string()
  .optional()
  .refine((val) => !val || val.length >= 6, {
    message: "Password must contain 6 charecters",
  }),
  password: z
  .string()
  .optional()
  .refine((val) => !val || val.length >= 6, {
    message: "Password must contain 6 charecters",
  }),
confirmPassword: z.string().optional(),
})
.refine(
(data: any) => {
  if (data.password) {
    return data.password === data.confirmPassword;
  }
  return true;
},
{
  message: "password must match",
  path: ["confirmPassword"],
}
) .refine(
  (data) => !data.password || data.password !== data.currentPassword,
  {
    message: "New password cannot be the same as current password",
    path: ["password"], 
  }
);

  export type TPasswordSchema=z.infer<typeof PasswordSchema>;