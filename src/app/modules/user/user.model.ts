import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    changePassword: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "student", "faculty"],
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ["in-progress", "blocked"],
      },
      default: "in-progress",
    },
  },
  {
    timestamps: true,
  },
);

// mongoose pre hook middleware---------------------------->
// data save houar age password hash kore debe
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});

// mongoose post hook middleware--------------------------->
// after the save password filed goes empty
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const userModelSchema = model<TUser>("user", userSchema);
