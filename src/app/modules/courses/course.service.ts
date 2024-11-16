import { appError } from "../../error/custom.appError";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

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
