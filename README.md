# Client Info Entry System

A modern, full-stack client information management system built with Next.js and MongoDB Atlas. This system provides separate interfaces for administrators and users to manage and access information.

## Features

### Admin Features
- **Dashboard**: Overview with statistics and recent blogs
- **Blog Management**: Create, edit, and delete blog posts
- **User Management**: View and manage user accounts
- **Profile Management**: Admin profile settings

### User Features
- **Information List**: Browse and filter blog posts
- **Individual Blog View**: Read full blog content
- **Terms & Conditions**: Legal information page
- **User Profile**: Personal profile management

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Authentication**: JWT with bcryptjs
- **Styling**: Custom CSS (no Tailwind)
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client-info-entry-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   MONGODB_DB=client-info-system
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Database Setup**
   - Create a MongoDB Atlas cluster
   - Get your connection string
   - Update the `MONGODB_URI` in `.env.local`
   - The system will automatically create collections on first use

5. **Create Initial Admin User**
   ```bash
   npm run dev
   ```
   Then visit `/admin/login` and create an admin account through the registration link.

## Project Structure

```
client-info-entry-system/
├── app/
│   ├── API/                    # Database and auth utilities
│   │   ├── db.js              # MongoDB connection
│   │   └── auth.js            # Authentication utilities
│   ├── Components/             # Reusable components
│   │   ├── Header.js          # Navigation header
│   │   ├── LoginForm.js       # Login form component
│   │   ├── BlogForm.js        # Blog creation/editing form
│   │   └── BlogCard.js        # Blog display card
│   ├── admin/                  # Admin routes
│   │   ├── login/             # Admin login
│   │   ├── dashboard/         # Admin dashboard
│   │   ├── create/            # Create blog
│   │   ├── edit/[id]/         # Edit blog
│   │   └── profile/           # Admin profile
│   ├── user/                   # User routes
│   │   ├── userLogin/         # User login
│   │   ├── listofinformation/ # Blog list
│   │   ├── [id]/              # Individual blog view
│   │   ├── terms&Conditions/  # Terms page
│   │   └── userProfile/       # User profile
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication APIs
│   │   ├── blogs/             # Blog management APIs
│   │   └── users/             # User management APIs
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Landing page
├── public/                     # Static assets
├── package.json               # Dependencies
└── README.md                  # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/userLogin` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Blogs
- `GET /api/blogs` - Get all blogs (with pagination)
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[id]` - Get specific blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

## Routes

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard with stats
- `/admin/create` - Create new blog
- `/admin/edit/[id]` - Edit existing blog
- `/admin/profile` - Admin profile

### User Routes
- `/user/userLogin` - User login page
- `/user/listofinformation` - Browse all blogs
- `/user/[id]` - View individual blog
- `/user/terms&Conditions` - Terms and conditions
- `/user/userProfile` - User profile

## Development

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Start production server**
   ```bash
   npm start
   ```

## Features

### Security
- JWT-based authentication
- Password hashing with bcryptjs
- HTTP-only cookies
- Role-based access control

### Performance
- Optimized database queries
- Client-side caching
- Responsive design
- Fast page loads

### User Experience
- Clean, modern UI
- Responsive design
- Loading states
- Error handling
- Form validation

## Database Collections

### Users Collection
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

### Blogs Collection
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

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
MONGODB_DB=client-info-system
JWT_SECRET=your_production_jwt_secret
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
