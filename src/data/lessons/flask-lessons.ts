import type { Category } from '../../types';

export const flaskCategory: Category = {
  id: 'flask',
  name: 'Flask Framework',
  icon: '🌶️',
  lessons: [
    {
      id: 'flask-setup',
      title: 'Flask Setup & Framework Basics',
      subtitle: 'Understanding Flask architecture and creating your first web application',
      meta: {
        duration: '12 min read',
        difficulty: 'Beginner'
      },
      content: {
        explanation: 'Flask is a lightweight, flexible web framework for Python. It follows the WSGI standard and provides the essential components for web development: routing, templating, and request handling. Flask is "micro" but extensible - you add only what you need.',
        codeExample: {
          language: 'python',
          filename: 'app.py',
          code: `from flask import Flask, render_template, request

# Create Flask application instance
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Basic route
@app.route('/')
def home():
    return '<h1>Welcome to Flask!</h1><p>A micro web framework for Python.</p>'

# Route with parameter
@app.route('/user/<username>')
def show_user_profile(username):
    return f'<h2>User: {username}</h2>'

# Route with query parameters
@app.route('/search')
def search():
    query = request.args.get('q', 'No query provided')
    return f'<p>Searching for: {query}</p>'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)`
        },
        interactiveCode: {
          defaultCode: `# Flask Application Structure Demo
from flask import Flask, jsonify, request

app = Flask(__name__)

# Store data in memory (normally would use a database)
users = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"}
]

@app.route('/')
def home():
    return {
        "message": "Welcome to Flask API",
        "version": "1.0",
        "endpoints": ["/", "/users", "/users/<id>", "/health"]
    }

@app.route('/users')
def get_users():
    return {"users": users, "count": len(users)}

@app.route('/users/<int:user_id>')
def get_user(user_id):
    user = next((u for u in users if u["id"] == user_id), None)
    if user:
        return user
    return {"error": "User not found"}, 404

@app.route('/health')
def health_check():
    return {
        "status": "healthy", 
        "service": "Flask API",
        "users_count": len(users)
    }

# Simulate running the Flask app
print("🌶️ Flask Application Started!")
print("Available routes:")

# Test the routes
print("\\n📍 GET / ->")
print(home())

print("\\n📍 GET /users ->")
print(get_users())

print("\\n📍 GET /users/1 ->")
print(get_user(1))

print("\\n📍 GET /health ->")
print(health_check())`,
          simulatedOutput: `🌶️ Flask Application Started!
Available routes:

📍 GET / ->
{'message': 'Welcome to Flask API', 'version': '1.0', 'endpoints': ['/', '/users', '/users/<id>', '/health']}

📍 GET /users ->
{'users': [{'id': 1, 'name': 'Alice', 'email': 'alice@example.com'}, {'id': 2, 'name': 'Bob', 'email': 'bob@example.com'}], 'count': 2}

📍 GET /users/1 ->
{'id': 1, 'name': 'Alice', 'email': 'alice@example.com'}

📍 GET /health ->
{'status': 'healthy', 'service': 'Flask API', 'users_count': 2}`
        },
        quiz: {
          question: 'What does the @app.route() decorator do in Flask?',
          options: [
            { text: 'It defines which URL should trigger the function below it', isCorrect: true, explanation: 'Correct! The @app.route() decorator maps URLs to Python functions, defining what happens when someone visits that URL.' },
            { text: 'It automatically creates HTML templates', isCorrect: false, explanation: 'The @app.route() decorator only handles URL mapping. Templates are handled separately with render_template().' },
            { text: 'It validates incoming data', isCorrect: false, explanation: 'Data validation is done within the function or using Flask-WTF, not by the route decorator itself.' },
            { text: 'It sets up the database connection', isCorrect: false, explanation: 'Database connections are typically configured separately, often using Flask-SQLAlchemy.' }
          ]
        }
      }
    },
    {
      id: 'flask-routing',
      title: 'Route Handling & HTTP Methods',
      subtitle: 'Master URL routing, HTTP methods, and request handling',
      meta: {
        duration: '15 min read',
        difficulty: 'Intermediate'
      },
      content: {
        explanation: 'Flask routing allows you to handle different HTTP methods (GET, POST, PUT, DELETE) and create dynamic URLs with parameters. Learn to process form data, handle file uploads, and return different response types.',
        codeExample: {
          language: 'python',
          filename: 'routes.py',
          code: `from flask import Flask, request, jsonify, redirect, url_for

app = Flask(__name__)

# GET route
@app.route('/api/products')
def get_products():
    return jsonify([
        {"id": 1, "name": "Laptop", "price": 999},
        {"id": 2, "name": "Mouse", "price": 25}
    ])

# POST route for creating data
@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()
    # In real app, save to database
    return jsonify({
        "message": "Product created",
        "product": data
    }), 201

# PUT route for updating
@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    return jsonify({
        "message": f"Product {product_id} updated",
        "data": data
    })

# DELETE route
@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    return jsonify({"message": f"Product {product_id} deleted"})`
        },
        interactiveCode: {
          defaultCode: `# Advanced Flask Routing Demo
from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

# Simulated database
blog_posts = [
    {"id": 1, "title": "Flask Basics", "content": "Learn Flask fundamentals", "author": "Alice"},
    {"id": 2, "title": "Python Tips", "content": "Advanced Python tricks", "author": "Bob"}
]

# Multiple HTTP methods on same route
@app.route('/api/posts', methods=['GET', 'POST'])
def handle_posts():
    if request.method == 'GET':
        # Filter posts by author if provided
        author = request.args.get('author')
        if author:
            filtered = [p for p in blog_posts if p['author'].lower() == author.lower()]
            return jsonify({"posts": filtered, "count": len(filtered)})
        return jsonify({"posts": blog_posts, "count": len(blog_posts)})
    
    elif request.method == 'POST':
        # Create new post
        data = request.get_json()
        new_post = {
            "id": len(blog_posts) + 1,
            "title": data.get('title', 'Untitled'),
            "content": data.get('content', ''),
            "author": data.get('author', 'Anonymous')
        }
        blog_posts.append(new_post)
        return jsonify({"message": "Post created", "post": new_post}), 201

# Route with multiple parameters and types
@app.route('/api/posts/<int:post_id>/comments/<string:comment_type>')
def get_comments(post_id, comment_type):
    return jsonify({
        "post_id": post_id,
        "comment_type": comment_type,
        "comments": [f"{comment_type} comment 1", f"{comment_type} comment 2"]
    })

# Custom error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

# Demo the routing
print("🚀 Testing Flask Routes:")

print("\\n📍 GET /api/posts")
print(handle_posts())

print("\\n📍 GET /api/posts?author=Alice")
# Simulate request args
class MockRequest:
    def __init__(self, args=None, method='GET'):
        self.args = args or {}
        self.method = method
    def get_json(self):
        return {"title": "New Post", "content": "Content here", "author": "Charlie"}

# Mock the request object
request = MockRequest({"author": "Alice"})
print(handle_posts())

print("\\n📍 POST /api/posts")
request = MockRequest(method='POST')
print(handle_posts())

print("\\n📍 GET /api/posts/1/comments/recent")
print(get_comments(1, "recent"))`,
          simulatedOutput: `🚀 Testing Flask Routes:

📍 GET /api/posts
{'posts': [{'id': 1, 'title': 'Flask Basics', 'content': 'Learn Flask fundamentals', 'author': 'Alice'}, {'id': 2, 'title': 'Python Tips', 'content': 'Advanced Python tricks', 'author': 'Bob'}], 'count': 2}

📍 GET /api/posts?author=Alice
{'posts': [{'id': 1, 'title': 'Flask Basics', 'content': 'Learn Flask fundamentals', 'author': 'Alice'}], 'count': 1}

📍 POST /api/posts
{'message': 'Post created', 'post': {'id': 3, 'title': 'New Post', 'content': 'Content here', 'author': 'Charlie'}}

📍 GET /api/posts/1/comments/recent
{'post_id': 1, 'comment_type': 'recent', 'comments': ['recent comment 1', 'recent comment 2']}`
        },
        quiz: {
          question: 'How do you accept both GET and POST requests on the same Flask route?',
          options: [
            { text: 'Create two separate routes with the same URL', isCorrect: false, explanation: 'This would cause a conflict. Flask needs to distinguish between different HTTP methods on the same URL.' },
            { text: 'Use @app.route("/path", methods=["GET", "POST"]) and check request.method', isCorrect: true, explanation: 'Correct! You specify multiple methods in the methods parameter and use request.method to determine the HTTP method.' },
            { text: 'Use @app.get() and @app.post() decorators', isCorrect: false, explanation: 'While some frameworks have these, Flask uses the methods parameter in @app.route().' },
            { text: 'Flask automatically handles all HTTP methods', isCorrect: false, explanation: 'Flask routes only accept GET requests by default. You must explicitly specify other methods.' }
          ]
        }
      }
    },
    {
      id: 'flask-database',
      title: 'Database Integration & Models',
      subtitle: 'Connect Flask to databases using SQLAlchemy and manage data models',
      meta: {
        duration: '18 min read',
        difficulty: 'Intermediate'
      },
      content: {
        explanation: 'Flask-SQLAlchemy provides an Object-Relational Mapping (ORM) that lets you work with databases using Python classes instead of SQL. Learn to define models, relationships, and perform CRUD operations.',
        codeExample: {
          language: 'python',
          filename: 'models.py',
          code: `from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Create tables
with app.app_context():
    db.create_all()`
        },
        interactiveCode: {
          defaultCode: `# Flask Database Operations Demo
from flask import Flask, jsonify, request
from datetime import datetime

# Simulated database operations (in real app, use SQLAlchemy)
class DatabaseManager:
    def __init__(self):
        self.users = [
            {"id": 1, "username": "alice", "email": "alice@example.com"},
            {"id": 2, "username": "bob", "email": "bob@example.com"}
        ]
        self.posts = [
            {"id": 1, "title": "Flask Tutorial", "content": "Learning Flask...", "user_id": 1, "date": "2024-01-15"},
            {"id": 2, "title": "Python Tips", "content": "Advanced Python...", "user_id": 2, "date": "2024-01-16"}
        ]
    
    def get_user_by_id(self, user_id):
        return next((u for u in self.users if u["id"] == user_id), None)
    
    def get_posts_by_user(self, user_id):
        return [p for p in self.posts if p["user_id"] == user_id]
    
    def create_user(self, username, email):
        new_user = {
            "id": len(self.users) + 1,
            "username": username,
            "email": email
        }
        self.users.append(new_user)
        return new_user
    
    def create_post(self, title, content, user_id):
        new_post = {
            "id": len(self.posts) + 1,
            "title": title,
            "content": content,
            "user_id": user_id,
            "date": datetime.now().strftime("%Y-%m-%d")
        }
        self.posts.append(new_post)
        return new_post

# Initialize database manager
db = DatabaseManager()

# Flask routes with database operations
def get_users():
    return jsonify({"users": db.users})

def get_user_with_posts(user_id):
    user = db.get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    posts = db.get_posts_by_user(user_id)
    return jsonify({
        "user": user,
        "posts": posts,
        "post_count": len(posts)
    })

def create_user(data):
    username = data.get('username')
    email = data.get('email')
    
    if not username or not email:
        return jsonify({"error": "Username and email required"}), 400
    
    new_user = db.create_user(username, email)
    return jsonify({"message": "User created", "user": new_user}), 201

def create_post(data):
    title = data.get('title')
    content = data.get('content')
    user_id = data.get('user_id')
    
    if not all([title, content, user_id]):
        return jsonify({"error": "Title, content, and user_id required"}), 400
    
    if not db.get_user_by_id(user_id):
        return jsonify({"error": "User not found"}), 404
    
    new_post = db.create_post(title, content, user_id)
    return jsonify({"message": "Post created", "post": new_post}), 201

# Demo database operations
print("🗄️ Flask Database Operations Demo")

print("\\n📋 All Users:")
print(get_users().get_json())

print("\\n👤 User with Posts (ID: 1):")
print(get_user_with_posts(1).get_json())

print("\\n➕ Creating New User:")
new_user_data = {"username": "charlie", "email": "charlie@example.com"}
result = create_user(new_user_data)
print(result.get_json())

print("\\n📝 Creating New Post:")
new_post_data = {"title": "Database Tutorial", "content": "Learning databases with Flask", "user_id": 3}
result = create_post(new_post_data)
print(result.get_json())

print("\\n📊 Final User Count:", len(db.users))
print("📊 Final Post Count:", len(db.posts))`,
          simulatedOutput: `🗄️ Flask Database Operations Demo

📋 All Users:
{'users': [{'id': 1, 'username': 'alice', 'email': 'alice@example.com'}, {'id': 2, 'username': 'bob', 'email': 'bob@example.com'}]}

👤 User with Posts (ID: 1):
{'user': {'id': 1, 'username': 'alice', 'email': 'alice@example.com'}, 'posts': [{'id': 1, 'title': 'Flask Tutorial', 'content': 'Learning Flask...', 'user_id': 1, 'date': '2024-01-15'}], 'post_count': 1}

➕ Creating New User:
{'message': 'User created', 'user': {'id': 3, 'username': 'charlie', 'email': 'charlie@example.com'}}

📝 Creating New Post:
{'message': 'Post created', 'post': {'id': 3, 'title': 'Database Tutorial', 'content': 'Learning databases with Flask', 'user_id': 3, 'date': '2024-01-28'}}

📊 Final User Count: 3
📊 Final Post Count: 3`
        },
        quiz: {
          question: 'In Flask-SQLAlchemy, what does the "backref" parameter do in a relationship?',
          options: [
            { text: 'It creates a foreign key constraint', isCorrect: false, explanation: 'Foreign key constraints are created with db.ForeignKey(). The backref creates a reverse reference.' },
            { text: 'It creates a reverse reference from the related model back to the original model', isCorrect: true, explanation: 'Correct! backref automatically adds a property to the related model that references back to the original model.' },
            { text: 'It validates the relationship data', isCorrect: false, explanation: 'Validation is handled separately, often with Flask-WTF or custom validators.' },
            { text: 'It sets the default value for the relationship', isCorrect: false, explanation: 'Default values are set with the default parameter, not backref.' }
          ]
        }
      }
    },
    {
      id: 'flask-api-best-practices',
      title: 'API Design & Best Practices',
      subtitle: 'Build robust APIs with error handling, validation, and security',
      meta: {
        duration: '20 min read',
        difficulty: 'Advanced'
      },
      content: {
        explanation: 'Professional Flask APIs require proper error handling, input validation, authentication, rate limiting, and comprehensive testing. Learn industry standards for REST API design and security implementation.',
        codeExample: {
          language: 'python',
          filename: 'api_blueprint.py',
          code: `from flask import Blueprint, request, jsonify, current_app
from functools import wraps
import jwt
from datetime import datetime, timedelta

api = Blueprint('api', __name__, url_prefix='/api/v1')

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            # Remove 'Bearer ' prefix
            token = token.replace('Bearer ', '')
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return jsonify({'error': 'Token is invalid'}), 401
        
        return f(*args, **kwargs)
    return decorated

# Input validation decorator
def validate_json(*required_fields):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not request.is_json:
                return jsonify({'error': 'Content-Type must be application/json'}), 400
            
            data = request.get_json()
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                return jsonify({
                    'error': 'Missing required fields',
                    'missing': missing_fields
                }), 400
            
            return f(*args, **kwargs)
        return decorated
    return decorator`
        },
        interactiveCode: {
          defaultCode: `# Flask API Best Practices Demo
from flask import Flask, jsonify, request
from functools import wraps
from datetime import datetime
import re

app = Flask(__name__)

# Custom validators
class Validator:
    @staticmethod
    def email(email):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def password(password):
        # At least 8 chars, 1 uppercase, 1 lowercase, 1 digit
        return (len(password) >= 8 and 
                any(c.isupper() for c in password) and
                any(c.islower() for c in password) and
                any(c.isdigit() for c in password))

# Error handlers
class APIError(Exception):
    def __init__(self, message, status_code=400):
        self.message = message
        self.status_code = status_code

def handle_api_error(error):
    return jsonify({'error': error.message}), error.status_code

# Validation decorator
def validate_request(*required_fields, validators=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not request.is_json:
                raise APIError('Content-Type must be application/json')
            
            data = request.get_json()
            
            # Check required fields
            missing = [field for field in required_fields if field not in data]
            if missing:
                raise APIError(f'Missing required fields: {", ".join(missing)}')
            
            # Run custom validators
            if validators:
                for field, validator_func in validators.items():
                    if field in data and not validator_func(data[field]):
                        raise APIError(f'Invalid {field} format')
            
            return f(*args, **kwargs)
        return decorated
    return decorator

# Rate limiting (simplified)
class RateLimiter:
    def __init__(self):
        self.requests = {}
    
    def is_allowed(self, identifier, limit=10, window=60):
        now = datetime.now().timestamp()
        if identifier not in self.requests:
            self.requests[identifier] = []
        
        # Clean old requests
        self.requests[identifier] = [
            req_time for req_time in self.requests[identifier] 
            if now - req_time < window
        ]
        
        if len(self.requests[identifier]) >= limit:
            return False
        
        self.requests[identifier].append(now)
        return True

rate_limiter = RateLimiter()

def rate_limit(limit=10, window=60):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            client_ip = request.remote_addr or 'unknown'
            if not rate_limiter.is_allowed(client_ip, limit, window):
                raise APIError('Rate limit exceeded', 429)
            return f(*args, **kwargs)
        return decorated
    return decorator

# API endpoints with best practices
@validate_request('email', 'password', validators={
    'email': Validator.email,
    'password': Validator.password
})
@rate_limit(limit=5, window=300)  # 5 requests per 5 minutes
def register_user():
    data = request.get_json()
    
    # Simulate user creation
    user = {
        'id': 123,
        'email': data['email'],
        'created_at': datetime.now().isoformat()
    }
    
    return jsonify({
        'message': 'User registered successfully',
        'user': user
    }), 201

@validate_request('title', 'content')
def create_post():
    data = request.get_json()
    
    # Additional business logic validation
    if len(data['title']) < 5:
        raise APIError('Title must be at least 5 characters long')
    
    if len(data['content']) < 10:
        raise APIError('Content must be at least 10 characters long')
    
    post = {
        'id': 456,
        'title': data['title'],
        'content': data['content'],
        'created_at': datetime.now().isoformat()
    }
    
    return jsonify({
        'message': 'Post created successfully',
        'post': post
    }), 201

# Demo API with error handling
print("🔒 Flask API Best Practices Demo")

print("\\n✅ Valid User Registration:")
try:
    # Mock request data
    request.get_json = lambda: {
        'email': 'user@example.com',
        'password': 'SecurePass123'
    }
    request.is_json = True
    request.remote_addr = '192.168.1.1'
    
    result = register_user()
    print("Status:", result[1])
    print("Response:", result[0].get_json())
except APIError as e:
    print(f"Error: {e.message}")

print("\\n❌ Invalid Email Registration:")
try:
    request.get_json = lambda: {
        'email': 'invalid-email',
        'password': 'SecurePass123'
    }
    result = register_user()
except APIError as e:
    print(f"Error: {e.message}")

print("\\n✅ Valid Post Creation:")
try:
    request.get_json = lambda: {
        'title': 'Flask Best Practices Guide',
        'content': 'This is a comprehensive guide to Flask API development with proper validation and error handling.'
    }
    result = create_post()
    print("Status:", result[1])
    print("Response:", result[0].get_json())
except APIError as e:
    print(f"Error: {e.message}")

print("\\n❌ Invalid Post (Title Too Short):")
try:
    request.get_json = lambda: {
        'title': 'Hi',
        'content': 'This content is long enough but title is too short.'
    }
    result = create_post()
except APIError as e:
    print(f"Error: {e.message}")`,
          simulatedOutput: `🔒 Flask API Best Practices Demo

✅ Valid User Registration:
Status: 201
Response: {'message': 'User registered successfully', 'user': {'id': 123, 'email': 'user@example.com', 'created_at': '2024-01-28T10:30:00'}}

❌ Invalid Email Registration:
Error: Invalid email format

✅ Valid Post Creation:
Status: 201
Response: {'message': 'Post created successfully', 'post': {'id': 456, 'title': 'Flask Best Practices Guide', 'content': 'This is a comprehensive guide to Flask API development with proper validation and error handling.', 'created_at': '2024-01-28T10:30:01'}}

❌ Invalid Post (Title Too Short):
Error: Title must be at least 5 characters long`
        },
        quiz: {
          question: 'What is the main purpose of using decorators in Flask API development?',
          options: [
            { text: 'To make functions run faster', isCorrect: false, explanation: 'Decorators don\'t improve performance. They add functionality to existing functions.' },
            { text: 'To add reusable functionality like authentication, validation, and rate limiting', isCorrect: true, explanation: 'Correct! Decorators allow you to wrap functions with common functionality without modifying the original function code.' },
            { text: 'To convert functions into classes', isCorrect: false, explanation: 'Decorators modify function behavior but don\'t convert them to classes.' },
            { text: 'To automatically generate API documentation', isCorrect: false, explanation: 'While some decorators can help with documentation, that\'s not their primary purpose in Flask API development.' }
          ]
        }
      }
    }
  ]
}; 