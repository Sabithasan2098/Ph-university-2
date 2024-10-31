import { model, Schema } from "mongoose";
import { TAcademicSemester} from "./academicSemester.interface";
import { Code, Month, Name } from "./academicSemester.constant";

export const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: Name,
    required: [true, "Name is required"],
  },
  code: {
    type: String,
    enum: Code,
    required: [true, "Code is required"],
  },
  year: {
    type: String,
  },
  startMonth: {
    type: String,
    enum: Month,
  },
  endMonth: {
    type: String,
    enum: Month,
  },
},
{
  timestamps:true
});

export const academicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
