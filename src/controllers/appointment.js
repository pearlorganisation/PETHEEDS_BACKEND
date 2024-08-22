// import { asyncHandler } from "../utils/asyncHandler.js";
// import errorResponse from "../utils/errorResponse.js";
import appointment from "../models/appointment.js";

// @desc - new appointment
// @route - POST api/v1/appointment
export const newAppointment = async (req, res) => {
  try {
    const newDoc = new appointment({ ...req?.body });
    const data = await newDoc.save();
    res
      .status(201)
      .json({ status: true, message: "Created Successfully", data });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message || "Internal Server error",
    });
  }
};

// @desc - view appointment
// @route - GET api/v1/appointment
export const getAllAppointments = async (req, res) => {
  try {
    const data = await appointment.find().sort({createdAt:-1}).populate("subject");
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

// @desc - delete existing appointment
// @route - DELETE api/v1/appointment/:id

export const deleteAppointment = async (req, res) => {
  try {
    const isValidId = await appointment.findByIdAndDelete(req?.params?.id);
    if (!isValidId) {
      return res
        .status(404)
        .json({ status: false, message: "appointment not found" });
    }
    res.status(200).json({ status: true, message: "Deleted successfully!!" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};
