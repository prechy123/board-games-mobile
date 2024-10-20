import { z } from "zod";

export const emailSchema = z.string().email();

export const passwordSchema = z
  .string()
  .min(5, { message: "Password is too short" })
  .max(20, { message: "password is too long" })
  .regex(/\d/, { message: "Password must contain at least one digit" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  });
