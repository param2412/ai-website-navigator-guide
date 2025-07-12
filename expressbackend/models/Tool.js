const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['design', 'development', 'content', 'marketing', 'testing', 'hosting', 'seo', 'analytics', 'ai-builders'],
  },
  subcategory: String,
  url: {
    type: String,
    required: true,
  },
  logo: String,
  pricing: {
    type: String,
    enum: ['free', 'freemium', 'paid'],
    default: 'freemium',
  },
  features: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5,
  },
  tags: [String],
  affiliateLink: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  useCases: [String],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tool', toolSchema);
