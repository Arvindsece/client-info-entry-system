# Quick Start Guide - Client Info Entry System

## 🚀 **Your MongoDB Atlas is Configured!**

### Database Details:
- **Username**: `info`
- **Password**: `1234`
- **Database**: `client-info`
- **Cluster**: `cluster0.vppiw.mongodb.net`

## 📋 **Step-by-Step Setup**

### 1. **Environment Variables**
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://info:1234@cluster0.vppiw.mongodb.net/client-info?retryWrites=true&w=majority
MONGODB_DB=client-info
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 2. **Start the Application**
```bash
npm run dev
```

### 3. **Test the Connection**
Visit: `http://localhost:3000/api/test-db`

## 🎯 **Available Features**

### **Admin Authentication:**
- ✅ **Signup**: `http://localhost:3000/admin/signup`
- ✅ **Login**: `http://localhost:3000/admin/login`
- ✅ **Dashboard**: `http://localhost:3000/admin/dashboard`

### **User Authentication:**
- ✅ **Signup**: `http://localhost:3000/user/signup`
- ✅ **Login**: `http://localhost:3000/user/userLogin`
- ✅ **Dashboard**: `http://localhost:3000/user/listofinformation`

## 🔧 **API Endpoints**

### **Authentication:**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - Admin login
- `POST /api/auth/userLogin` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### **Testing:**
- `GET /api/health` - Health check
- `GET /api/test-db` - Database connection test
- `GET /api/test` - Basic API test

## 🎨 **User Interface**

### **Main Page:**
- Visit: `http://localhost:3000`
- Choose between Admin and User access

### **Demo Page:**
- Visit: `http://localhost:3000/auth-demo`
- See all authentication features

## 📊 **Database Collections**

The system will automatically create:

### **`users` Collection:**
```javascript
{
  _id: "user_timestamp_random",
  name: "User Name",
  email: "user@example.com",
  password: "hashed_password",
  role: "admin" | "user",
  createdAt: Date,
  updatedAt: Date
}
```

### **`blogs` Collection:**
```javascript
{
  _id: "blog_timestamp_random",
  title: "Blog Title",
  content: "Blog content...",
  author: "Author Name",
  category: "Technology",
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 **Testing Steps**

### 1. **Test Database Connection:**
```bash
curl http://localhost:3000/api/test-db
```

### 2. **Create Admin Account:**
1. Visit: `http://localhost:3000/admin/signup`
2. Fill out the form
3. Submit and verify success

### 3. **Create User Account:**
1. Visit: `http://localhost:3000/user/signup`
2. Fill out the form
3. Submit and verify success

### 4. **Test Login:**
1. Visit: `http://localhost:3000/admin/login`
2. Login with admin credentials
3. Verify redirect to dashboard

## 🔒 **Security Features**

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ HTTP-only secure cookies
- ✅ Role-based access control
- ✅ Input validation
- ✅ Auto-generated secure IDs

## 🎯 **What's Working**

### **✅ Complete Signup System:**
- Admin signup with validation
- User signup with validation
- Real-time form validation
- Success/error handling
- Auto-redirect after signup

### **✅ Complete Login System:**
- Admin login with authentication
- User login with authentication
- JWT token management
- Role-based redirects
- Session management

### **✅ Database Integration:**
- MongoDB Atlas connection
- Automatic collection creation
- Secure data storage
- User and blog management

## 🚨 **Troubleshooting**

### **If API returns 404:**
1. Restart the development server
2. Check the API route structure
3. Verify the database connection

### **If database connection fails:**
1. Check MongoDB Atlas network access
2. Verify username/password
3. Ensure IP is whitelisted

### **If signup/login doesn't work:**
1. Check browser console for errors
2. Test the database connection
3. Verify API endpoints are accessible

## 🎉 **Ready to Use!**

Your client info entry system is now fully configured with:
- ✅ MongoDB Atlas integration
- ✅ Complete authentication system
- ✅ Admin and user signup/login
- ✅ Secure data storage
- ✅ Modern UI/UX

Start by visiting `http://localhost:3000` and creating your first admin account! 