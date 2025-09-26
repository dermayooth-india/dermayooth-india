# DERMAYOOTH - Complete Website with Admin Panel

A complete e-commerce website for DERMAYOOTH skincare products with a fully functional admin panel.

## Features

### Frontend
- Modern, responsive design with black, white, and grey theme
- Product catalog with detailed product pages
- Video backgrounds and image sliders
- WhatsApp integration for orders and quotes
- SEO optimized

### Backend & Admin Panel
- Complete product management (CRUD operations)
- Image and video upload system
- Site settings management
- Review moderation system
- JWT-based authentication
- MongoDB database integration

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **File Upload**: Cloudinary (optional) or local storage
- **UI Components**: Radix UI, Lucide React icons

## Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- Git installed

### 1. Clone and Setup

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd dermayooth-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
\`\`\`

### 2. Configure Environment Variables

Edit `.env.local` with your settings:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/dermayooth
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CLOUDINARY_CLOUD_NAME=your-cloud-name (optional)
CLOUDINARY_API_KEY=your-api-key (optional)
CLOUDINARY_API_SECRET=your-api-secret (optional)
\`\`\`

### 3. Start MongoDB

**Option A: Local MongoDB**
\`\`\`bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
\`\`\`

**Option B: MongoDB Atlas**
- Create account at https://cloud.mongodb.com
- Create cluster and get connection string
- Update MONGODB_URI in .env.local

### 4. Initialize Database

\`\`\`bash
# Run the development server
npm run dev

# The database will be automatically initialized with:
# - Default admin user
# - Sample products
# - Site settings
\`\`\`

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

**Default Admin Credentials:**
- Email: admin@dermayooth.com , dermayooth@gmail.com
- Password: DermaYooth2024!

## Project Structure

\`\`\`
dermayooth-website/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── admin/         # Admin API endpoints
│   │   └── products/      # Public product APIs
│   ├── admin/             # Admin panel pages
│   ├── home/              # Main website pages
│   └── products/          # Product pages
├── components/            # React components
│   ├── ui/               # UI components
│   └── admin/            # Admin components
├── lib/                  # Utility libraries
│   ├── models/           # MongoDB models
│   ├── auth.ts           # Authentication utilities
│   ├── mongodb.ts        # Database connection
│   └── validation.ts     # Input validation
└── public/               # Static assets
\`\`\`

## Admin Panel Features

### Dashboard
- Overview statistics
- Recent activity
- Quick actions

### Product Management
- Add/Edit/Delete products
- Image upload and management
- Category management
- Status control (active/inactive/draft/archived)
- SEO settings

### Content Management
- Site settings (logo, contact info, social media)
- Homepage video management
- Image slider management
- About page content

### Review System
- Customer review moderation
- Approve/reject reviews
- Review analytics

## API Endpoints

### Public APIs
- `GET /api/products` - Get all active products
- `GET /api/products/[id]` - Get single product
- `GET /api/site-settings` - Get site configuration

### Admin APIs (Require Authentication)
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/auth/verify` - Verify token
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `POST /api/admin/upload` - Upload images
- `GET /api/admin/reviews` - Get reviews
- `PUT /api/admin/reviews/[id]` - Update review status

## Database Schema

### Products
- Basic info (name, description, price, category)
- Images array
- Benefits and ingredients
- Specifications
- SEO metadata
- Status and ordering

### Admin Users
- Authentication credentials
- Role-based access
- Activity tracking

### Site Settings
- Global configuration
- Contact information
- Social media links
- Theme settings

### Reviews
- Customer feedback
- Rating system
- Moderation status

## Deployment

### Local Development
\`\`\`bash
npm run dev
\`\`\`

### Production Build
\`\`\`bash
npm run build
npm start
\`\`\`

### Environment Setup for Production
1. Set strong JWT_SECRET
2. Configure production MongoDB URI
3. Set up Cloudinary for image hosting
4. Configure domain settings

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Joi
- Protected admin routes
- File type validation for uploads
- XSS protection

## Customization

### Adding New Product Fields
1. Update Product model in `lib/models/Product.ts`
2. Update validation in `lib/validation.ts`
3. Update admin forms
4. Update frontend display

### Styling Changes
- Edit `app/globals.css` for global styles
- Modify Tailwind config in `tailwind.config.ts`
- Update component styles in respective files

### Adding New Admin Features
1. Create new API routes in `app/api/admin/`
2. Add new admin pages in `app/admin/`
3. Update navigation in admin layout

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in .env.local
- Verify network access for MongoDB Atlas

**Image Upload Issues**
- Check Cloudinary configuration
- Verify file permissions for local uploads
- Ensure proper file types

**Authentication Problems**
- Verify JWT_SECRET is set
- Check token expiration
- Clear browser localStorage

### Support
For issues and questions, please check the documentation or create an issue in the repository.

## License
This project is proprietary software for DERMAYOOTH.
