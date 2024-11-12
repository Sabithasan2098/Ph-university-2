import { TAdmin } from "./admin.interface";
import { AdminModelSchema } from "./admin.model";

export const createAdminIntoDB = async (payload: TAdmin) => {
  const result = await AdminModelSchema.create(payload);
  return result;
};
