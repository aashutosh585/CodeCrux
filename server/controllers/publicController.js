import sheetModel from "../models/sheetModel.js";
import tutorialModel from "../models/tutorialModel.js";

// Public routes - accessible to all users

export const getPublicSheets = async (req, res) => {
  try {
    const sheets = await sheetModel.find();
    res.json({ success: true, sheets });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const getPublicTutorials = async (req, res) => {
  try {
    const tutorials = await tutorialModel.find();
    res.json({ success: true, tutorials });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};