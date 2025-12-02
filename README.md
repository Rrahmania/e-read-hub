# E-Read Hub Backend

Backend API untuk aplikasi E-Read Hub menggunakan Node.js, Express, dan MongoDB.

## Setup

### 1. Install Dependencies

\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Setup Environment Variables

Buat file `.env` berdasarkan `.env.example`:

\`\`\`bash
cp .env.example .env
\`\`\`

Isi variabel di `.env`:
- \`MONGODB_URI\` - Connection string MongoDB
- \`JWT_SECRET\` - Secret key untuk JWT (gunakan string random yang panjang)
- \`PORT\` - Port server (default: 5000)

### 3. Setup MongoDB

Pilih salah satu:

**Option A: MongoDB Local**
- Install MongoDB Community Edition
- Pastikan mongod service berjalan

**Option B: MongoDB Atlas (Cloud)**
- Buat akun di [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Buat cluster baru
- Dapatkan connection string
- Ganti \`MONGODB_URI\` di `.env`

### 4. Jalankan Server

**Development (dengan auto-reload):**
\`\`\`bash
npm run dev
\`\`\`

**Production:**
\`\`\`bash
npm start
\`\`\`

Server akan berjalan di http://localhost:5000

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register user baru
- \`POST /api/auth/login\` - Login user
- \`POST /api/auth/logout\` - Logout
- \`GET /api/auth/me\` - Get current user (butuh token)

### Books
- \`GET /api/books\` - Get semua buku
- \`GET /api/books/:id\` - Get buku by ID
- \`POST /api/books\` - Create buku (admin only)
- \`PUT /api/books/:id\` - Update buku (admin only)
- \`DELETE /api/books/:id\` - Delete buku (admin only)

### Favorites
- \`GET /api/favorites\` - Get favorites user (butuh token)
- \`POST /api/favorites\` - Add ke favorites (butuh token)
- \`DELETE /api/favorites/:bookId\` - Remove dari favorites (butuh token)
- \`GET /api/favorites/check/:bookId\` - Check if book is favorited (butuh token)

## Testing API

Gunakan Postman atau tools serupa:

### Register
\`\`\`
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
\`\`\`

### Login
\`\`\`
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

Response akan berisi token JWT. Gunakan token ini di header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Folder Structure

\`\`\`
backend/
├── config/        # Database configuration
├── controllers/   # Business logic
├── middleware/    # Express middleware
├── models/        # MongoDB schemas
├── routes/        # API routes
├── .env.example   # Environment template
├── package.json
└── server.js      # Main entry point
\`\`\`

## Next Steps

1. Sesuaikan \`MONGODB_URI\` di `.env`
2. Jalankan \`npm install\`
3. Jalankan \`npm run dev\`
4. Test API dengan Postman
5. Update frontend untuk menggunakan API ini
