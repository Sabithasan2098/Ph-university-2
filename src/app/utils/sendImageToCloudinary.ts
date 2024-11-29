import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
): Promise<{
  secure_url: string;
  url: string;
  public_id: string;
  [key: string]: unknown; // Extra fields for flexibility
}> => {
  cloudinary.config({
    cloud_name: "dlg6l7hv6",
    api_key: "839311665954828",
    api_secret: "v0Fi5owLMBUNX2W45tfbQXg3hrs",
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        // আপলোড সফল হলে ফাইল ডিলিট করুন
        fs.unlink(path, (unlinkErr) => {
          if (unlinkErr) {
            console.error("File deletion failed:", unlinkErr.message);
          } else {
            console.log("File deleted successfully.");
          }
        });

        return resolve(
          result as {
            secure_url: string;
            url: string;
            public_id: string;
          },
        );
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uplods/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
