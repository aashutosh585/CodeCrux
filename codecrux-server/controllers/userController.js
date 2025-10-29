import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        // Get userId from middleware (set by userAuth)
        const {userId} = req.body;
        
        const user = await userModel.findById(userId)
            .populate('completedSheets')
            .populate('completedTutorials'); 

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            userData: { 
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                history: user.history || [],
                // Progress tracking with populated data
                completedSheets: user.completedSheets || [],
                completedTutorials: user.completedTutorials || []
            }
        });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}

// Save chat message to user's history
export const saveChatMessage = async (req, res) => {
    try {
        const { userId } = req.body;
        const { role, content } = req.body;

        // Validate input
        if (!role || !content) {
            return res.json({ success: false, message: 'Role and content are required' });
        }

        if (!['user', 'model'].includes(role)) {
            return res.json({ success: false, message: 'Role must be either "user" or "model"' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Add new message to history
        user.history.push({
            role,
            content,
            timestamp: new Date()
        });

        await user.save();

        res.json({
            success: true,
            message: 'Chat message saved successfully'
        });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}

// Clear user's chat history
export const clearChatHistory = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        user.history = [];
        await user.save();

        res.json({
            success: true,
            message: 'Chat history cleared successfully'
        });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}

// Save multiple chat messages (bulk save for efficiency)
export const saveChatHistory = async (req, res) => {
    try {
        const { userId } = req.body;
        const { messages } = req.body;

        // Validate input
        if (!Array.isArray(messages)) {
            return res.json({ success: false, message: 'Messages must be an array' });
        }

        // Validate each message
        for (const message of messages) {
            if (!message.role || !message.content) {
                return res.json({ success: false, message: 'Each message must have role and content' });
            }
            if (!['user', 'model'].includes(message.role)) {
                return res.json({ success: false, message: 'Role must be either "user" or "model"' });
            }
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Replace entire history with new messages
        user.history = messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
        }));

        await user.save();

        res.json({
            success: true,
            message: 'Chat history saved successfully',
            messageCount: messages.length
        });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}



// Toggle sheet completion
export const toggleSheetCompletion = async (req, res) => {
    try {
        const { userId, sheetId } = req.body;
        
        if (!sheetId) {
            return res.json({ success: false, message: 'Sheet ID is required' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isCompleted = user.completedSheets.includes(sheetId);
        
        if (isCompleted) {
            // Remove from completed sheets
            user.completedSheets = user.completedSheets.filter(id => id.toString() !== sheetId);
        } else {
            // Add to completed sheets
            user.completedSheets.push(sheetId);
        }

        await user.save();

        res.json({
            success: true,
            message: isCompleted ? 'Sheet unmarked from completed' : 'Sheet marked as completed',
            isCompleted: !isCompleted,
            completedCount: user.completedSheets.length
        });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}

// Toggle tutorial completion
export const toggleTutorialCompletion = async (req, res) => {
    try {
        const { userId, tutorialId } = req.body;
        
        if (!tutorialId) {
            return res.json({ success: false, message: 'Tutorial ID is required' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isCompleted = user.completedTutorials.includes(tutorialId);
        
        if (isCompleted) {
            // Remove from completed tutorials
            user.completedTutorials = user.completedTutorials.filter(id => id.toString() !== tutorialId);
        } else {
            // Add to completed tutorials
            user.completedTutorials.push(tutorialId);
        }

        await user.save();

        res.json({
            success: true,
            message: isCompleted ? 'Tutorial unmarked from completed' : 'Tutorial marked as completed',
            isCompleted: !isCompleted,
            completedCount: user.completedTutorials.length
        });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}
