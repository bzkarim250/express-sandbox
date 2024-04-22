import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRETKEY, { expiresIn: "48h" });
export const verify = (payload) =>
  jwt.verify(payload, process.env.JWT_SECRETKEY);
