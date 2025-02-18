import { sendMail } from "../utils/sendMail.js";
import { sendOrderMail } from "../utils/sendOrderMail.js";
import auth from "../models/auth.js";
import otpModel from "../models/otp.js";
import { generateOtp } from "../utils/other.js";
import { asyncHandler } from "../utils/asyncHandler.js";
 
import errorResponse from "../utils/errorResponse.js";
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();
// -----------------------------------------------------------------------------------------------------------

// @desc - to send the otp to the specified email
// @route - POST /mail/sendOtp
// @access - PUBLIC

export const signupSendOtp = async (req, res) => {
  try {
    console.log(req.body);
    const { email,phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Email Or Phone Number is required field !!" });
    }

    // currentDate - holds the current date
    const currentDate = new Date();

    // deleting the expired otp
    await otpModel.deleteMany(
      { expiresAt: { $lt: currentDate } },
      {
        type: "SIGNUP",
      }
    );

    const user = await auth.findOne({ $or:[{email},{phoneNumber}]});

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists!" });
    }

    // otp - generating random otp
    const otp = generateOtp();
     
   if(email)
   {
    sendMail(email, otp)
      .then(async () => {
        const otpDoc = await otpModel.findOneAndUpdate(
          { email, type: "SIGNUP" },
          { otp, expiresAt: new Date(Date.now() + 300000) },
          { $new: true }
        );

        if (!otpDoc) {
          let doc = new otpModel({
            email,
            type: "SIGNUP",
            otp,
            expiresAt: new Date(Date.now() + 300000), //expiry time of otp 5mins
          });

          await doc.save().then(() => {
            return res
              .status(200)
              .json({ success: true, message: "OTP sent successfully" });
          });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "OTP sent successfully" });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: `Unable to send mail! ${error.message}`,
        });
      });
   }
   else{
     const response = await axios.get(`${process.env.SMS_URL}?authorization=${process.env.SMS_SECRET_KEY}&numbers=${phoneNumber}&route=otp&variables_values=${otp}&flash=0&schedule_time=`,{

     });

     if(response?.data)
     {
      const otpDoc = await otpModel.findOneAndUpdate(
        { phoneNumber, type: "SIGNUP" },
        { otp, expiresAt: new Date(Date.now() + 300000) },
        { $new: true }
      );

      if (!otpDoc) {
        let doc = new otpModel({
          phoneNumber,
          type: "SIGNUP",
          otp,
          expiresAt: new Date(Date.now() + 300000), //expiry time of otp 5mins
        });

        await doc.save().then(() => {
          return res
            .status(200)
            .json({ success: true, message: "OTP sent successfully to your Cellphone !!" });
        });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "OTP sent successfully to your Cellphone !!" });
      } 
    }
   }



  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
export const sendOtp = async (req, res) => {
  try {
    const { email , phoneNumber } = req.body;

    if (!email||!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Email/Phone Number is required" });
    }

    // currentDate - holds the current date
    const currentDate = new Date();

    // deleting the expired otp
    await otpModel.deleteMany(
      { expiresAt: { $lt: currentDate } },
      {
        type: "FORGOTPASSWORD",
      }
    );

    const user = await auth.findOne({ $or:[{email},{phoneNumber}] });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "This mail does not exists" });
    }

    // otp - generating random otp
    const otp = generateOtp();
    
    if(email)
    {
      sendMail(email, otp)
      .then(async () => {
        const otpDoc = await otpModel.findOneAndUpdate(
          { email, type: "FORGOTPASSWORD" },
          { otp, expiresAt: new Date(Date.now() + 300000) },
          { $new: true }
        );

        if (!otpDoc) {
          let doc = new otpModel({
            email,
            type: "FORGOTPASSWORD",
            otp,
            expiresAt: new Date(Date.now() + 300000), //expiry time of otp 5mins
          });

          doc.save().then(() => {
            return res
              .status(200)
              .json({ success: true, message: "OTP sent successfully" });
          });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "OTP sent successfully" });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: `Unable to send mail! ${error.message}`,
        });
      });
    }
    else{
      const res = await axios.get(`${process.env.SMS_URL}?authorization=${process.env.SMS_SECRET_KEY}&numbers=${phoneNumber}&route=otp&variables_values=${otp}&flash=0&schedule_time=`,{
 
      });
 
      if(res?.data)
      {
        const otpDoc = await otpModel.findOneAndUpdate(
          { email, type: "FORGOTPASSWORD" },
          { otp, expiresAt: new Date(Date.now() + 300000) },
          { $new: true }
        );

        if (!otpDoc) {
          let doc = new otpModel({
            email,
            type: "FORGOTPASSWORD",
            otp,
            expiresAt: new Date(Date.now() + 300000), //expiry time of otp 5mins
          });

          doc.save().then(() => {
            return res
              .status(200)
              .json({ success: true, message: "OTP sent successfully" });
          });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "OTP sent successfully" });
        }
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, email,phoneNumber } = req.body;

    if (!email&&!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Bad Request! Email Or Phone Number is required" });
    }

    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "Bad Request! OTP is required" });
    }

    const otpDoc = await otpModel.findOne({otp}).lean();

    if (!otpDoc) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is Incorrect" });
    }

    // currentDate - holds the current date
    const currentDate = new Date();

    const otpExpiryDate = otpDoc.expiresAt;

    if (currentDate > otpExpiryDate) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is expired" });
    }

    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

export const OrderMail = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;
 
  const { paymentType, createdAt, amount, email ,phoneNumber } = req?.body;

  // date conversion of createdAt
  let date = "";
  try {
    const dateParts = createdAt.split("T")[0].split("-"); // Split date part and then split by hyphen
    date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Rearrange to 'dd-mm-yyyy'
  } catch (error) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  sendOrderMail(email, id, amount, date, paymentType)
  res.status(200).json({
    status: true,
    message: "Mail Sent Successfully",
  });
});
