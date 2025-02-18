import { z } from "zod";

export const ProfileSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Full name is required" })
      .trim()
      .refine((value) => value.length > 0, {
        message: "Full name cannot be only spaces",
      })
      .optional(),
    mobile: z
      .string()
      .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
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
  );

export type TProfileSchema = z.infer<typeof ProfileSchema>;
