import { z } from "zod";

export const facultyValidationSchemaZodOnCreate = z.object({
  body: z.object({}),
});
