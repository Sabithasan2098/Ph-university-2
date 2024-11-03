import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { Code, Month, Name } from "./academicSemester.constant";
import { appError } from "../../error/custom.appError";

export const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
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
    timestamps: true,
  },
);

// checking to the collection is the same semester in one year is already create or not------------------------------>
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await academicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new appError(400, "Semester is already exists");
  }
  next();
});
// ----------------------------------------------------------------------------------------------------------------->

export const academicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
