import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

export const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicDepartment" },
  },
  { timestamps: true },
);

export const academicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
