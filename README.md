# Social Feed Backend API

A RESTful backend service for a social media platform featuring user management, posts, likes, follows, and activity feeds. Built with TypeScript, Express, TypeORM, and SQLite.

---

## 🚀 Features

### Core Functionality
- **User Management**: Create and retrieve user profiles
- **Posts**: Create, retrieve, and manage user posts
- **Social Interactions**: Like/unlike posts, follow/unfollow users
- **Activity Feed**: Personalized feed showing posts from followed users
- **Data Validation**: Schema validation using Joi for all API inputs

### Technical Highlights
- **Type-Safe Development**: Full TypeScript implementation for compile-time safety
- **ORM-Based Architecture**: TypeORM for database interactions with entity-relationship modeling
- **Validation Layer**: Request validation using Joi schemas before processing
- **RESTful Design**: Clean API endpoints following REST conventions
- **Relational Data Model**: Properly structured MySQL database with foreign key relationships

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Language** | TypeScript |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **ORM** | TypeORM |
| **Database** | SQLite |
| **Validation** | Joi |

---

## 📁 Project Structure

```
src/
├── controllers/        # Request handlers for each feature
│   ├── ActivityController.ts
│   ├── FollowController.ts
│   ├── LikeController.ts
│   ├── PostController.ts
│   ├── UnfollowController.ts
│   └── UserController.ts
├── entities/          # TypeORM entity definitions
│   ├── User.ts        # User entity with relationships
│   ├── Post.ts        # Post entity linked to users
│   ├── Like.ts        # Like relationship (user + post)
│   └── Follow.ts      # Follow relationship (follower + following)
├── routes/            # API route definitions
│   ├── user.routes.ts
│   ├── post.routes.ts
│   └── ...
├── validations/       # Joi validation schemas
│   ├── user.validation.ts
│   ├── post.validation.ts
│   └── ...
├── middleware/        # Custom middleware (validation, etc.)
└── server.ts          # Application entry point
```

---

## 🗃️ Database Schema

### Entities & Relationships

**User**
- `id` (Primary Key)
- `name`
- `email` (Unique)
- `createdAt`

**Post**
- `id` (Primary Key)
- `userId` (Foreign Key → User)
- `content`
- `createdAt`

**Like**
- `userId` (Foreign Key → User)
- `postId` (Foreign Key → Post)
- Composite Primary Key: (userId, postId)

**Follow**
- `followerId` (Foreign Key → User)
- `followingId` (Foreign Key → User)
- Composite Primary Key: (followerId, followingId)

### Relationships
- User **has many** Posts (one-to-many)
- User **has many** Likes (one-to-many)
- User **has many** Followers (many-to-many via Follow)
- Post **has many** Likes (one-to-many)

---

## 🔌 API Endpoints

### User Management
```http
POST   /api/users              # Create a new user
GET    /api/users/:id          # Get user by ID
```

### Posts
```http
POST   /api/posts              # Create a new post
GET    /api/posts/:id          # Get post by ID
GET    /api/users/:id/posts    # Get all posts by a user
```

### Likes
```http
POST   /api/posts/:id/like     # Like a post
DELETE /api/posts/:id/like     # Unlike a post
```

### Follows
```http
POST   /api/users/:id/follow   # Follow a user
DELETE /api/users/:id/follow   # Unfollow a user
```

### Activity Feed
```http
GET    /api/users/:id/feed     # Get personalized feed (posts from followed users)
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- SQLite (bundled with TypeORM, no separate installation needed)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/NeverSpot/be-intern-assignment.git
   cd be-intern-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_TYPE=sqlite
   DB_DATABASE=./database.sqlite
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```
   
   > **Note**: SQLite uses a local file (`database.sqlite`) instead of a server connection. No separate database installation required.

4. **Initialize the database**
   
   TypeORM will automatically create the SQLite database file on first run. If using migrations:
   ```bash
   npm run typeorm migration:run
   ```
   
   Or with synchronize enabled in TypeORM config, tables will auto-create on server start.

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3000`

---

## 🧪 Example Usage

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Create a Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "content": "Hello, world! This is my first post."
  }'
```

### Follow a User
```bash
curl -X POST http://localhost:3000/api/users/2/follow \
  -H "Content-Type: application/json" \
  -d '{
    "followerId": 1
  }'
```

### Get Activity Feed
```bash
curl http://localhost:3000/api/users/1/feed
```

---

## 🧱 Architecture Decisions

### Controller-Based Design
Each feature has a dedicated controller for single-responsibility handling:
- **FollowController** → Handles follow logic
- **UnfollowController** → Handles unfollow logic  
- **LikeController** → Handles post likes
- **ActivityController** → Handles feed generation

This separation improves maintainability and testability.

### Validation-First Routing
All routes pass through Joi validation middleware before reaching controllers. This ensures:
- Invalid data is rejected early
- Controllers receive clean, validated data
- Consistent error responses for validation failures

### TypeORM Entity Relationships
Proper foreign key constraints and relationships are defined at the entity level, ensuring:
- Referential integrity
- Cascade operations where appropriate
- Type-safe joins and queries

### SQLite for Development
SQLite is used for simplicity and portability:
- **Zero configuration** - No separate database server required
- **File-based** - Entire database stored in a single `.sqlite` file
- **Portable** - Easy to version control, share, or backup
- **Production note** - For production deployment, consider migrating to PostgreSQL/MySQL for better concurrency handling

---

## 📊 Data Flow

```
Request → Route → Validation Middleware → Controller → TypeORM Repository → SQLite
                      ↓                        ↓
                   (Reject)               (Process)
                      ↓                        ↓
                  Error Response        Success Response
```

---

## 🔐 Current Limitations

This project is a foundational implementation. The following features are **not yet implemented**:

- **Authentication**: No JWT-based auth or session management
- **Authorization**: No ownership checks or role-based access control
- **Service Layer**: Controllers interact directly with repositories (no business logic abstraction)
- **Error Handling**: No centralized error handler or custom error classes
- **Transaction Safety**: Follow/unfollow operations don't use database transactions
- **Rate Limiting**: No request throttling or abuse prevention

These are planned enhancements for future iterations.

---

## 🛣️ Roadmap

Future improvements being considered:

- [ ] Add JWT authentication middleware
- [ ] Implement service layer for business logic separation
- [ ] Create centralized error handling
- [ ] Add transaction support for critical operations
- [ ] Add unit and integration tests
- [ ] Implement caching layer (Redis)
- [ ] Add rate limiting

---

## 📝 Development Scripts

```bash
# Development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production build
npm start

# Run TypeORM migrations
npm run typeorm migration:run

# Revert last migration
npm run typeorm migration:revert

# Generate new migration
npm run typeorm migration:generate -- -n MigrationName
```

---

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Your Name**  
- GitHub: [@NeverSpot](https://github.com/NeverSpot)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Built as a learning project to explore backend architecture patterns
- TypeORM documentation and community for ORM best practices
- Express.js ecosystem for middleware patterns

---

**Note**: This project demonstrates foundational backend development skills including API design, data modeling, validation, and ORM usage. It is actively being improved with additional features and architectural enhancements.
