# MongoDB Atlas Setup with Your Credentials

## Your MongoDB Atlas Configuration

### Database Details:
- **Username**: `info`
- **Password**: `1234`
- **Cluster**: `cluster0.vppiw.mongodb.net`
- **Database Name**: `client-info`
- **Connection String**: `mongodb+srv://info:1234@cluster0.vppiw.mongodb.net/client-info?retryWrites=true&w=majority`

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
MONGODB_URI=mongodb+srv://info:1234@cluster0.vppiw.mongodb.net/client-info?retryWrites=true&w=majority
MONGODB_DB=client-info
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Database Collections

The system will automatically create these collections in your `client-info` database:

### 1. `users` Collection
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

### 2. `blogs` Collection
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

## Testing the Connection

### 1. Test API Endpoints:
- **Health Check**: `http://localhost:3000/api/health`
- **Database Test**: `http://localhost:3000/api/test-db`
- **API Test**: `http://localhost:3000/api/test`

### 2. Manual Testing:
1. Start the development server: `npm run dev`
2. Visit: `http://localhost:3000`
3. Try creating an admin account: `http://localhost:3000/admin/signup`
4. Try creating a user account: `http://localhost:3000/user/signup`

## Authentication URLs

### Admin Routes:
- **Admin Signup**: `http://localhost:3000/admin/signup`
- **Admin Login**: `http://localhost:3000/admin/login`
- **Admin Dashboard**: `http://localhost:3000/admin/dashboard`

### User Routes:
- **User Signup**: `http://localhost:3000/user/signup`
- **User Login**: `http://localhost:3000/user/userLogin`
- **User Dashboard**: `http://localhost:3000/user/listofinformation`

## Troubleshooting

### If you get 404 errors:
1. Make sure the development server is running
2. Check that all API routes are in the correct folders
3. Verify the MongoDB connection string

### If you get database connection errors:
1. Check your MongoDB Atlas network access settings
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify the username and password are correct

### If signup/login doesn't work:
1. Check the browser console for errors
2. Verify the API routes are accessible
3. Test the database connection using the test endpoints

## Security Notes

- The JWT_SECRET should be changed in production
- The MongoDB password should be more secure in production
- Consider using environment variables for sensitive data

## Next Steps

1. **Test the connection**: Visit `http://localhost:3000/api/test-db`
2. **Create accounts**: Try the signup pages
3. **Test login**: Try logging in with created accounts
4. **Explore features**: Use the admin dashboard and user features

Your MongoDB Atlas is now configured and ready to use with the client info entry system! 