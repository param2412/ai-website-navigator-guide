# Environment Variables for Vercel Deployment

## Required Environment Variables in Vercel Dashboard:

1. **MONGODB_URI**: 
   - Local: `mongodb://localhost:27017/ai-website-builder`
   - Production: You need MongoDB Atlas URI
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/ai-website-builder`

2. **JWT_SECRET**: 
   - Production: Generate a strong secret key
   - Example: `your-super-secure-jwt-secret-key-for-production`

3. **NODE_ENV**: 
   - Production: `production`

## Setup Instructions:

### For Local Development (Already Working):
- Uses local MongoDB
- Environment variables from .env file

### For Production (Vercel):
You need to:
1. Set up MongoDB Atlas (free tier available)
2. Add environment variables in Vercel dashboard
3. Redeploy

## Quick Fix for Demo:
I'll create a fallback system that works without database for demonstration.
