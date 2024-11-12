import { AdminModelSchema } from "./admin.model";

// get all admin--------->
export const getAllAdminIntoDB = async () => {
  const result = await AdminModelSchema.find();
  return result;
};

// get single admin------------>
export const getASingleAdminIntoDB = async (id: string) => {
  const result = await AdminModelSchema.findOne({ id });
  return result;
};
