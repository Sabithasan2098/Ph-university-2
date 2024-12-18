import { model, Schema } from "mongoose";
import { FacultyModel, TFaculty, TUser } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";

const userNameSchema = new Schema<TUser>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, "Id is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "user",
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: `{VALUE} is not a valid gender`,
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: `{VALUE} is not a valid blood group`,
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    profileImg: {
      type: String,
      default: "",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Department id is required"],
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic faculty id is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// searching isDeleted=true in all faculty data------------>
facultySchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// --------------------------------------------------------

// get the full name of faculty--------------->
facultySchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// is faculty exists purpose---------------------------------->
// Define the static method `isUserExists` on the schema's `statics`
facultySchema.statics.isUserExists = async function (id: string) {
  return await this.findOne({ id });
};
// export const FacultyModelSchema = model<TFaculty>(
//   "Faculty",
//   facultySchema,
// );

export const FacultyModelSchema = model<TFaculty, FacultyModel>(
  "Faculty",
  facultySchema,
);
// ----------------------------------------------------------------//
