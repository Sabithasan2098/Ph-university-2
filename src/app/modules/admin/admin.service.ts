import { TAdmin } from "./admin.interface";
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

// get a single admin and update---------------->
export const updateSingleAdminIntoDB = async (
  payload: Partial<TAdmin>,
  id: string,
) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingAdminData };

  // for name
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await AdminModelSchema.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
