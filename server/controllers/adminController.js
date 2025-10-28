import sheetModel from "../models/sheetModel.js";
import tutorialModel from "../models/tutorialModel.js";
import userModel from "../models/userModel.js";

// Admin middleware check
const checkAdminAccess = async (userId) => {
  const user = await userModel.findById(userId);
  return user && user.email === "ashutoshmaurya585@gmail.com";
};

// Sheet Controllers
export const getAllSheets = async (req, res) => {
  try {
    const sheets = await sheetModel.find();
    res.json({ success: true, sheets });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const addSheet = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check admin access
    const isAdmin = await checkAdminAccess(userId);
    if (!isAdmin) {
      return res.json({ success: false, message: 'Access denied. Admin only.' });
    }

    const {
      title, description, author, difficulty, problems, estimatedTime,
      rating, users, category, link, tags, color, icon, popular
    } = req.body;

    const newSheet = new sheetModel({
      title, description, author, difficulty, problems, estimatedTime,
      rating, users, category, link, tags, color, icon, popular: popular || false
    });

    await newSheet.save();
    res.json({ success: true, message: 'Sheet added successfully', sheet: newSheet });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const updateSheet = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check admin access
    const isAdmin = await checkAdminAccess(userId);
    if (!isAdmin) {
      return res.json({ success: false, message: 'Access denied. Admin only.' });
    }

    const { sheetId } = req.params;
    const updateData = { ...req.body };
    delete updateData.userId; // Remove userId from update data

    const updatedSheet = await sheetModel.findByIdAndUpdate(sheetId, updateData, { new: true });
    
    if (!updatedSheet) {
      return res.json({ success: false, message: 'Sheet not found' });
    }

    res.json({ success: true, message: 'Sheet updated successfully', sheet: updatedSheet });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const deleteSheet = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check admin access
    const isAdmin = await checkAdminAccess(userId);
    if (!isAdmin) {
      return res.json({ success: false, message: 'Access denied. Admin only.' });
    }

    const { sheetId } = req.params;
    const deletedSheet = await sheetModel.findByIdAndDelete(sheetId);
    
    if (!deletedSheet) {
      return res.json({ success: false, message: 'Sheet not found' });
    }

    res.json({ success: true, message: 'Sheet deleted successfully' });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Tutorial Controllers
export const getAllTutorials = async (req, res) => {
  try {
    const tutorials = await tutorialModel.find();
    res.json({ success: true, tutorials });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const addTutorial = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check admin access
    const isAdmin = await checkAdminAccess(userId);
    if (!isAdmin) {
      return res.json({ success: false, message: 'Access denied. Admin only.' });
    }

    const {
      title, description, instructor, duration, rating, students,
      level, category, thumbnail, tags, url
    } = req.body;

    const newTutorial = new tutorialModel({
      title, description, instructor, duration, rating, students,
      level, category, thumbnail, tags, url
    });

    await newTutorial.save();
    res.json({ success: true, message: 'Tutorial added successfully', tutorial: newTutorial });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const updateTutorial = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check admin access
    const isAdmin = await checkAdminAccess(userId);
    if (!isAdmin) {
      return res.json({ success: false, message: 'Access denied. Admin only.' });
    }

    const { tutorialId } = req.params;
    const updateData = { ...req.body };
    delete updateData.userId; // Remove userId from update data

    const updatedTutorial = await tutorialModel.findByIdAndUpdate(tutorialId, updateData, { new: true });
    
    if (!updatedTutorial) {
      return res.json({ success: false, message: 'Tutorial not found' });
    }

    res.json({ success: true, message: 'Tutorial updated successfully', tutorial: updatedTutorial });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const deleteTutorial = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check admin access
    const isAdmin = await checkAdminAccess(userId);
    if (!isAdmin) {
      return res.json({ success: false, message: 'Access denied. Admin only.' });
    }

    const { tutorialId } = req.params;
    const deletedTutorial = await tutorialModel.findByIdAndDelete(tutorialId);
    
    if (!deletedTutorial) {
      return res.json({ success: false, message: 'Tutorial not found' });
    }

    res.json({ success: true, message: 'Tutorial deleted successfully' });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Check if user is admin
export const checkAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.json({ success: false, message: 'User ID is required' });
    }
    
    const isAdmin = await checkAdminAccess(userId);
    res.json({ success: true, isAdmin });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};