# 🚀 Quick Start Guide

## Prerequisites
- Node.js installed (v18 or higher)
- npm installed

## Step-by-Step Instructions

### 1. Fix PowerShell Execution Policy (If Needed)

**If you see npm errors about execution policy**, open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**OR** use Command Prompt (cmd) instead - it doesn't have this issue.

### 2. Install Backend Dependencies

Open Terminal/Command Prompt and run:
```powershell
cd backend
npm install
```

### 3. Create Backend Environment File

Create a file named `.env` in the `backend` folder with:
```
PORT=5000
NODE_ENV=development
```

Or copy from example:
```powershell
Copy-Item .env.example .env
```

### 4. Start Backend Server

Keep the terminal open and run:
```powershell
npm run dev
```

You should see: `🚀 Server running on http://localhost:5000`

### 5. Install Frontend Dependencies

Open a **NEW** terminal window and run:
```powershell
cd frontend
npm install
```

### 6. Create Frontend Environment File

Create a file named `.env` in the `frontend` folder with:
```
VITE_API_URL=http://localhost:5000/api
```

Or copy from example:
```powershell
Copy-Item .env.example .env
```

### 7. Start Frontend Server

In the frontend terminal, run:
```powershell
npm run dev
```

You should see the Vite dev server URL (usually `http://localhost:3000`)

### 8. Open in Browser

Navigate to: **http://localhost:3000**

## Troubleshooting

- **Port already in use?** Change `PORT=5000` to `PORT=5001` in backend/.env
- **CORS errors?** Make sure backend is running first
- **npm not found?** Make sure Node.js is installed and added to PATH
- **Still having PowerShell issues?** Use Command Prompt (cmd) instead

## Stop Servers

Press `Ctrl + C` in both terminal windows to stop the servers.

