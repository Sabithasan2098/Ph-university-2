import { TAcademicSemesterCode, TAcademicSemesterMonth, TAcademicSemesterName, TAcademicSemesterNameCodeMapper } from "./academicSemester.interface";

export const Month: TAcademicSemesterMonth[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  export const Name: TAcademicSemesterName[] = ["Autumn", "Summer", "Fall"];
  export const Code: TAcademicSemesterCode[] = ["01", "02", "03"];

  export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    Fall: "02",
    Summer: "03",
  };