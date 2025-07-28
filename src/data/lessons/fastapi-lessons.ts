import type { Category } from '../../types';

export const fastapiCategory: Category = {
  id: 'fastapi',
  name: 'FastAPI',
  icon: '⚡',
  lessons: [
    {
      id: 'fastapi-setup',
      title: 'FastAPI Setup & Framework Basics',
      subtitle: 'Build modern, fast APIs with automatic documentation and type safety',
      meta: {
        duration: '12 min read',
        difficulty: 'Beginner'
      },
      content: {
        explanation: 'FastAPI is a modern, high-performance web framework for building APIs with Python. It provides automatic API documentation, data validation, serialization, and is built on top of Starlette and Pydantic. FastAPI automatically generates OpenAPI and JSON Schema documentation.',
        codeExample: {
          language: 'python',
          filename: 'main.py',
          code: `from fastapi import FastAPI, HTTPException
from typing import Optional
import uvicorn

# Create FastAPI application with metadata
app = FastAPI(
    title="Learning API",
    description="A comprehensive API for learning FastAPI",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc"  # ReDoc
)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to FastAPI!",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Path parameters with type hints
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    if user_id < 1:
        raise HTTPException(status_code=400, detail="Invalid user ID")
    return {"user_id": user_id, "name": f"User {user_id}"}

# Query parameters
@app.get("/items/")
async def read_items(skip: int = 0, limit: int = 10, q: Optional[str] = None):
    items = [{"id": i, "name": f"Item {i}"} for i in range(skip, skip + limit)]
    if q:
        items = [item for item in items if q.lower() in item["name"].lower()]
    return {"items": items, "total": len(items)}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "framework": "FastAPI"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
        },
        interactiveCode: {
          defaultCode: `# FastAPI Framework Demo
from fastapi import FastAPI, HTTPException, Query
from typing import Optional, List
from enum import Enum

app = FastAPI(title="Demo API", version="1.0.0")

# Simulated database
books = [
    {"id": 1, "title": "Python Guide", "author": "Alice", "genre": "Programming", "rating": 4.5},
    {"id": 2, "title": "FastAPI Tutorial", "author": "Bob", "genre": "Programming", "rating": 4.8},
    {"id": 3, "title": "Web Development", "author": "Charlie", "genre": "Programming", "rating": 4.3}
]

# Enum for genre filtering
class BookGenre(str, Enum):
    programming = "Programming"
    fiction = "Fiction"
    non_fiction = "Non-Fiction"

@app.get("/")
async def welcome():
    return {
        "message": "📚 FastAPI Bookstore API",
        "endpoints": {
            "books": "/books",
            "search": "/books/search",
            "book_detail": "/books/{book_id}",
            "docs": "/docs"
        }
    }

@app.get("/books")
async def get_books(
    genre: Optional[BookGenre] = None,
    min_rating: float = Query(0.0, ge=0.0, le=5.0, description="Minimum rating filter"),
    limit: int = Query(10, gt=0, le=100, description="Number of books to return")
):
    """Get all books with optional filtering by genre and rating."""
    filtered_books = books
    
    if genre:
        filtered_books = [book for book in filtered_books if book["genre"] == genre.value]
    
    filtered_books = [book for book in filtered_books if book["rating"] >= min_rating]
    
    return {
        "books": filtered_books[:limit],
        "total": len(filtered_books),
        "filters": {"genre": genre, "min_rating": min_rating}
    }

@app.get("/books/{book_id}")
async def get_book(book_id: int):
    """Get a specific book by ID."""
    book = next((book for book in books if book["id"] == book_id), None)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@app.get("/books/search/")
async def search_books(q: str = Query(..., min_length=2, description="Search query")):
    """Search books by title or author."""
    results = [
        book for book in books 
        if q.lower() in book["title"].lower() or q.lower() in book["author"].lower()
    ]
    return {"query": q, "results": results, "count": len(results)}

# Simulate API calls
print("⚡ FastAPI Demo Results:")

print("\\n📖 GET /")
print(welcome())

print("\\n📚 GET /books?genre=Programming&min_rating=4.0")
print(get_books(genre=BookGenre.programming, min_rating=4.0, limit=10))

print("\\n📖 GET /books/1")
print(get_book(1))

print("\\n🔍 GET /books/search/?q=FastAPI")
print(search_books("FastAPI"))

print("\\n❌ GET /books/999 (Not Found)")
try:
    print(get_book(999))
except HTTPException as e:
    print(f"Error {e.status_code}: {e.detail}")`,
          simulatedOutput: `⚡ FastAPI Demo Results:

📖 GET /
{'message': '📚 FastAPI Bookstore API', 'endpoints': {'books': '/books', 'search': '/books/search', 'book_detail': '/books/{book_id}', 'docs': '/docs'}}

📚 GET /books?genre=Programming&min_rating=4.0
{'books': [{'id': 1, 'title': 'Python Guide', 'author': 'Alice', 'genre': 'Programming', 'rating': 4.5}, {'id': 2, 'title': 'FastAPI Tutorial', 'author': 'Bob', 'genre': 'Programming', 'rating': 4.8}, {'id': 3, 'title': 'Web Development', 'author': 'Charlie', 'genre': 'Programming', 'rating': 4.3}], 'total': 3, 'filters': {'genre': <BookGenre.programming: 'Programming'>, 'min_rating': 4.0}}

📖 GET /books/1
{'id': 1, 'title': 'Python Guide', 'author': 'Alice', 'genre': 'Programming', 'rating': 4.5}

🔍 GET /books/search/?q=FastAPI
{'query': 'FastAPI', 'results': [{'id': 2, 'title': 'FastAPI Tutorial', 'author': 'Bob', 'genre': 'Programming', 'rating': 4.8}], 'count': 1}

❌ GET /books/999 (Not Found)
Error 404: Book not found`
        },
        quiz: {
          question: 'What is the main advantage of FastAPI over traditional Flask APIs?',
          options: [
            { text: 'FastAPI is faster to write code', isCorrect: false, explanation: 'While FastAPI can be faster to develop with, the main advantage is automatic documentation and validation.' },
            { text: 'Automatic API documentation generation and built-in data validation with type hints', isCorrect: true, explanation: 'Correct! FastAPI automatically generates OpenAPI documentation and validates request/response data using Python type hints.' },
            { text: 'FastAPI only works with databases', isCorrect: false, explanation: 'FastAPI works with or without databases, just like Flask.' },
            { text: 'FastAPI requires less memory', isCorrect: false, explanation: 'Memory usage depends on your application, not the framework choice.' }
          ]
        }
      }
    },
    {
      id: 'fastapi-models',
      title: 'Data Models & Validation',
      subtitle: 'Use Pydantic models for automatic validation and serialization',
      meta: {
        duration: '16 min read',
        difficulty: 'Intermediate'
      },
      content: {
        explanation: 'Pydantic models provide automatic data validation, serialization, and documentation. FastAPI uses these models to validate request bodies, query parameters, and generate API schemas automatically.',
        codeExample: {
          language: 'python',
          filename: 'models.py',
          code: `from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    user = "user"
    moderator = "moderator"

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
    role: UserRole = UserRole.user
    
    @validator('username')
    def username_alphanumeric(cls, v):
        assert v.isalnum(), 'Username must be alphanumeric'
        return v

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: UserRole
    created_at: datetime
    is_active: bool = True
    
    class Config:
        # Allow conversion from ORM models
        from_attributes = True

class PostCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    content: str = Field(..., min_length=10)
    tags: Optional[List[str]] = []

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    tags: List[str]
    created_at: datetime
    updated_at: Optional[datetime] = None`
        },
        interactiveCode: {
          defaultCode: `# Pydantic Models with FastAPI Demo
from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum
from fastapi import FastAPI, HTTPException

app = FastAPI(title="Blog API with Pydantic")

# Enums for validation
class PostStatus(str, Enum):
    draft = "draft"
    published = "published"
    archived = "archived"

# Pydantic models
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20, description="Username must be 3-20 characters")
    email: EmailStr = Field(..., description="Valid email address required")
    age: int = Field(..., ge=13, le=120, description="Age must be between 13 and 120")
    
    @validator('username')
    def validate_username(cls, v):
        if not v.isalnum():
            raise ValueError('Username must contain only letters and numbers')
        return v.lower()

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    age: int
    created_at: datetime
    
class PostCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    content: str = Field(..., min_length=20, description="Post content must be at least 20 characters")
    status: PostStatus = PostStatus.draft
    tags: Optional[List[str]] = Field(default=[], max_items=5)
    
    @validator('tags')
    def validate_tags(cls, v):
        if v:
            # Remove duplicates and limit length
            v = list(set(tag.strip().lower() for tag in v if tag.strip()))
        return v

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    status: PostStatus
    tags: List[str]
    author_id: int
    created_at: datetime

# Simulated database
users_db = []
posts_db = []

@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate):
    """Create a new user with validation."""
    # Check if username already exists
    if any(u["username"] == user.username for u in users_db):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Create user
    new_user = {
        "id": len(users_db) + 1,
        "username": user.username,
        "email": user.email,
        "age": user.age,
        "created_at": datetime.now()
    }
    users_db.append(new_user)
    return UserResponse(**new_user)

@app.post("/posts/", response_model=PostResponse)
async def create_post(post: PostCreate, author_id: int = 1):
    """Create a new post with validation."""
    # Validate author exists
    if not any(u["id"] == author_id for u in users_db):
        raise HTTPException(status_code=404, detail="Author not found")
    
    new_post = {
        "id": len(posts_db) + 1,
        "title": post.title,
        "content": post.content,
        "status": post.status,
        "tags": post.tags,
        "author_id": author_id,
        "created_at": datetime.now()
    }
    posts_db.append(new_post)
    return PostResponse(**new_post)

@app.get("/users/", response_model=List[UserResponse])
async def get_users():
    """Get all users."""
    return [UserResponse(**user) for user in users_db]

# Demo the models and validation
print("🔍 FastAPI Pydantic Models Demo")

# Simulate API calls
def simulate_user_creation():
    print("\\n👤 Creating Valid User:")
    try:
        user_data = UserCreate(
            username="Alice123",
            email="alice@example.com",
            age=25
        )
        result = create_user(user_data)
        print(f"✅ User created: {result.dict()}")
    except Exception as e:
        print(f"❌ Error: {e}")

def simulate_invalid_user():
    print("\\n❌ Attempting Invalid User (bad email):")
    try:
        user_data = UserCreate(
            username="bob",
            email="invalid-email",  # Invalid email
            age=30
        )
        print("This shouldn't print due to validation error")
    except Exception as e:
        print(f"❌ Validation Error: {e}")

def simulate_post_creation():
    print("\\n📝 Creating Valid Post:")
    try:
        post_data = PostCreate(
            title="My First FastAPI Post",
            content="This is a detailed post about learning FastAPI with Pydantic models for validation.",
            status=PostStatus.published,
            tags=["fastapi", "python", "API", "FastAPI"]  # Will remove duplicate "fastapi"
        )
        result = create_post(post_data, author_id=1)
        print(f"✅ Post created: {result.dict()}")
    except Exception as e:
        print(f"❌ Error: {e}")

# Run simulations
simulate_user_creation()
simulate_invalid_user()
simulate_post_creation()

print("\\n📊 Current Database State:")
print(f"Users: {len(users_db)}")
print(f"Posts: {len(posts_db)}")`,
           simulatedOutput: `🔍 FastAPI Pydantic Models Demo

👤 Creating Valid User:
✅ User created: {'id': 1, 'username': 'alice123', 'email': 'alice@example.com', 'age': 25, 'created_at': '2024-01-28T15:30:45'}

❌ Attempting Invalid User (bad email):
❌ Validation Error: 1 validation error for UserCreate
email
  field required (type=value_error.missing)

📝 Creating Valid Post:
✅ Post created: {'id': 1, 'title': 'My First FastAPI Post', 'content': 'This is a detailed post about learning FastAPI with Pydantic models for validation.', 'status': <PostStatus.published: 'published'>, 'tags': ['fastapi', 'python', 'api'], 'author_id': 1, 'created_at': '2024-01-28T15:30:46'}

📊 Current Database State:
Users: 1
Posts: 1`
         },
        quiz: {
          question: 'What is the purpose of Pydantic validators in FastAPI models?',
          options: [
            { text: 'To make the API faster', isCorrect: false, explanation: 'Validators add processing overhead but provide data integrity benefits.' },
            { text: 'To add custom validation logic beyond basic type checking', isCorrect: true, explanation: 'Correct! Validators allow you to add custom business logic validation beyond what type hints provide.' },
            { text: 'To automatically create database tables', isCorrect: false, explanation: 'Pydantic models are for data validation, not database schema creation.' },
            { text: 'To generate API documentation', isCorrect: false, explanation: 'While validators appear in docs, their main purpose is data validation.' }
          ]
        }
      }
    },
    {
      id: 'fastapi-database-auth',
      title: 'Database Integration & Authentication',
      subtitle: 'Connect to databases and implement JWT authentication',
      meta: {
        duration: '22 min read',
        difficulty: 'Advanced'
      },
      content: {
        explanation: 'Learn to integrate FastAPI with databases using SQLAlchemy, implement JWT authentication, and create secure endpoints with proper user management and authorization.',
        codeExample: {
          language: 'python',
          filename: 'database.py',
          code: `from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    posts = relationship("Post", back_populates="author")

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    author = relationship("User", back_populates="posts")

# Authentication
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt`
        },
        interactiveCode: {
          defaultCode: `# FastAPI Database & Authentication Demo
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import hashlib
import secrets

app = FastAPI(title="Secure Blog API")

# Simulated database
users_db = {}
posts_db = {}
sessions = {}  # Simple session storage

# Pydantic models
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    author: str
    created_at: datetime

# Authentication functions
def hash_password(password: str) -> str:
    """Hash password using SHA-256 (simplified for demo)."""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash."""
    return hash_password(plain_password) == hashed_password

def create_session_token() -> str:
    """Create a secure session token."""
    return secrets.token_urlsafe(32)

def authenticate_user(username: str, password: str):
    """Authenticate user credentials."""
    user = users_db.get(username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user

def get_current_user(token: str):
    """Get current user from session token."""
    session = sessions.get(token)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    # Check if session is expired
    if datetime.now() > session["expires_at"]:
        del sessions[token]
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired"
        )
    
    username = session["username"]
    user = users_db.get(username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return user

# API Endpoints
@app.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    """Register a new user."""
    if user.username in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    hashed_password = hash_password(user.password)
    user_id = len(users_db) + 1
    
    new_user = {
        "id": user_id,
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password,
        "created_at": datetime.now()
    }
    
    users_db[user.username] = new_user
    
    return UserResponse(
        id=new_user["id"],
        username=new_user["username"],
        email=new_user["email"],
        created_at=new_user["created_at"]
    )

@app.post("/login")
async def login_user(user_login: UserLogin):
    """Login user and create session."""
    user = authenticate_user(user_login.username, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    # Create session
    token = create_session_token()
    sessions[token] = {
        "username": user["username"],
        "expires_at": datetime.now() + timedelta(hours=24)
    }
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_in": 86400  # 24 hours
    }

@app.post("/posts", response_model=PostResponse)
async def create_post(post: PostCreate, token: str):
    """Create a new post (requires authentication)."""
    current_user = get_current_user(token)
    
    post_id = len(posts_db) + 1
    new_post = {
        "id": post_id,
        "title": post.title,
        "content": post.content,
        "author_id": current_user["id"],
        "author": current_user["username"],
        "created_at": datetime.now()
    }
    
    posts_db[post_id] = new_post
    
    return PostResponse(**new_post)

@app.get("/posts", response_model=List[PostResponse])
async def get_posts():
    """Get all posts (public endpoint)."""
    return [PostResponse(**post) for post in posts_db.values()]

@app.get("/users/me", response_model=UserResponse)
async def get_current_user_info(token: str):
    """Get current user information."""
    current_user = get_current_user(token)
    return UserResponse(
        id=current_user["id"],
        username=current_user["username"],
        email=current_user["email"],
        created_at=current_user["created_at"]
    )

# Demo the authentication system
print("🔐 FastAPI Authentication Demo")

print("\\n1️⃣ Registering a new user:")
try:
    user_data = UserCreate(username="alice", email="alice@example.com", password="securepass123")
    result = register_user(user_data)
    print(f"✅ User registered: {result.dict()}")
except HTTPException as e:
    print(f"❌ Error: {e.detail}")

print("\\n2️⃣ Logging in:")
try:
    login_data = UserLogin(username="alice", password="securepass123")
    login_result = login_user(login_data)
    print(f"✅ Login successful: {login_result}")
    access_token = login_result["access_token"]
except HTTPException as e:
    print(f"❌ Login failed: {e.detail}")

print("\\n3️⃣ Creating a post with authentication:")
try:
    post_data = PostCreate(title="My First Secure Post", content="This post was created using authentication!")
    post_result = create_post(post_data, access_token)
    print(f"✅ Post created: {post_result.dict()}")
except HTTPException as e:
    print(f"❌ Error: {e.detail}")

print("\\n4️⃣ Getting user info:")
try:
    user_info = get_current_user_info(access_token)
    print(f"✅ User info: {user_info.dict()}")
except HTTPException as e:
    print(f"❌ Error: {e.detail}")

print("\\n5️⃣ Getting all posts:")
all_posts = get_posts()
print(f"✅ All posts: {[post.dict() for post in all_posts]}")

print(f"\\n📊 Database Summary:")
print(f"Users: {len(users_db)}")
print(f"Posts: {len(posts_db)}")
print(f"Active sessions: {len(sessions)}")`,
          simulatedOutput: `🔐 FastAPI Authentication Demo

1️⃣ Registering a new user:
✅ User registered: {'id': 1, 'username': 'alice', 'email': 'alice@example.com', 'created_at': '2024-01-28T16:45:30'}

2️⃣ Logging in:
✅ Login successful: {'access_token': 'abc123def456ghi789', 'token_type': 'bearer', 'expires_in': 86400}

3️⃣ Creating a post with authentication:
✅ Post created: {'id': 1, 'title': 'My First Secure Post', 'content': 'This post was created using authentication!', 'author': 'alice', 'created_at': '2024-01-28T16:45:31'}

4️⃣ Getting user info:
✅ User info: {'id': 1, 'username': 'alice', 'email': 'alice@example.com', 'created_at': '2024-01-28T16:45:30'}

5️⃣ Getting all posts:
✅ All posts: [{'id': 1, 'title': 'My First Secure Post', 'content': 'This post was created using authentication!', 'author': 'alice', 'created_at': '2024-01-28T16:45:31'}]

📊 Database Summary:
Users: 1
Posts: 1
Active sessions: 1`
        },
        quiz: {
          question: 'What is the main security benefit of using JWT tokens for authentication in FastAPI?',
          options: [
            { text: 'JWT tokens are impossible to hack', isCorrect: false, explanation: 'No authentication method is completely unhackable. Proper implementation and security practices are key.' },
            { text: 'JWT tokens are stateless and contain user information, reducing database queries', isCorrect: true, explanation: 'Correct! JWT tokens are self-contained and stateless, allowing verification without database lookups.' },
            { text: 'JWT tokens automatically encrypt all API data', isCorrect: false, explanation: 'JWT tokens handle authentication, not data encryption. Use HTTPS for data encryption.' },
            { text: 'JWT tokens work only with FastAPI', isCorrect: false, explanation: 'JWT is a standard that works with any framework or language.' }
          ]
        }
      }
    },
    {
      id: 'fastapi-advanced',
      title: 'API Documentation & Advanced Features',
      subtitle: 'Explore advanced FastAPI features: middleware, websockets, and optimization',
      meta: {
        duration: '25 min read',
        difficulty: 'Advanced'
      },
      content: {
        explanation: 'Master advanced FastAPI features including custom middleware, WebSocket connections, background tasks, caching, and performance optimization. Learn to build production-ready APIs with comprehensive documentation.',
        codeExample: {
          language: 'python',
          filename: 'advanced.py',
          code: `from fastapi import FastAPI, BackgroundTasks, WebSocket, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
import asyncio
import time
from typing import List
import uvicorn

app = FastAPI(
    title="Advanced FastAPI Features",
    description="Demonstrating advanced FastAPI capabilities",
    version="2.0.0",
    openapi_tags=[
        {"name": "websockets", "description": "WebSocket operations"},
        {"name": "background", "description": "Background task operations"},
        {"name": "cache", "description": "Caching operations"}
    ]
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Custom middleware for request timing
@app.middleware("http")
async def add_process_time_header(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Background tasks
def send_notification_email(email: str, message: str):
    """Simulate sending email notification."""
    time.sleep(2)  # Simulate email sending delay
    print(f"Email sent to {email}: {message}")

@app.post("/send-notification/")
async def send_notification(
    email: str, 
    message: str, 
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_notification_email, email, message)
    return {"message": "Notification will be sent in background"}

# WebSocket for real-time communication
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Client #{client_id}: {data}")
    except:
        manager.disconnect(websocket)`
        },
        interactiveCode: {
          defaultCode: `# Advanced FastAPI Features Demo
from fastapi import FastAPI, BackgroundTasks, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, List, Optional
import asyncio
import time
from datetime import datetime, timedelta

app = FastAPI(
    title="Advanced Blog API",
    description="Advanced features: caching, background tasks, and monitoring",
    version="2.0.0"
)

# Simple in-memory cache
cache: Dict[str, Dict] = {}
CACHE_TTL = 300  # 5 minutes

class CacheManager:
    @staticmethod
    def get(key: str):
        if key in cache:
            data, expires_at = cache[key]["data"], cache[key]["expires_at"]
            if datetime.now() < expires_at:
                return data
            else:
                del cache[key]
        return None
    
    @staticmethod
    def set(key: str, data, ttl: int = CACHE_TTL):
        cache[key] = {
            "data": data,
            "expires_at": datetime.now() + timedelta(seconds=ttl)
        }

# Models
class ArticleCreate(BaseModel):
    title: str
    content: str
    author: str

class ArticleResponse(BaseModel):
    id: int
    title: str
    content: str
    author: str
    views: int
    created_at: datetime
    reading_time: int  # estimated minutes

class AnalyticsData(BaseModel):
    total_articles: int
    total_views: int
    most_viewed_article: Optional[str]
    cache_hit_rate: float

# Simulated database
articles_db = {}
analytics = {"total_views": 0, "cache_hits": 0, "cache_misses": 0}

# Background task functions
def update_article_analytics(article_id: int):
    """Background task to update analytics."""
    print(f"📊 Updating analytics for article {article_id}")
    time.sleep(1)  # Simulate processing
    analytics["total_views"] += 1
    print(f"📈 Analytics updated. Total views: {analytics['total_views']}")

def generate_reading_recommendations(user_id: int, article_id: int):
    """Background task to generate recommendations."""
    print(f"🤖 Generating recommendations for user {user_id} based on article {article_id}")
    time.sleep(2)  # Simulate ML processing
    print(f"✅ Recommendations generated for user {user_id}")

def estimate_reading_time(content: str) -> int:
    """Estimate reading time based on word count."""
    words = len(content.split())
    return max(1, words // 200)  # Assuming 200 words per minute

# Advanced API endpoints
@app.post("/articles/", response_model=ArticleResponse)
async def create_article(article: ArticleCreate, background_tasks: BackgroundTasks):
    """Create article with background processing."""
    article_id = len(articles_db) + 1
    reading_time = estimate_reading_time(article.content)
    
    new_article = {
        "id": article_id,
        "title": article.title,
        "content": article.content,
        "author": article.author,
        "views": 0,
        "created_at": datetime.now(),
        "reading_time": reading_time
    }
    
    articles_db[article_id] = new_article
    
    # Add background tasks
    background_tasks.add_task(generate_reading_recommendations, 1, article_id)
    
    # Clear cache since we have new data
    cache.clear()
    
    return ArticleResponse(**new_article)

@app.get("/articles/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: int, background_tasks: BackgroundTasks):
    """Get article with caching and view tracking."""
    cache_key = f"article_{article_id}"
    
    # Try to get from cache first
    cached_article = CacheManager.get(cache_key)
    if cached_article:
        analytics["cache_hits"] += 1
        print(f"🎯 Cache hit for article {article_id}")
        
        # Still update analytics in background
        background_tasks.add_task(update_article_analytics, article_id)
        
        return ArticleResponse(**cached_article)
    
    # Cache miss - get from "database"
    analytics["cache_misses"] += 1
    print(f"💾 Cache miss for article {article_id}")
    
    article = articles_db.get(article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Increment view count
    article["views"] += 1
    
    # Cache the result
    CacheManager.set(cache_key, article)
    
    # Update analytics in background
    background_tasks.add_task(update_article_analytics, article_id)
    
    return ArticleResponse(**article)

@app.get("/articles/", response_model=List[ArticleResponse])
async def get_articles(limit: int = 10, skip: int = 0):
    """Get articles with pagination and caching."""
    cache_key = f"articles_list_{skip}_{limit}"
    
    cached_result = CacheManager.get(cache_key)
    if cached_result:
        analytics["cache_hits"] += 1
        print("🎯 Cache hit for articles list")
        return [ArticleResponse(**article) for article in cached_result]
    
    analytics["cache_misses"] += 1
    print("💾 Cache miss for articles list")
    
    all_articles = list(articles_db.values())
    paginated_articles = all_articles[skip:skip + limit]
    
    # Cache the result
    CacheManager.set(cache_key, paginated_articles)
    
    return [ArticleResponse(**article) for article in paginated_articles]

@app.get("/analytics/", response_model=AnalyticsData)
async def get_analytics():
    """Get API analytics and performance metrics."""
    total_requests = analytics["cache_hits"] + analytics["cache_misses"]
    cache_hit_rate = (analytics["cache_hits"] / total_requests * 100) if total_requests > 0 else 0
    
    most_viewed = None
    if articles_db:
        most_viewed_article = max(articles_db.values(), key=lambda x: x["views"])
        most_viewed = most_viewed_article["title"]
    
    return AnalyticsData(
        total_articles=len(articles_db),
        total_views=analytics["total_views"],
        most_viewed_article=most_viewed,
        cache_hit_rate=round(cache_hit_rate, 2)
    )

@app.get("/cache/stats")
async def get_cache_stats():
    """Get cache statistics."""
    return {
        "cache_size": len(cache),
        "cache_hits": analytics["cache_hits"],
        "cache_misses": analytics["cache_misses"],
        "cached_items": list(cache.keys())
    }

# Demo the advanced features
print("🚀 Advanced FastAPI Features Demo")

async def demo_advanced_features():
    print("\\n📝 Creating articles:")
    
    # Create some articles
    article1 = ArticleCreate(
        title="FastAPI Performance Tips",
        content="Learn how to optimize your FastAPI applications for better performance. This includes caching strategies, database optimization, and async programming patterns. " * 10,
        author="Alice"
    )
    
    article2 = ArticleCreate(
        title="Advanced Python Patterns",
        content="Explore advanced Python programming patterns and best practices for building scalable applications. " * 15,
        author="Bob"
    )
    
    # Mock background tasks
    class MockBackgroundTasks:
        def add_task(self, func, *args):
            print(f"🔄 Background task scheduled: {func.__name__}")
    
    bg_tasks = MockBackgroundTasks()
    
    result1 = await create_article(article1, bg_tasks)
    print(f"✅ Article 1 created: {result1.title} (Reading time: {result1.reading_time} min)")
    
    result2 = await create_article(article2, bg_tasks)
    print(f"✅ Article 2 created: {result2.title} (Reading time: {result2.reading_time} min)")
    
    print("\\n📖 Reading articles (testing cache):")
    
    # First read (cache miss)
    article = await get_article(1, bg_tasks)
    print(f"📄 Read article: {article.title} (Views: {article.views})")
    
    # Second read (cache hit)
    article = await get_article(1, bg_tasks)
    print(f"📄 Read article again: {article.title} (Views: {article.views})")
    
    print("\\n📊 Getting analytics:")
    analytics_result = await get_analytics()
    print(f"Analytics: {analytics_result.dict()}")
    
    print("\\n💾 Cache statistics:")
    cache_stats = await get_cache_stats()
    print(f"Cache stats: {cache_stats}")

# Run the demo
import asyncio
asyncio.run(demo_advanced_features())`,
          simulatedOutput: `🚀 Advanced FastAPI Features Demo

📝 Creating articles:
🔄 Background task scheduled: generate_reading_recommendations
✅ Article 1 created: FastAPI Performance Tips (Reading time: 10 min)
🔄 Background task scheduled: generate_reading_recommendations
✅ Article 2 created: Advanced Python Patterns (Reading time: 8 min)

📖 Reading articles (testing cache):
💾 Cache miss for article 1
🔄 Background task scheduled: update_article_analytics
📄 Read article: FastAPI Performance Tips (Views: 1)
🎯 Cache hit for article 1
🔄 Background task scheduled: update_article_analytics
📄 Read article again: FastAPI Performance Tips (Views: 1)

📊 Getting analytics:
Analytics: {'total_articles': 2, 'total_views': 0, 'most_viewed_article': 'FastAPI Performance Tips', 'cache_hit_rate': 50.0}

💾 Cache statistics:
Cache stats: {'cache_size': 1, 'cache_hits': 1, 'cache_misses': 1, 'cached_items': ['article_1']}`
        },
        quiz: {
          question: 'What is the main benefit of using background tasks in FastAPI?',
          options: [
            { text: 'Background tasks make the API faster for all requests', isCorrect: false, explanation: 'Background tasks help specific requests but don\'t improve overall API speed.' },
            { text: 'They allow long-running operations to execute without blocking the API response', isCorrect: true, explanation: 'Correct! Background tasks let you return a response immediately while processing continues in the background.' },
            { text: 'Background tasks automatically cache API responses', isCorrect: false, explanation: 'Background tasks and caching are separate features that serve different purposes.' },
            { text: 'They replace the need for a database', isCorrect: false, explanation: 'Background tasks are for processing, not data storage. You still need a database.' }
          ]
        }
      }
    }
  ]
}; 