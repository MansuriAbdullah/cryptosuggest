# CryptoSuggest Backend API

Node.js / Express / MongoDB REST API for the CryptoSuggest website directory.

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Register, Login, Profile
│   ├── categoryController.js
│   ├── contactController.js
│   ├── reviewController.js
│   ├── userController.js  # Bookmarks, Submissions
│   └── websiteController.js
├── middleware/
│   └── auth.js            # JWT protect + authorize
├── models/
│   ├── Contact.js
│   ├── Review.js
│   ├── User.js
│   └── Website.js
├── routes/
│   ├── auth.js
│   ├── categories.js
│   ├── contacts.js
│   ├── reviews.js
│   ├── users.js
│   └── websites.js
├── scripts/
│   └── seed.js            # Database seeder
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## ⚙️ Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Configure environment** – copy `.env.example` to `.env` and fill in values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cryptosuggest
   JWT_SECRET=your_secret_here
   JWT_EXPIRE=30d
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Seed the database** (optional – loads sample websites + creates default users)
   ```
   npm run seed
   ```
   Default accounts after seeding:
   | Role  | Email                         | Password    |
   |-------|-------------------------------|-------------|
   | Admin | admin@cryptosuggest.com       | Admin@12345 |
   | User  | user@cryptosuggest.com        | User@12345  |

4. **Start the server**
   ```
   npm run dev     # development (nodemon)
   npm start       # production
   ```

## 🔌 API Endpoints

| Method | Endpoint                          | Auth     | Description                  |
|--------|-----------------------------------|----------|------------------------------|
| GET    | /api/health                       | Public   | Health check                 |
| POST   | /api/auth/register                | Public   | Register user                |
| POST   | /api/auth/login                   | Public   | Login                        |
| GET    | /api/auth/me                      | Private  | Get current user             |
| PUT    | /api/auth/me                      | Private  | Update profile               |
| GET    | /api/websites                     | Public   | List websites (with filters) |
| GET    | /api/websites/:slug               | Public   | Single website               |
| POST   | /api/websites                     | Private  | Submit website               |
| POST   | /api/websites/:id/click           | Public   | Track click                  |
| GET    | /api/websites/admin/all           | Admin    | All websites (admin)         |
| PUT    | /api/websites/admin/:id           | Admin    | Approve/reject               |
| GET    | /api/categories                   | Public   | All categories               |
| GET    | /api/users/bookmarks              | Private  | Get bookmarks                |
| POST   | /api/users/bookmarks/:websiteId   | Private  | Add bookmark                 |
| DELETE | /api/users/bookmarks/:websiteId   | Private  | Remove bookmark              |
| GET    | /api/users/submissions            | Private  | User's submissions           |
| GET    | /api/users/admin                  | Admin    | All users                    |
| POST   | /api/contacts                     | Public   | Submit contact form          |
| GET    | /api/contacts/admin               | Admin    | All contacts (admin)         |
| PUT    | /api/contacts/admin/:id           | Admin    | Update contact status        |
| GET    | /api/reviews/website/:websiteId   | Public   | Get reviews                  |
| POST   | /api/reviews/website/:websiteId   | Private  | Add review                   |
| DELETE | /api/reviews/:id                  | Private  | Delete review                |

## 🔍 Query Parameters for GET /api/websites

| Param    | Example                   | Description             |
|----------|---------------------------|-------------------------|
| category | ?category=Crypto Exchanges| Filter by category      |
| featured | ?featured=true            | Featured only           |
| search   | ?search=binance           | Full-text search        |
| sort     | ?sort=trust               | trust/reviews/newest    |
| page     | ?page=2                   | Pagination              |
| limit    | ?limit=10                 | Results per page        |
