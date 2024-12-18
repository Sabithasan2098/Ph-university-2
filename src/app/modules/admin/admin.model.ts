import { model, Schema } from "mongoose";
import { AdminModel, TAdmin, TUser } from "./admin.interface";
import { BloodGroup, Gender } from "./admin.constant";

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

const adminSchema = new Schema<TAdmin>(
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

// searching isDeleted=true in all admin data------------>
adminSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// --------------------------------------------------------

// get the full name of admin--------------->
adminSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// isUserExists----------------------->
adminSchema.statics.isUserExists = async function (id: string) {
  return await this.findOne({ id });
};

export const AdminModelSchema = model<TAdmin, AdminModel>("Admin", adminSchema);
