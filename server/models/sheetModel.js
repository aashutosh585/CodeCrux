import mongoose from 'mongoose';

const sheetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  difficulty: { type: String, required: true },
  problems: { type: Number, required: true },
  estimatedTime: { type: String, default: 'Not specified' },
  rating: { type: Number, required: true },
  users: { type: String, default: '0' },
  category: { type: String, required: true },
  link: { type: String, required: true },
  tags: [{ type: String }],
  color: { type: String, default: '#FF6B6B' },
  icon: { type: String, default: '📚' }, // Store icon name as string
  popular: { type: Boolean, default: false }
});

const sheetModel = mongoose.models.sheet || mongoose.model('sheet', sheetSchema);

export default sheetModel;