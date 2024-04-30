import { z } from "zod";

const loginValidation = z
  .object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email(),
    password: z.string({
      required_error: "Password is required",
    }),
  })
  .strict();

export default loginValidation;