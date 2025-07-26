# Troubleshooting Guide - Signup 404 Error

## 🚨 **Issue: Signup returning 404 error**

### **Problem:**
The signup API route `/api/auth/signup` is returning a 404 "Not Found" error.

### **Root Cause:**
The API utility files (`app/API/db.js` and `app/API/auth.js`) were empty, causing import errors in the API routes.

## 🔧 **Solutions Applied:**

### **1. Fixed Database Connection**
- ✅ Recreated `app/API/db.js` with your MongoDB Atlas credentials
- ✅ Added proper MongoDB connection with caching
- ✅ Configured for your database: `client-info`

### **2. Fixed Authentication Utilities**
- ✅ Recreated `app/API/auth.js` with all required functions
- ✅ Added password hashing with bcryptjs
- ✅ Added JWT token generation and verification
- ✅ Added user ID generation functions

### **3. Added Debug Routes**
- ✅ Created `/api/auth/signup-debug` for testing
- ✅ Created `/api/test-signup` for basic API testing
- ✅ Created `/api-test` page for comprehensive testing

## 🧪 **Testing Steps:**

### **1. Test API Routes:**
Visit: `http://localhost:3000/api-test`

This page will test all API endpoints and show you which ones are working.

### **2. Test Individual Endpoints:**
- **Health Check**: `http://localhost:3000/api/health`
- **Basic Test**: `http://localhost:3000/api/test`
- **Database Test**: `http://localhost:3000/api/test-db`
- **Signup Debug**: `http://localhost:3000/api/auth/signup-debug`

### **3. Test Signup Form:**
1. Visit: `http://localhost:3000/admin/signup`
2. Fill out the form
3. Check browser console for errors
4. Check network tab for API calls

## 🔍 **Debug Information:**

### **Current Configuration:**
- **Database**: `client-info`
- **Username**: `info`
- **Password**: `1234`
- **Cluster**: `cluster0.vppiw.mongodb.net`

### **API Routes Structure:**
```
app/api/
├── auth/
│   ├── signup/route.js          # Main signup route
│   ├── signup-debug/route.js    # Debug signup route
│   ├── login/route.js           # Admin login
│   ├── userLogin/route.js       # User login
│   ├── me/route.js              # Get user info
│   └── logout/route.js          # Logout
├── health/route.js              # Health check
├── test/route.js                # Basic test
├── test-db/route.js             # Database test
└── test-signup/route.js         # Signup test
```

## 🎯 **Expected Behavior:**

### **Working Signup Flow:**
1. User fills out signup form
2. Form data sent to `/api/auth/signup`
3. Database connection established
4. User data validated
5. Password hashed
6. User saved to database
7. Success response returned
8. User redirected to login page

### **Error Handling:**
- ✅ Duplicate email prevention
- ✅ Password validation (min 6 characters)
- ✅ Required field validation
- ✅ Database connection error handling
- ✅ Network error handling

## 🚨 **If Still Not Working:**

### **1. Check Browser Console:**
- Open Developer Tools (F12)
- Go to Console tab
- Look for JavaScript errors
- Check Network tab for failed requests

### **2. Check Server Logs:**
- Look at the terminal where `npm run dev` is running
- Check for error messages
- Look for API route compilation errors

### **3. Test Database Connection:**
Visit: `http://localhost:3000/api/test-db`
This will test if your MongoDB Atlas connection is working.

### **4. Verify Environment Variables:**
Make sure `.env.local` exists with:
```env
MONGODB_URI=mongodb+srv://info:1234@cluster0.vppiw.mongodb.net/client-info?retryWrites=true&w=majority
MONGODB_DB=client-info
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 🎉 **Success Indicators:**

### **✅ API Routes Working:**
- All test endpoints return 200 status
- Database connection successful
- No JavaScript errors in console

### **✅ Signup Working:**
- Form submission successful
- Success message displayed
- Auto-redirect to login page
- User data saved in database

### **✅ Login Working:**
- Can login with created account
- JWT token generated
- Role-based redirect working
- Session maintained

## 📞 **Next Steps:**

1. **Test the API routes**: Visit `http://localhost:3000/api-test`
2. **Try the debug signup**: Visit `http://localhost:3000/admin/signup`
3. **Check the results**: Look for success messages
4. **Report any errors**: Share specific error messages

The signup should now be working with the fixed database connection and authentication utilities! 