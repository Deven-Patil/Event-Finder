# 🔧 Setting Up Environment Variables in Netlify

## Step-by-Step Guide

### Option 1: Using the "Import environment variables" Feature

1. **Open the "Add environment variables" interface** (as shown in your screenshot)

2. **In the "Contents of .env file" text area**, paste:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
   ⚠️ **Replace `your-backend-url.railway.app` with your actual backend URL!**

3. **Secret Checkbox:**
   - ✅ **Check it** if your backend URL contains sensitive information
   - ⚠️ **Note:** Even if checked, the value will still be readable by your frontend code (which is normal)

4. **Scopes:**
   - Keep **"All scopes"** selected (unless you have a paid plan and want specific scopes)

5. **Deploy contexts:**
   - Choose **"All deploy contexts"** for production and preview
   - OR **"Specific deploy contexts"** if you want different URLs for production vs. preview

6. **Click "Import variables"** button

7. **Verify:**
   - Go to Site Settings → Environment variables
   - You should see `VITE_API_URL` listed

---

### Option 2: Adding Variables One by One

If you prefer to add variables individually:

1. **Go to:** Site Settings → Environment variables

2. **Click "Add a variable"**

3. **Enter:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.railway.app/api`
   - **Scopes:** All scopes
   - **Deploy contexts:** All deploy contexts

4. **Click "Add variable"**

---

## 📝 Important Notes

### ⚠️ Before Adding Environment Variables

1. **Deploy your backend first!**
   - You need the backend URL before setting `VITE_API_URL`
   - If backend is not deployed yet, use a placeholder:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```
   - Update it later with the real backend URL

### 🔄 After Adding Variables

1. **Redeploy your site:**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"
   - OR push a new commit to trigger auto-deploy

2. **Why redeploy?**
   - Environment variables are injected at build time
   - Changes only take effect after a new deployment

---

## ✅ Verification

After deploying, verify it worked:

1. **Open your Netlify site** in browser
2. **Open Developer Tools** (F12)
3. **Check Network tab** - API calls should go to your backend URL
4. **Check Console** - Should see no CORS errors

---

## 🎯 Example Values

### For Local Development:
```
VITE_API_URL=http://localhost:5000/api
```

### For Production (Railway):
```
VITE_API_URL=https://event-finder-api.railway.app/api
```

### For Production (Render):
```
VITE_API_URL=https://event-finder-api.onrender.com/api
```

### For Production (Vercel):
```
VITE_API_URL=https://event-finder-api.vercel.app/api
```

---

## 🚨 Common Issues

### Variables Not Working?

1. **Check the variable name:**
   - Must start with `VITE_` for Vite to expose it
   - ✅ `VITE_API_URL` (correct)
   - ❌ `API_URL` (won't work)

2. **Rebuild required:**
   - Environment variables are only available at build time
   - Always trigger a new deployment after adding/changing variables

3. **Check deploy context:**
   - If set to "Specific deploy contexts", make sure production is selected

4. **Verify backend URL:**
   - Test backend URL directly in browser: `https://your-backend.railway.app/api/events`
   - Should return JSON data

---

## 📋 Quick Checklist

- [ ] Backend is deployed and accessible
- [ ] Have backend URL ready
- [ ] Added `VITE_API_URL` in Netlify
- [ ] Value starts with `https://`
- [ ] Value ends with `/api`
- [ ] Triggered new deployment
- [ ] Tested deployed site

---

## 💡 Pro Tip

You can use different values for different contexts:
- **Production:** `https://api.production.com/api`
- **Preview (staging):** `https://api.staging.com/api`
- **Deploy Preview (PR):** `https://api.dev.com/api`

This allows you to test against different backends!

