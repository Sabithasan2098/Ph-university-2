import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { appError } from "../../error/custom.appError";

export const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  { timestamps: true },
);

// don't repeat department name
academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExists = await academicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new appError(400, "Department already exists");
  }
  next();
});

// is department exists
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await academicDepartmentModel.findOne(query);
  if (!isDepartmentExists) {
    throw new appError(404, "Department is not exists");
  }
  next();
});

// model
export const academicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
