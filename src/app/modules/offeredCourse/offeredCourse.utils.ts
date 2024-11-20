import { TSchedule } from "./offeredCourse.interface";

export const timeConflict = (
  assignSchedule: TSchedule[],
  newSchedule: TSchedule,
): boolean => {
  for (const schedule of assignSchedule) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    // Check for time conflict
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true; // Conflict found
    }
  }

  return false; // No conflict found
};
