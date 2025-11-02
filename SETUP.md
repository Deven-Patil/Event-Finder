# Quick Setup Guide for Windows

## PowerShell Execution Policy Issue

If you encounter the error:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled
```

### Solution 1: Run PowerShell as Administrator (Recommended)

1. Right-click PowerShell and select "Run as Administrator"
2. Run this command:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Type `Y` when prompted
4. Close and reopen PowerShell

### Solution 2: Use Command Prompt Instead

Open Command Prompt (cmd) instead of PowerShell:
```cmd
cd backend
npm install
copy .env.example .env
npm run dev
```

### Solution 3: Bypass for Current Session

In PowerShell, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

## Setup Steps

### Backend

1. **Navigate to backend directory**
   ```powershell
   cd backend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Create .env file**
   ```powershell
   Copy-Item .env.example .env
   ```
   Or manually create `.env` with:
   ```
   PORT=5000
   NODE_ENV=development
   ```

4. **Start backend server**
   ```powershell
   npm run dev
   ```
   Backend runs on http://localhost:5000

### Frontend

1. **Open a new terminal and navigate to frontend**
   ```powershell
   cd frontend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Create .env file**
   ```powershell
   Copy-Item .env.example .env
   ```
   Or manually create `.env` with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start frontend dev server**
   ```powershell
   npm run dev
   ```
   Frontend runs on http://localhost:3000

## Alternative: Using npx

If npm commands still don't work, you can use:
```powershell
npx --yes <command>
```

For example:
```powershell
npx --yes npm install
```

## Troubleshooting

- **Port already in use**: Change PORT in backend/.env to a different port (e.g., 5001)
- **CORS errors**: Make sure backend is running before starting frontend
- **Module not found**: Delete `node_modules` and run `npm install` again

