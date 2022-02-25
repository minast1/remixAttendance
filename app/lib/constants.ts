import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { Student } from "@prisma/client";



export const levels = ["L100", "L200", "L300", "L400"] as const;
export const semesters = ["FIRST", "SECOND"] as const;
export const sessions = ["MORNING", "EVENING", "WEEKEND"] as const;
const groups = ["ONE", "TWO", "THREE", "FOUR"] as const;

export const courseValidator = withZod(
  z.object({
    id: z.string().optional(),
    name: z.string().nonempty("Course name is required"),
      code: z.string().nonempty("Course code is required"),
      level: z.enum(levels),
      semester: z.enum(semesters)
  })
);

export const studentValidator = withZod(
  z.object({
    indexnumber: z.string().nonempty({message: "Please Enter a Valid Index Number"})
   })
)

export const studentSignUpValidator = withZod(
  z.object({
    name : z.string().nonempty({message: "Name Field is Required"}),
    indexnumber: z.string().length(8, { message: "Index Number must be 8 digits long" }),
    level: z.enum(levels),
    session: z.enum(sessions),
    group: z.enum(groups),
  })
)

export const serializeFormData = (formData: FormData):Omit<Student, "id" | "createdAt"> => {
  let data: any = {};

  formData.forEach((value, key) => (data[key] = value));
  
  const { __rvfInternalFormId, ...rest } = data;
  return rest
  
}


