import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: '' },
  resetOtpExpireAt: { type: Number, default: 0 },
  history: { 
    type: [{ 
      role: { type: String, required: true, enum: ['user', 'model'] },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }], 
    default: [] 
  },
  // Relationships to completed sheets and tutorials
  completedSheets: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'sheet' 
  }],
  completedTutorials: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'tutorial' 
  }]
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
