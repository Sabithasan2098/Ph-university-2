/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, SortOrder } from "mongoose";

export const handleQuery = async (
  model: Model<any>, // ডাইনামিক মডেল প্যারামিটার
  query: Record<string, unknown>, // ইনকামিং কুয়েরি প্যারামিটার
  searchFields: string[], // সার্চ করার জন্য ফিল্ড লিস্ট
) => {
  // সার্চ টার্ম সেটআপ করা
  const searchTerm = query.searchTerm ? (query.searchTerm as string) : "";

  // সার্চ কন্ডিশন তৈরি করা
  const searchCondition =
    searchTerm.trim() !== ""
      ? {
          $or: searchFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
          })),
        }
      : {};

  // সোর্ট কন্ডিশন তৈরি করা
  const sortBy = query.sortBy ? (query.sortBy as string) : "id";
  const sortOrder = query.sortOrder === "desc" ? -1 : 1;
  const sortCondition: { [key: string]: SortOrder } = { [sortBy]: sortOrder };

  // প্যাজিনেশন সেট করা
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const skip = (page - 1) * limit;

  // ফিল্ড সিলেকশন সেট করা
  const fields = query.fields
    ? (query.fields as string).replace(/,/g, " ")
    : "";

  // ফিল্টার করা কুয়েরি তৈরি
  const excludeFields = [
    "searchTerm",
    "sortBy",
    "sortOrder",
    "limit",
    "page",
    "fields",
  ];
  const filteredQuery = { ...query };
  excludeFields.forEach((field) => delete filteredQuery[field]);

  const filterCondition = {
    ...searchCondition,
    ...filteredQuery,
  };

  // মোট রেজাল্ট সংখ্যা
  const totalResult = await model.countDocuments(filterCondition);

  // মূল ডেটা রিটার্ন
  const result = await model
    .find(filterCondition)
    .select(fields)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  // মেটা ডেটা
  const totalPages = Math.ceil(totalResult / limit);

  return {
    meta: {
      page,
      limit,
      totalResult,
      totalPages,
    },
    data: result,
  };
};
