const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500,
  },
  company: {
    type: String,
    default: '',
    maxlength: 100,
  },
  website: {
    type: String,
    default: '',
    maxlength: 200,
  },
  preferences: {
    websiteType: String,
    primaryGoal: String,
    budget: String,
    skillLevel: String,
    aiNeeds: [String],
    timeline: String,
  },
  savedWorkflows: [{
    workflowId: String,
    workflowName: String,
    progress: [{
      stepId: String,
      completed: Boolean,
      completedAt: Date,
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  workflows: [{
    id: String,
    name: String,
    type: String,
    templateId: String,
    customSteps: [mongoose.Schema.Types.Mixed],
    status: {
      type: String,
      enum: ['active', 'completed', 'paused'],
      default: 'active'
    },
    progress: {
      type: Number,
      default: 0
    },
    timeSpent: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: Date
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
