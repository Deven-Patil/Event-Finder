# 🚀 Step-by-Step Netlify Deployment Guide

Follow these steps in order to deploy your Event Finder app to Netlify.

---

## Step 1: Commit and Push Your Code to GitHub

### 1.1 Open Terminal/Command Prompt
Navigate to your project folder:
```bash
cd D:\Task\Internshala
```

### 1.2 Check Git Status
See what files have changed:
```bash
git status
```

### 1.3 Add All Changes
```bash
git add .
```

### 1.4 Commit the Changes
```bash
git commit -m "Fix TypeScript build errors for Netlify deployment"
```

### 1.5 Push to GitHub
```bash
git push
```

**Note:** If you haven't set up a GitHub repository yet:
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it (e.g., "event-finder")
4. Don't initialize with README (you already have files)
5. Copy the repository URL
6. Run these commands:
   ```bash
   git init
   git remote add origin <your-github-repo-url>
   git branch -M main
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

---

## Step 2: Create Netlify Account (If You Haven't)

### 2.1 Go to Netlify
Visit [netlify.com](https://www.netlify.com)

### 2.2 Sign Up
- Click "Sign up" or "Get started for free"
- Choose "Sign up with GitHub" (recommended)
- Authorize Netlify to access your GitHub

---

## Step 3: Deploy Your Site on Netlify

### 3.1 Add New Site
- In Netlify dashboard, click **"Add new site"**
- Click **"Import an existing project"**

### 3.2 Connect to GitHub
- Click **"GitHub"** or **"Connect to Git provider"**
- Authorize Netlify if prompted
- Select your GitHub account

### 3.3 Select Your Repository
- Find and click on your **"event-finder"** (or your repo name)
- Click on it to select

### 3.4 Configure Build Settings
You'll see a form with these fields:

**Base directory:**
```
frontend
```

**Build command:**
```
npm run build
```

**Publish directory:**
```
frontend/dist
```

**Important:** Make sure to set these correctly!

### 3.5 Advanced Settings (Optional)
Click **"Show advanced"** if you want to:
- Set Node version (default is usually fine)
- Add build environment variables here (or add later)

### 3.6 Deploy!
- Click the **"Deploy site"** button
- Wait for the build to complete (usually 1-2 minutes)

---

## Step 4: Check the Build Log

### 4.1 View Build Status
- After clicking "Deploy site", you'll see the build log
- **Red = Failed** ❌
- **Green = Success** ✅

### 4.2 If Build Fails
- Scroll through the log to see errors
- Fix the errors and push again
- Netlify will automatically rebuild

### 4.3 If Build Succeeds
- You'll see: **"Site is live"**
- Your site URL will be shown (e.g., `https://random-name-123.netlify.app`)
- Click the URL to visit your site

---

## Step 5: Add Environment Variable

### 5.1 Go to Site Settings
- In your Netlify dashboard, click on your site
- Click **"Site settings"** (gear icon in the left sidebar)

### 5.2 Navigate to Environment Variables
- In the left menu, click **"Environment variables"**
- Click **"Add a variable"** or **"Import from .env file"**

### 5.3 Add the Variable
**Option A: Add One Variable**
1. Click **"Add a variable"**
2. **Key:** `VITE_API_URL`
3. **Value:** `https://your-backend-url.railway.app/api`
   - ⚠️ Replace with your actual backend URL!
4. **Scopes:** Keep "All scopes" selected
5. **Deploy contexts:** Select "All deploy contexts"
6. Click **"Add variable"**

**Option B: Import from .env (Easier)**
1. Click **"Import environment variables"**
2. In the text area, paste:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
3. Check/uncheck "Contains secret values" (optional)
4. Keep "All scopes" selected
5. Keep "All deploy contexts" selected
6. Click **"Import variables"**

### 5.4 Verify Variable is Added
- You should see `VITE_API_URL` in the list
- ✅ Green checkmark = saved

---

## Step 6: Deploy Backend (Required!)

**Important:** Your frontend needs a backend API to work. Netlify can't host Node.js backends, so deploy to Railway.

### 6.1 Go to Railway
Visit [railway.app](https://railway.app)

### 6.2 Sign Up
- Click **"Start a New Project"**
- Choose **"Login with GitHub"**

### 6.3 Create New Project
- Click **"New Project"**
- Click **"Deploy from GitHub repo"**
- Select your repository

### 6.4 Add Service
- Click **"Add Service"** (or wait for it to auto-add)
- Click on the service that was created

### 6.5 Configure Service
Click **"Settings"** tab:

**Service Name:**
- Keep default or change to "event-finder-api"

**Root Directory:**
```
backend
```

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

### 6.6 Add Environment Variables
- Go to **"Variables"** tab
- Click **"New Variable"**
- **Key:** `NODE_ENV`
- **Value:** `production`
- Click **"Add"**

### 6.7 Get Your Backend URL
- Go to **"Settings"** → **"Networking"**
- Click **"Generate Domain"**
- Copy the URL (e.g., `https://event-finder-api.up.railway.app`)

### 6.8 Update Frontend Environment Variable
- Go back to Netlify
- Site Settings → Environment variables
- Edit `VITE_API_URL`
- Change value to: `https://your-railway-url.railway.app/api`
- Click **"Save"**

---

## Step 7: Trigger New Deployment

### 7.1 Redeploy Frontend
After updating the environment variable:

1. Go to **"Deploys"** tab in Netlify
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete

**OR** just push a new commit:
```bash
git commit --allow-empty -m "Trigger Netlify rebuild"
git push
```

### 7.2 Verify Everything Works
1. Visit your Netlify site URL
2. Test creating an event
3. Test searching/filtering
4. Check browser console (F12) for errors

---

## Step 8: Custom Domain (Optional)

### 8.1 Add Custom Domain
- Go to Site Settings → **"Domain management"**
- Click **"Add custom domain"**
- Enter your domain (e.g., `eventfinder.com`)
- Follow DNS setup instructions

---

## ✅ Final Checklist

Before considering deployment complete:

- [ ] Code pushed to GitHub
- [ ] Frontend deployed on Netlify
- [ ] Backend deployed on Railway
- [ ] Environment variable `VITE_API_URL` set correctly
- [ ] Site loads without errors
- [ ] Can create events
- [ ] Can view events list
- [ ] Search/filter works
- [ ] No console errors

---

## 🆘 Troubleshooting

### Build Still Fails?
- Check the build log for specific errors
- Verify all files are committed and pushed
- Make sure `frontend/` folder exists in your repo

### Frontend Can't Connect to Backend?
- Verify backend is deployed and accessible
- Test backend URL directly: `https://your-backend.railway.app/api/events`
- Check `VITE_API_URL` is correct (should end with `/api`)
- Redeploy frontend after changing environment variable

### CORS Errors?
- Backend CORS is already configured ✅
- Make sure backend URL is correct

### Site Shows Blank Page?
- Check browser console for errors
- Verify environment variable is set
- Make sure build completed successfully

---

## 📝 Quick Reference

**Frontend URL:** `https://your-site.netlify.app`  
**Backend URL:** `https://your-app.railway.app`  
**Environment Variable:** `VITE_API_URL=https://your-app.railway.app/api`

---

**Need Help?** Check the build logs in Netlify dashboard for specific error messages!

