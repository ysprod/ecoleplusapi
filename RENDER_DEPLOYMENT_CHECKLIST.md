# 🚀 Render Deployment Checklist for École Plus API

## Issue: Login Error with `undefined` Status

Your frontend shows:
```
❌ Erreur de connexion: {status: undefined, statusText: undefined, message: undefined}
```

This indicates the request **never reached the server** or **CORS blocked it before getting a response**.

---

## ✅ Required Environment Variables on Render

Go to your Render dashboard → **ecoleplusapi** → **Environment** tab and ensure these are set:

### 1. **ALLOWED_ORIGINS** (CRITICAL for CORS)
```env
ALLOWED_ORIGINS=https://ecoleplus.vercel.app,https://ecoleplus-3464u432f-yaya-sidibes-projects.vercel.app
```

**Add your actual Vercel frontend URLs** (check the browser URL when you see the error).

### 2. **MONGODB_URI**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecoleplus?retryWrites=true&w=majority
```

### 3. **JWT_SECRET**
```env
JWT_SECRET=your-super-secret-jwt-key-at-least-32-chars
```

### 4. **API_URL** (optional, for Swagger docs)
```env
API_URL=https://ecoleplus-api.onrender.com/api
```

---

## 🔍 Common Issues & Solutions

### Problem 1: CORS Blocking Frontend Requests
**Symptom:** Browser console shows `undefined` error or CORS policy error

**Solution:**
1. In Render Environment Variables, set `ALLOWED_ORIGINS` to include **ALL** your Vercel deployment URLs
2. Vercel creates new URLs for each preview deployment, so use the pattern:
   ```env
   ALLOWED_ORIGINS=https://ecoleplus.vercel.app,https://*.vercel.app
   ```
3. Check the **exact origin** in browser DevTools → Network tab → Request Headers → Origin
4. The backend now logs CORS checks - check Render logs to see if requests are being blocked

---

### Problem 2: Render Service Not Running
**Symptom:** Request timeout or connection refused

**Check:**
1. Render Dashboard → **ecoleplusapi** → Logs
2. Look for: `🚀 Application is running on: http://localhost:3001`
3. If you see errors, they'll appear in the logs

---

### Problem 3: Database Connection Failed
**Symptom:** Server starts but crashes on first request

**Check:**
1. Render Logs show MongoDB connection errors
2. Verify `MONGODB_URI` is correct (username, password, cluster URL)
3. MongoDB Atlas → Network Access → Allow access from `0.0.0.0/0` (or Render's IP ranges)

---

### Problem 4: Wrong API Endpoint URL
**Symptom:** 404 Not Found

**Check frontend code:**
```typescript
// Should be:
const API_URL = 'https://ecoleplus-api.onrender.com'

// NOT:
const API_URL = 'https://ecoleplus-api.onrender.com/api' // No /api prefix unless you set one
```

Currently, your backend has **NO global prefix**, so routes are:
- ✅ `POST https://ecoleplus-api.onrender.com/auth/login`
- ❌ `POST https://ecoleplus-api.onrender.com/api/auth/login` (will 404)

---

## 🧪 Testing the Deployment

### 1. Test Health Endpoint (if you have one)
```bash
curl https://ecoleplus-api.onrender.com/
```

### 2. Test Login Endpoint Directly
```bash
curl -X POST https://ecoleplus-api.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"eleveun@ecoleplus.ci","password":"yourpassword"}'
```

Expected responses:
- ✅ 200: `{"accessToken":"...","refreshToken":"...","user":{...}}`
- ❌ 401: `{"statusCode":401,"message":"Invalid credentials"}`
- ❌ 404: Check the URL is correct (no `/api` prefix)

### 3. Check Render Logs
After testing, immediately check Render logs for:
```
🔍 CORS check for origin: https://ecoleplus.vercel.app
🔐 Login attempt: {email: 'eleveun@ecoleplus.ci'}
```

---

## 📝 What I Fixed in the Code

### 1. Added CORS Logging (`main.ts`)
Now logs every CORS check:
```typescript
console.log('🔍 CORS check for origin:', origin);
console.log('✅ CORS allowed (exact match):', origin);
console.warn('❌ CORS blocked:', origin);
```

### 2. Added Login Logging (`auth.controller.ts`)
Now logs every login attempt:
```typescript
console.log('🔐 Login attempt:', { email: loginDto.email });
console.log('✅ Login successful:', loginDto.email);
console.error('❌ Login error:', error.message);
```

### 3. Added Startup Logging (`main.ts`)
Shows configuration on startup:
```typescript
console.log('🌐 CORS Configuration:', {...});
console.log('🚀 Application is running on: http://localhost:${port}');
```

---

## 🚀 Deployment Steps

1. **Commit and Push Changes:**
   ```bash
   git add .
   git commit -m "fix: Add CORS and auth logging for debugging"
   git push origin main
   ```

2. **Wait for Render Auto-Deploy** (or manually trigger)

3. **Check Render Logs** for startup messages:
   ```
   🌐 CORS Configuration: {...}
   🚀 Application is running on: http://localhost:10000
   ```

4. **Set Environment Variables** in Render (see section above)

5. **Test Login** from your frontend

6. **Check Render Logs** for:
   - CORS check message
   - Login attempt message
   - Success or error message

---

## 🔧 Quick Fixes for Common Errors

### "CORS blocked"
→ Add frontend URL to `ALLOWED_ORIGINS` in Render

### "Invalid credentials"
→ Check if user exists in database with correct email/password

### "Cannot connect to MongoDB"
→ Verify `MONGODB_URI` and MongoDB Atlas network access

### "404 Not Found"
→ Remove `/api` prefix from frontend API calls (unless you add a global prefix)

---

## 📞 Next Steps if Still Not Working

1. Share the **Render logs** (after a login attempt)
2. Share the **exact frontend URL** where you're testing
3. Share the **Network tab** from browser DevTools (Headers + Response)
4. Verify the **Environment Variables** are set in Render

