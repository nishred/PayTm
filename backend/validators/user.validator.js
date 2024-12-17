import { z } from "zod";

const registerUserSchema = z
  .object({
    username: z
      .string({
        message: "Username is required",
      })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Please enter a valid email",
      }),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
    }),
  })
  .strict();

export { registerUserSchema };
