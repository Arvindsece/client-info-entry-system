# Setup Guide for Client Info Entry System

## Quick Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory with:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/client-info-system?retryWrites=true&w=majority
MONGODB_DB=client-info-system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 2. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace the placeholder in `.env.local`

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access the Application
- Main page: http://localhost:3000
- Admin signup: http://localhost:3000/admin/signup
- User signup: http://localhost:3000/user/signup

## Features Available

### Signup Pages
- **Admin Signup**: `/admin/signup` - Create admin accounts
- **User Signup**: `/user/signup` - Create user accounts

### Login Pages
- **Admin Login**: `/admin/login` - Admin authentication
- **User Login**: `/user/userLogin` - User authentication

### Admin Features
- **Dashboard**: `/admin/dashboard` - Overview and blog management
- **Create Blog**: `/admin/create` - Add new blog posts
- **Edit Blog**: `/admin/edit/[id]` - Modify existing blogs
- **Profile**: `/admin/profile` - Admin profile management

### User Features
- **Information List**: `/user/listofinformation` - Browse blogs
- **Blog Detail**: `/user/[id]` - Read full blog content
- **Terms**: `/user/terms&Conditions` - Legal information
- **Profile**: `/user/userProfile` - User profile management

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - Admin login
- `POST /api/auth/userLogin` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `GET /api/blogs/[id]` - Get specific blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

## Testing the API

You can test the API endpoints using:

1. **Test API**: http://localhost:3000/api/test
2. **Database Test**: http://localhost:3000/api/db-test

## Troubleshooting

### Common Issues

1. **404 Errors**: Make sure all API routes are in the correct folders
2. **Database Connection**: Verify your MongoDB Atlas connection string
3. **Environment Variables**: Ensure `.env.local` is in the root directory

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ HTTP-only cookies
- ✅ Input validation
- ✅ Role-based access control
- ✅ Auto-generated secure IDs

## Performance Features

- ✅ Optimized database queries
- ✅ Client-side caching
- ✅ Responsive design
- ✅ Fast page loads
- ✅ Modern UI/UX 