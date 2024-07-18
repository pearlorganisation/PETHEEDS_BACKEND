import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import auth from "../models/auth.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import {saveAccessTokenToCookie } from "../utils/other.js";



// @desc -creating new user
// @route - POST api/v1/auth/signup
export const signup = asyncHandler(async (req, res, next) => {
  const {email,password } = req?.body;

  const isDublicateEmail = await auth.findOne({ email });
  if (isDublicateEmail)
    return next(new errorResponse("User already exists!", 400));
 

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newData = new auth({ ...req?.body, password: hashedPassword });
  const savedData = await newData.save();
  res
    .status(201)
    .json({ status: true, message: "Created successfully!!", newData });
});

// @desc -user login
// @route - POST api/v1/auth/login


export const login = asyncHandler(async (req, res, next) => {
  const { email, password, type } = req?.body;
  const isDataExists = await auth.findOne({ email });

  if (!isDataExists) return next(new errorResponse("No user found!!", 400));
  if (type === "Admin" && isDataExists?.role != "Admin") {
    return next(
      new errorResponse("Only admin can log in this admin panel!!", 400)
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

  saveAccessTokenToCookie(res, accessToken);

  res.status(200).json({ status: true, data:isDataExists, message: "Logged in successfully!!" });
});

// @desc -user logout
// @route - POST api/v1/auth/logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("ACCESS_TOKEN_PETHEEDS");


    res.status(200).json({
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error!${error.message}`,
    });
  }
};


// Get all users For admin Panel
export const getAllUsers = async (req, res) => {
  try {
    const data = await auth.find();
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

// @desc - delete existing user
// @route - DELETE api/v1/user/:id
export const deleteUser = asyncHandler(async (req, res, next) => {
  const isValidId = await auth.findByIdAndDelete(req?.params?.id);
  if (!isValidId) return next(new errorResponse("No data found!!", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

export const resetPassword = async(req,res)=>{
  try {
    
      const { email, password, confirmPassword } = req.body;

      const user = await auth.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exists" });
    }


    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password does not match" });
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);

    await auth.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { $new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Password Updated Successfully" });


  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }

  }

  export const refreshToken = asyncHandler(async (req, res, next) => {
    const { email} = req?.body;
    const isDataExists = await auth.findOne({ email });
  
    const accessToken = jwt.sign(
      { email: isDataExists?.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_REFRESHTOKENVALIDITY }
    );
    if(!accessToken)
  
    saveAccessTokenToCookie(res, accessToken);

    res.status(200).json({ status: true, message: "Refresh token successfully!!" });
  });