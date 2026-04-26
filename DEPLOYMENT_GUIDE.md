# 🚀 MERN Stack Deployment Guide - Fix Admin Login 401 Error

## Problem Summary

- ✅ Frontend (user side) working fine on Vercel
- ❌ Admin panel getting 401 Unauthorized error
- ❌ Response is HTML instead of JSON (indicates backend connectivity issue)

---

## Root Causes Identified

### 1. **Backend URL Mismatch** ❌ FIXED ✅

- Admin `vercel.json` had wrong backend URL
- Now both Frontend & Admin point to: `https://doctor-appointment-project-backend-sage.vercel.app`

### 2. **Missing Environment Variables on Vercel Backend**

- Vercel deployment doesn't have: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`
- Local `.env` has them, but they're NOT pushed to Vercel

### 3. **Backend May Not Be Deployed**

- If you only deployed Frontend & Admin on Vercel
- Backend needs separate deployment (Vercel, Render, Railway, Heroku, etc.)

---

## Step-by-Step Fix

### STEP 1: Verify Backend Deployment Status

Run this command in terminal to check if backend is accessible:

```bash
curl -X POST https://doctor-appointment-project-backend-sage.vercel.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@prescripto.com","password":"qwerty122"}'
```

**Expected Response**: Should return JSON (either success or error)

```json
{ "success": false, "message": "Invalid email or password" }
```

**If you get HTML error page**: Backend URL is wrong or not deployed

### STEP 2: Check Backend Environment Variables

**IF Backend is on Vercel:**

1. Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables
2. Add these variables:

   ```
   MONGODB_URL=mongodb+srv://doctor-app:007007007@cluster0.yymjppi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=prescripto
   ADMIN_EMAIL=admin@prescripto.com
   ADMIN_PASSWORD=qwerty122
   CLOUDINARY_CLOUD_NAME=dwmoiwxth
   CLOUDINARY_API_KEY=364341668171115
   CLOUDINARY_API_SECRET=UHSfuymmIUMcFLVOdegpC9ivYQ8
   ```

3. **Important**: After adding env vars, redeploy the backend:
   ```bash
   git push  # This will trigger redeploy on Vercel
   ```

### STEP 3: Update Admin Panel Vercel Environment Variables

**IF Admin is on Vercel:**

1. Go to Vercel Dashboard → Admin Panel Project → Settings → Environment Variables
2. Add:

   ```
   VITE_BACKEND_URL=https://doctor-appointment-project-backend-sage.vercel.app
   ```

3. Redeploy by pushing code:
   ```bash
   git push
   ```

### STEP 4: Update Frontend Vercel Environment Variables

**IF Frontend is on Vercel:**

1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Add:

   ```
   VITE_BACKEND_URL=https://doctor-appointment-project-backend-sage.vercel.app
   ```

3. Redeploy by pushing code:
   ```bash
   git push
   ```

---

## Testing Admin Login Locally

### Test with correct credentials:

```
Email: admin@prescripto.com
Password: qwerty122
```

### To test on localhost:

1. Start backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Start admin panel:

   ```bash
   cd admin
   npm install
   npm run dev
   ```

3. Open http://localhost:5174 and try logging in
4. Check browser console for errors (F12)
5. Check backend terminal for logs

---

## If Still Getting 401 Error After All Steps

### Cause: Wrong Backend URL

**Check 1**: What backend URL is admin panel trying to use?

1. Open http://localhost:5174 (or Vercel URL)
2. Press F12 (Developer Tools)
3. Go to Network tab
4. Try to login
5. Click on the POST request to `/api/admin/login`
6. Check the full URL in "Request URL"
7. Verify it matches: `https://doctor-appointment-project-backend-sage.vercel.app/api/admin/login`

### Cause: Incorrect Admin Credentials

**Check 2**: Is database user created?

1. Check MongoDB Atlas user collection
2. Verify email and password match what you're logging in with
3. Alternatively, use env variable credentials:
   - Email: `admin@prescripto.com`
   - Password: `qwerty122`

### Cause: Backend Not Returning JSON

**Check 3**: Backend error

1. Check backend logs (if deployed on Vercel: Vercel Dashboard → Logs)
2. Run test curl command from STEP 1
3. If response is HTML with error, backend has server error

---

## Alternative: Deploy Backend to Render.com (Recommended)

If backend on Vercel isn't working:

1. **Create Render Account**: https://render.com
2. **Push code to GitHub**
3. **Create new Web Service on Render**:
   - Connect your GitHub repo
   - Select `backend` folder as root
   - Add Environment Variables (same as above)
   - Deploy

4. **Update frontend & admin `.env`**:

   ```
   VITE_BACKEND_URL=https://your-render-backend-url.onrender.com
   ```

5. **Update frontend & admin `vercel.json`**:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://your-render-backend-url.onrender.com/api/:path*"
       },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

---

## Quick Checklist

- [ ] Backend is deployed and accessible
- [ ] Backend has all env variables set (ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET, etc.)
- [ ] Admin & Frontend have correct VITE_BACKEND_URL
- [ ] vercel.json files have correct backend URL in rewrites
- [ ] Admin credentials are correct: `admin@prescripto.com` / `qwerty122`
- [ ] Tested with curl command (returns JSON, not HTML)
- [ ] Redeploy all services after env changes

---

## Files Modified in This Fix

1. ✅ `/admin/vercel.json` - Updated backend URL
2. ✅ `/frontend/vercel.json` - Added API rewrite rules

## Still Having Issues?

1. Check backend logs: https://vercel.com → Select backend project → Deployments → View logs
2. Test curl command from STEP 1
3. Verify MongoDB connection is working
4. Check if JWT_SECRET is set in backend env variables
5. Verify admin credentials match database or env variables
