import mongoose from 'mongoose';

const tutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  rating: { type: Number, required: true },
  students: { type: String, required: true },
  level: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  tags: [{ type: String }],
  url: { type: String, required: true }
});

const tutorialModel = mongoose.models.tutorial || mongoose.model('tutorial', tutorialSchema);

export default tutorialModel;