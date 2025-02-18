import { z } from "zod";

export const FPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type TFPasswordSchema = z.infer<typeof FPasswordSchema>;