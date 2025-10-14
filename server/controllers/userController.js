import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        // Get userId from middleware (set by userAuth)
        const {userId} = req.body;
        
        const user = await userModel.findById(userId); 

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            userData: { 
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                history: user.history || []
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