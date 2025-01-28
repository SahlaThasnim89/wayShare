import { z } from "zod";

export const otpSchema = z
.object({
    otp1: z.number().min(1).max(1),
    otp2: z.number().min(1).max(1),
    otp3: z.number().min(1).max(1),
    otp4: z.number().min(1).max(1),
    otp5: z.number().min(1).max(1),
    otp6: z.number().min(1).max(1),
});