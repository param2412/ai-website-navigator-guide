const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  websiteType: String,
  steps: [{
    id: String,
    title: String,
    description: String,
    estimatedTime: String,
    tools: [{
      toolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
      },
      isPrimary: Boolean,
      reason: String,
    }],
    resources: [String],
    order: Number,
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  estimatedDuration: String,
  tags: [String],
  isTemplate: {
    type: Boolean,
    default: false,
  },
  targetAudience: [String],
  requirements: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Workflow', workflowSchema);
