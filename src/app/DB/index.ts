/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { userModelSchema } from "../modules/user/user.model";

const superUser = {
  id: "SP-0001",
  email: "sabithasan2098@gmail.com",
  password: config.admin_password,
  changePassword: false,
  role: USER_ROLE.superAdmin,
  status: "in-progress",
  isDeleted: false,
};

export const seedSuperAdmin = async () => {
  // when connected to database, we will check is there any user who is superAdmin
  const isSuperAdminExists = await userModelSchema.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminExists) {
    try {
      const result = await userModelSchema.create(superUser);
      console.log({ result });
    } catch (error: any) {
      throw new Error(error);
    }
  }
};
