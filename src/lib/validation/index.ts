import * as z from "zod";

export const SignUpValidationSchema = z.object({
  username: z.string().min(2, { message: "Too short" }).max(50),
  name: z.string().min(2, { message: "Too short" }).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password must be atleast 8 characters" }),
});
