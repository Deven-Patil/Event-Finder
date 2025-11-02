# 🚀 Deployment Guide

## Overview

This full-stack application requires deploying both backend and frontend separately:
- **Frontend** → Netlify (Static React App)
- **Backend** → Railway/Render/Vercel (Node.js API)

---

## 📦 Frontend Deployment on Netlify

### Method 1: Netlify Web Interface (Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to Netlify**
   - Visit [netlify.com](https://www.netlify.com)
   - Sign up/Login with GitHub

3. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Choose the repository with your code

4. **Configure Build Settings**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
   - **Node version:** `18` (or latest)

5. **Add Environment Variables**
   - Click "Site settings" → "Environment variables"
   - Add:
     ```
     VITE_API_URL = https://your-backend-url.com/api
     ```
   - Replace `your-backend-url.com` with your deployed backend URL

6. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at: `https://your-site.netlify.app`

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Navigate to frontend**
   ```bash
   cd frontend
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Initialize Netlify**
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team
   - Set publish directory: `dist`

6. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Method 3: Netlify.toml Configuration

Create `netend/netlify.toml`:

```toml
[build]
  base = "frontend"
  publish = "frontend/dist"
  command = "npm install && npm run build"

[[plugins]]
  package = "@netlify/plugin-lighthouse"

[build.environment]
  NODE_VERSION = "18"
```

---

## ⚙️ Backend Deployment

Netlify doesn't support Node.js backends, so deploy to one of these:

### Option 1: Railway (Recommended - Free Tier Available)

1. **Go to Railway**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Add Environment Variables**
   - Add `NODE_ENV=production`
   - Add `PORT` (Railway sets this automatically)

5. **Deploy**
   - Railway auto-deploys on git push
   - Get your backend URL from the service

### Option 2: Render (Free Tier Available)

1. **Go to Render**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository

3. **Configure**
   - **Name:** event-finder-api
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

4. **Add Environment Variables**
   - `NODE_ENV=production`

5. **Deploy**
   - Click "Create Web Service"
   - Render will deploy automatically

### Option 3: Vercel (Free Tier Available)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Select your repository

3. **Configure**
   - **Root Directory:** `backend`
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Deploy**
   - Click "Deploy"
   - Get your backend URL

---

## 🔗 Connect Frontend to Backend

After deploying both:

1. **Update Frontend Environment Variable**
   - Go to Netlify → Site Settings → Environment Variables
   - Update `VITE_API_URL` to your backend URL:
     ```
     VITE_API_URL=https://your-backend.railway.app/api
     ```

2. **Redeploy Frontend**
   - Trigger a new deployment in Netlify
   - Or push a commit to trigger auto-deploy

---

## ✅ Verification Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend environment variable is set correctly
- [ ] Frontend is deployed on Netlify
- [ ] CORS is configured in backend (already done ✅)
- [ ] Both services are running
- [ ] Test creating an event
- [ ] Test searching/filtering
- [ ] Test location features

---

## 🌐 Example Deployment

**Frontend (Netlify):**
```
https://event-finder-app.netlify.app
```

**Backend (Railway):**
```
https://event-finder-api.railway.app
```

**Environment Variable in Netlify:**
```
VITE_API_URL=https://event-finder-api.railway.app/api
```

---

## 🔧 Troubleshooting

### CORS Errors
- Make sure backend CORS is configured (already done ✅)
- Verify backend URL in frontend environment variables

### 404 Errors
- Check if backend routes are accessible: `https://your-backend.com/api/events`
- Verify build commands completed successfully

### Environment Variables Not Working
- Rebuild frontend after changing environment variables
- Environment variables starting with `VITE_` are needed for Vite

### Build Failures
- Check Node version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

---

## 📝 Quick Deploy Commands Summary

**Frontend (Netlify CLI):**
```bash
cd frontend
npm run build
netlify deploy --prod
```

**Backend (Railway CLI):**
```bash
npm install -g @railway/cli
railway login
cd backend
railway up
```

---

## 💡 Pro Tips

1. **Use GitHub Actions** for CI/CD automation
2. **Set up custom domains** for both services
3. **Monitor logs** in both platforms
4. **Use preview deployments** for testing
5. **Enable HTTPS** (usually automatic)

---

## 🆓 Free Tier Limits

- **Netlify:** 100GB bandwidth, 300 build minutes/month
- **Railway:** $5 free credit/month
- **Render:** Free tier with 750 hours/month
- **Vercel:** 100GB bandwidth, unlimited requests

For production, you may need to upgrade based on usage.

