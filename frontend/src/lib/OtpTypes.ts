import { z } from "zod";

export const otpSchema = z.object({
  otp1: z.string().min(1, "OTP is required").regex(/^\d$/, "Must be a single digit"),
  otp2: z.string().min(1, "OTP is required").regex(/^\d$/, "Must be a single digit"),
  otp3: z.string().min(1, "OTP is required").regex(/^\d$/, "Must be a single digit"),
  otp4: z.string().min(1, "OTP is required").regex(/^\d$/, "Must be a single digit"),
  otp5: z.string().min(1, "OTP is required").regex(/^\d$/, "Must be a single digit"),
  otp6: z.string().min(1, "OTP is required").regex(/^\d$/, "Must be a single digit"),
});