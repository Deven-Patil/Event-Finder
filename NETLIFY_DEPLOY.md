# 🚀 Deploy to Netlify - Quick Guide

## Step-by-Step Instructions

### Prerequisites
- GitHub account
- Code pushed to GitHub repository

---

## 1️⃣ Deploy Frontend to Netlify

### Option A: Through Netlify Dashboard (Easiest)

1. **Go to [netlify.com](https://www.netlify.com)** and sign up/login

2. **Click "Add new site" → "Import an existing project"**

3. **Connect to GitHub** and authorize Netlify

4. **Select your repository**

5. **Configure build settings:**
   ```
   Base directory:        frontend
   Build command:         npm run build
   Publish directory:     frontend/dist
   ```

6. **Add Environment Variable:**
   - Go to Site Settings → Environment variables
   - Click "Import environment variables" (or "Add a variable")
   - Add new variable:
     ```
     Key:   VITE_API_URL
     Value: https://your-backend-url.railway.app/api
     ```
   - ⚠️ **Note:** Add this AFTER deploying your backend first!
   - See [NETLIFY_ENV_SETUP.md](./NETLIFY_ENV_SETUP.md) for detailed instructions

7. **Click "Deploy site"**

8. **Wait for deployment** - Your site will be live at `https://random-name.netlify.app`

---

## 2️⃣ Deploy Backend (Required!)

Netlify doesn't support Node.js backends. Deploy to Railway (recommended):

### Deploy Backend to Railway:

1. **Go to [railway.app](https://railway.app)** and sign up with GitHub

2. **Click "New Project" → "Deploy from GitHub repo"**

3. **Select your repository**

4. **Click "Add Service" → "Empty Service"**

5. **Configure:**
   - Click on the service → Settings
   - Set **Root Directory:** `backend`
   - Set **Build Command:** `npm install && npm run build`
   - Set **Start Command:** `npm start`

6. **Add Environment Variable:**
   - Variables tab → Add:
     ```
     NODE_ENV=production
     ```

7. **Get your backend URL:**
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Copy the URL (e.g., `https://your-app.railway.app`)

8. **Update Frontend Environment Variable:**
   - Go back to Netlify → Site Settings → Environment variables
   - Update `VITE_API_URL` to: `https://your-app.railway.app/api`
   - Trigger a new deployment (Deploys → Trigger deploy)

---

## 3️⃣ Test Your Deployment

1. **Visit your Netlify site:** `https://your-site.netlify.app`

2. **Test features:**
   - View events list
   - Create a new event
   - Search/filter events
   - Use location features

---

## 🎯 Quick Reference

### Frontend Build Settings (Netlify):
```
Base directory:    frontend
Build command:     npm run build
Publish directory: frontend/dist
```

### Environment Variables Needed:

**Frontend (Netlify):**
```
VITE_API_URL=https://your-backend-url.com/api
```

**Backend (Railway):**
```
NODE_ENV=production
```

---

## ✅ Troubleshooting

### Frontend shows errors / can't connect to backend
- ✅ Check `VITE_API_URL` environment variable is correct
- ✅ Make sure backend is deployed and accessible
- ✅ Rebuild frontend after updating environment variables

### Build fails on Netlify
- ✅ Check Node version (should be 18)
- ✅ Verify all dependencies in `package.json`
- ✅ Check build logs in Netlify dashboard

### CORS errors
- ✅ Backend CORS is already configured ✅
- ✅ Verify backend URL is correct

---

## 📝 Alternative: Netlify CLI

If you prefer command line:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
npm run build
netlify deploy --prod
```

---

## 🌟 That's It!

Your app should now be live! 🎉

**Frontend:** `https://your-site.netlify.app`  
**Backend:** `https://your-app.railway.app`

