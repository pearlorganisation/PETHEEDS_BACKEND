import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import auth from "../models/auth.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { saveAccessTokenToCookie } from "../utils/other.js";

// @desc -creating new user
// @route - POST api/v1/auth/signup
export const signup = asyncHandler(async (req, res, next) => {
  const { password } = req?.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newData = new auth({ ...req?.body, password: hashedPassword });
  const savedData = await newData.save();
  res
    .status(201)
    .json({ status: true, message: "Created successfully!!", newData });
});

// @desc -user login
// @route - POST api/v1/auth/login
export const login = asyncHandler(async (req, res, next) => {
  const { username, email, password, type } = req?.body;
  const isDataExists = await auth.findOne({ $or: [{ email }, { username }] });
  if (!isDataExists) return next(new errorResponse("No user found!!", 400));
  if (type === "Admin" && isDataExists?.role != "Admin") {
    return next(
      new errorResponse("Only admin can logg in in admin panel!!", 400)
    );
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    isDataExists?.password
  );
  if (!isPasswordValid)
    return next(new errorResponse("Wrong password!! please try again", 400));

  // @@Desc-Json web token section and saving it in cookies----
  const accessToken = jwt.sign(
    { userId: isDataExists?._id, email: isDataExists?.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_VALIDITY }
  );

  saveAccessTokenToCookie(isDataExists?.role, res, accessToken);

  res.status(200).json({ status: true, message: "Logged in successfully!!" });
});
