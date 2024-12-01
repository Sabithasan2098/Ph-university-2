import { catchAsync } from "../../utils/catchAsync";
import { createEnrolledCourseIntoDB } from "./enrolledCourse.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEnrolledCourse = catchAsync(async (req: any) => {
  const userId = req.user.userId;
  return await createEnrolledCourseIntoDB(userId, req.body);
}, "Create enrolled course successfully");
