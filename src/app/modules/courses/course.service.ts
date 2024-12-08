import { appError } from "../../error/custom.appError";
import { TCourse, TCourseFaculty } from "./course.interface";
import { CourseFacultyModel, CourseModel } from "./course.model";

// create course------------------------------------->
export const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

// get all course------------------------------------->
export const getAllCourseIntoDB = async (query: Record<string, unknown>) => {
  try {
    // create searchable field--------------->
    const searchAbleField = ["title", "prefix", "code", "credits"];

    // সার্চ টার্ম সেটআপ করা----------------------------->
    //ata partial search
    const searchTerm = query.searchTerm ? (query.searchTerm as string) : "";

    // সার্চ কন্ডিশন তৈরি করা----------------------------->
    const searchQuery =
      searchTerm.trim() !== ""
        ? {
            $or: searchAbleField.map((field) => ({
              [field]: { $regex: searchTerm, $options: "i" },
            })),
          }
        : {};

    // create sort method------------------------------>
    const sortBy = query.sortBy ? (query.sortBy as string) : "credits";
    const sortOrder = query.sortOrder === "desc" ? -1 : 1;
    // http://localhost:5000/api/v1/students/get-all-course-data?sortBy=credits&sortOrder=desc   //you have use this to sort

    //   set limit & pagination-------------------------->
    const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const skip = (page - 1) * limit;

    //field limiting----------------------------------->
    const fields = query.fields
      ? (query.fields as string).replace(/,/g, " ")
      : " ";

    // query filtering--------------------------------->
    const queryObj = { ...query };
    const excludeFields = [
      "searchTerm",
      "sortBy",
      "sortOrder",
      "fields",
      "limit",
      "page",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    //   combine filter condition---------------------->
    const filterCondition = {
      ...searchQuery,
      ...queryObj,
    };

    const result = await CourseModel.find(filterCondition)
      .select(fields)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new appError(400, "Faield to find, Please try again");
  }
};

// get single course------------------------------------->
export const getSingleCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};

// update course------------------------------------->
export const deleteCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

// update course------------------------------------->
export const updateCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const session = await CourseModel.startSession();
  session.startTransaction();
  try {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    // update basic
    const updateBasicCourseData = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseData) {
      throw new appError(400, "faield to update course data ");
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // check isDeleted = true & remove from database

      const deletedPreRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new appError(400, "faield to update course data ");
      }
      // check isDeleted = false & add to database
      // prevent duplicates
      const existingCourseIds = (
        await CourseModel.findById(id, { preRequisiteCourses: 1 })
      )?.preRequisiteCourses
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => item.course.toString());

      const newPrerequisite = preRequisiteCourses?.filter(
        (el) =>
          el.course &&
          !el.isDeleted &&
          !existingCourseIds?.includes(el.course.toString()),
      );
      if (newPrerequisite.length > 0) {
        const newPrerequisiteCourses = await CourseModel.findByIdAndUpdate(
          id,
          {
            $addToSet: { preRequisiteCourses: { $each: newPrerequisite } },
          },
          { new: true, runValidators: true, session },
        );

        if (!newPrerequisiteCourses) {
          throw new appError(400, "faield to update course data ");
        }
      }
    }

    const result = await CourseModel.findById(id).populate(
      "preRequisiteCourses.course",
    );
    await session.commitTransaction();
    await session.endSession();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(400, "faield to update course data ");
  }
};

// add faculties into course----------------------->
export const assignFacultiesInCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};

// get assign faculties into course----------------------->
export const getAssignFacultiesInCourseIntoDB = async (id: string) => {
  const result = await CourseFacultyModel.findOne({ course: id })
    .populate("faculties")
    .populate("course");
  if (!result) {
    throw new appError(400, "Invalid course id");
  }
  return result;
};

// remove faculties into course----------------------->
export const removeFacultiesInCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true },
  );
  return result;
};
