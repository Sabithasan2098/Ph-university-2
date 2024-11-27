import nodemailer from "nodemailer";
import config from "../config";

export const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: "sabithasan2098@gmail.com",
      pass: "yswy zlum tych bftc",
    },
  });
  await transporter.sendMail({
    from: "sabithasan2098@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Password change kor beta", // Subject line
    text: "Reset your password within 10 minutes", // plain text body
    html: html, // html body
  });
};
