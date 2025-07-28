import type { Category } from '../../types';

export const pythonCategory: Category = {
  id: 'python',
  name: 'Python Concepts',
  icon: '🐍',
  lessons: [
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      subtitle: '🟢 Beginner – Foundational Python syntax and semantics',
      meta: {
        duration: '15 min read',
        difficulty: 'Beginner'
      },
      content: {
        explanation: 'Master the foundational elements of Python: syntax rules, variable handling, operators, control structures, and basic functions. These core concepts form the building blocks for all Python programming.',
        codeExample: {
          language: 'python',
          filename: 'core_concepts.py',
          code: `# Syntax & Variables
name = "Alice"           # String
age = 25                # Integer  
height = 5.6            # Float
is_student = True       # Boolean
skills = ["Python", "JavaScript", "SQL"]  # List
profile = {"name": name, "age": age}      # Dictionary

# Control Structures
if age >= 18:
    status = "adult"
elif age >= 13:
    status = "teenager"
else:
    status = "child"

# Loops and Functions
def greet_skills(name, skills):
    print(f"Hello {name}!")
    for i, skill in enumerate(skills, 1):
        print(f"  {i}. {skill}")

greet_skills(name, skills)`
        },
        interactiveCode: {
          defaultCode: `# Core Python Concepts Demo
def analyze_data(data_list):
    """Analyze a list of numbers with core Python concepts."""
    if not data_list:
        return "No data provided"
    
    # Basic statistics
    count = len(data_list)
    total = sum(data_list)
    average = total / count
    
    # Categorize data size
    if count < 5:
        category = "small"
    elif count < 20:
        category = "medium"
    else:
        category = "large"
    
    # Filter positive numbers and square them
    positive_numbers = [x for x in data_list if x > 0]
    positive_squares = [x**2 for x in positive_numbers]
    
    # Create report
    report = f"""Data Analysis Report:
- Count: {count}
- Sum: {total}
- Average: {average:.2f}
- Category: {category}
- Positive squares: {positive_squares}"""
    
    return report

# Demo with sample data
sample_data = [5, -2, 12, 8, 0, -1, 15, 22]
print(analyze_data(sample_data))

# User profile example
user_info = {
    "name": "Bob",
    "scores": [85, 92, 78, 88, 95]
}

print(f"\\nUser: {user_info['name']}")
print(f"Average score: {sum(user_info['scores']) / len(user_info['scores']):.1f}")`,
          simulatedOutput: `Data Analysis Report:
- Count: 8
- Sum: 59
- Average: 7.38
- Category: small
- Positive squares: [25, 144, 64, 225, 484]

User: Bob
Average score: 87.8`
        },
        quiz: {
          question: 'What is the correct way to create a dictionary in Python?',
          options: [
            { text: 'dict = [key: value, key2: value2]', isCorrect: false, explanation: 'This syntax uses square brackets which are for lists, not dictionaries.' },
            { text: 'dict = {key: value, key2: value2}', isCorrect: true, explanation: 'Correct! Dictionaries use curly braces with key-value pairs separated by colons.' },
            { text: 'dict = (key: value, key2: value2)', isCorrect: false, explanation: 'Parentheses with colons is not valid Python syntax.' },
            { text: 'dict = <key: value, key2: value2>', isCorrect: false, explanation: 'Angle brackets are not used for dictionaries in Python.' }
          ]
        }
      }
    },
    {
      id: 'data-structures',
      title: 'Data Structures & Collections',
      subtitle: '🔷 Beginner-Intermediate – Lists, dictionaries, sets, and string operations',
      meta: {
        duration: '18 min read',
        difficulty: 'Beginner'
      },
      content: {
        explanation: 'Master Python\'s built-in data structures: lists for ordered collections, dictionaries for key-value mapping, sets for unique elements, tuples for immutable data, and powerful string operations. Learn to choose the right data structure for each task.',
        codeExample: {
          language: 'python',
          filename: 'data_structures.py',
          code: `# Lists - Ordered, mutable collections
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
fruits.insert(1, "grape")
print(f"Fruits: {fruits}")
print(f"First fruit: {fruits[0]}")
print(f"Last two: {fruits[-2:]}")

# Dictionaries - Key-value pairs
student = {
    "name": "Alice",
    "age": 20,
    "grades": [85, 92, 78],
    "active": True
}
student["major"] = "Computer Science"
print(f"Student: {student['name']}, Age: {student['age']}")

# Sets - Unique elements
colors = {"red", "blue", "green", "red"}  # Duplicate "red" removed
colors.add("yellow")
print(f"Unique colors: {colors}")

# Tuples - Immutable sequences
coordinates = (10, 20)
x, y = coordinates  # Unpacking
print(f"Point at ({x}, {y})")`
        },
        interactiveCode: {
          defaultCode: `# Data Structures Playground
print("=== LISTS ===")
shopping_list = ["milk", "bread", "eggs"]
shopping_list.extend(["butter", "cheese"])
print(f"Shopping list: {shopping_list}")
print(f"List length: {len(shopping_list)}")
print(f"Items with 'e': {[item for item in shopping_list if 'e' in item]}")

print("\\n=== DICTIONARIES ===")
inventory = {
    "laptops": 15,
    "mice": 45, 
    "keyboards": 23,
    "monitors": 8,
    "webcams": 12
}

total_items = sum(inventory.values())
most_stocked = max(inventory, key=inventory.get)
expensive_items = {k: v for k, v in inventory.items() if v > 20}

print(f"Inventory: {inventory}")
print(f"Total items: {total_items}")
print(f"Most stocked: {most_stocked} ({inventory[most_stocked]} units)")
print(f"High stock items: {expensive_items}")

print("\\n=== SETS ===")
python_users = {"Alice", "Bob", "Charlie", "Diana"}
javascript_users = {"Bob", "Diana", "Eve", "Frank"}

both_languages = python_users & javascript_users  # Intersection
all_users = python_users | javascript_users       # Union  
python_only = python_users - javascript_users     # Difference

print(f"Python users: {python_users}")
print(f"JavaScript users: {javascript_users}")
print(f"Know both: {both_languages}")
print(f"All users: {all_users}")
print(f"Python only: {python_only}")

print("\\n=== STRINGS ===")
message = "  Python Programming is Awesome!  "
cleaned = message.strip().lower()
words = cleaned.split()
initials = "".join([word[0] for word in words if word])

print(f"Original: '{message}'")
print(f"Cleaned: '{cleaned}'")
print(f"Word count: {len(words)}")
print(f"Initials: {initials.upper()}")
print(f"Contains 'program': {('program' in cleaned)}")`,
          simulatedOutput: `=== LISTS ===
Shopping list: ['milk', 'bread', 'eggs', 'butter', 'cheese']
List length: 5
Items with 'e': ['cheese']

=== DICTIONARIES ===
Inventory: {'laptops': 15, 'mice': 45, 'keyboards': 23, 'monitors': 8, 'webcams': 12}
Total items: 103
Most stocked: mice (45 units)
High stock items: {'mice': 45, 'keyboards': 23}

=== SETS ===
Python users: {'Alice', 'Bob', 'Charlie', 'Diana'}
JavaScript users: {'Bob', 'Diana', 'Eve', 'Frank'}
Know both: {'Bob', 'Diana'}
All users: {'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'}
Python only: {'Alice', 'Charlie'}

=== STRINGS ===
Original: '  Python Programming is Awesome!  '
Cleaned: 'python programming is awesome!'
Word count: 4
Initials: PPIA
Contains 'program': True`
        },
        quiz: {
          question: 'Which data structure would be most appropriate for storing unique user IDs?',
          options: [
            { text: 'List', isCorrect: false, explanation: 'Lists allow duplicates and don\'t automatically ensure uniqueness.' },
            { text: 'Dictionary', isCorrect: false, explanation: 'Dictionaries are for key-value pairs, not just storing unique values.' },
            { text: 'Set', isCorrect: true, explanation: 'Correct! Sets automatically handle uniqueness and provide fast membership testing.' },
            { text: 'Tuple', isCorrect: false, explanation: 'Tuples are immutable and allow duplicates, not ideal for unique collections.' }
          ]
        }
      }
    },
    {
      id: 'structured-modular',
      title: 'Structured & Modular Programming',
      subtitle: '🟡 Intermediate – Building reusable, maintainable codebases',
      meta: {
        duration: '20 min read',
        difficulty: 'Intermediate'
      },
      content: {
        explanation: 'Learn to structure code using object-oriented programming, handle files effectively, create modules and packages, and implement robust error handling for maintainable applications.',
        codeExample: {
          language: 'python',
          filename: 'oop_example.py',
          code: `class BankAccount:
    def __init__(self, account_holder, initial_balance=0):
        self.account_holder = account_holder
        self._balance = initial_balance
        self._transaction_history = []
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self._balance += amount
        self._transaction_history.append(f"Deposited $\\{amount}")
        return f"New balance: $\\{self._balance}"
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        self._transaction_history.append(f"Withdrew $\\{amount}")
        return f"New balance: $\\{self._balance}"
    
    @property
    def balance(self):
        return self._balance

# Usage
account = BankAccount("Alice", 1000)
print(account.deposit(500))
print(account.withdraw(200))
print(f"Current balance: $\\{account.balance}")`
        },
        interactiveCode: {
          defaultCode: `# Object-Oriented Programming Demo
class BankAccount:
    """A simple bank account with inheritance and encapsulation."""
    
    def __init__(self, account_holder, initial_balance=0):
        self.account_holder = account_holder
        self._balance = initial_balance  # Protected attribute
        self._transaction_history = []
    
    def deposit(self, amount):
        """Deposit money to account."""
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        
        self._balance += amount
        self._transaction_history.append(f"Deposited $\\{amount}")
        return f"New balance: $\\{self._balance}"
    
    def withdraw(self, amount):
        """Withdraw money from account."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        
        self._balance -= amount
        self._transaction_history.append(f"Withdrew $\\{amount}")
        return f"New balance: $\\{self._balance}"
    
    @property
    def balance(self):
        """Get current balance (read-only)."""
        return self._balance
    
    def get_statement(self):
        """Get account statement."""
        return f"Account: \\{self.account_holder}\\nBalance: $\\{self._balance}\\nTransactions: \\{len(self._transaction_history)}"

class SavingsAccount(BankAccount):
    """Savings account with interest calculation."""
    
    def __init__(self, account_holder, initial_balance=0, interest_rate=0.02):
        super().__init__(account_holder, initial_balance)
        self.interest_rate = interest_rate
    
    def add_interest(self):
        """Add interest to the account."""
        interest = self._balance * self.interest_rate
        self._balance += interest
        self._transaction_history.append(f"Interest added: $\\{interest:.2f}")
        return f"Interest added: $\\{interest:.2f}"

# Demo the classes
try:
    # Regular account
    alice_account = BankAccount("Alice", 1000)
    print(alice_account.deposit(500))
    print(alice_account.withdraw(200))
    print(alice_account.get_statement())
    
    print()
    
    # Savings account
    bob_savings = SavingsAccount("Bob", 5000, 0.03)
    print(f"\\n\\{bob_savings.add_interest()}")
    print(bob_savings.get_statement())
    
except ValueError as e:
    print(f"Error: \\{e}")`,
          simulatedOutput: `New balance: $1500
New balance: $1300
Account: Alice
Balance: $1300
Transactions: 2


Interest added: $150.00
Account: Bob
Balance: $5150
Transactions: 1`
        },
        quiz: {
          question: 'What is the purpose of the @property decorator in Python classes?',
          options: [
            { text: 'To make a method static', isCorrect: false, explanation: 'Static methods use @staticmethod decorator, not @property.' },
            { text: 'To create a getter method that can be accessed like an attribute', isCorrect: true, explanation: 'Correct! @property allows you to access a method like an attribute while maintaining encapsulation.' },
            { text: 'To inherit from parent classes', isCorrect: false, explanation: 'Inheritance is handled through class definition syntax, not decorators.' },
            { text: 'To make a method private', isCorrect: false, explanation: 'Python uses naming conventions (underscore prefix) for privacy, not decorators.' }
          ]
        }
      }
    },
    {
      id: 'pythonic-performance',
      title: 'Pythonic & Performance-Oriented Code',
      subtitle: '🔵 Advanced – Writing idiomatic, efficient, and scalable Python',
      meta: {
        duration: '25 min read',
        difficulty: 'Advanced'
      },
      content: {
        explanation: 'Master advanced Python concepts: decorators, generators, context managers, type hints, and performance optimization techniques for writing professional, scalable code.',
        codeExample: {
          language: 'python',
          filename: 'advanced_python.py',
          code: `from typing import Generator, Iterator
import functools
import time

# Decorator example
def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.4f} seconds")
        return result
    return wrapper

# Generator example
def fibonacci_generator(n: int) -> Generator[int, None, None]:
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Context manager example
class FileProcessor:
    def __init__(self, filename: str):
        self.filename = filename
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, 'w')
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

# Usage
@timing_decorator
def process_numbers(numbers: list[int]) -> int:
    return sum(x**2 for x in numbers if x > 0)

# Demo
fib_gen = fibonacci_generator(10)
print(list(fib_gen))`
        },
        interactiveCode: {
          defaultCode: `# Advanced Python Concepts Demo
from typing import List, Generator, Optional
import time

class DataProcessor:
    """Advanced data processor with generators and type hints."""
    
    def __init__(self, chunk_size: int = 1000):
        self.chunk_size = chunk_size
        self._cache: dict = {}
    
    def chunked_reader(self, data: List[int]) -> Generator[List[int], None, None]:
        """Generator that yields data in chunks for memory efficiency."""
        for i in range(0, len(data), self.chunk_size):
            chunk = data[i:i + self.chunk_size]
            print(f"Processing chunk {i//self.chunk_size + 1}: {len(chunk)} items")
            yield chunk
    
    def cached_calculation(self, numbers: List[int]) -> float:
        """Cached expensive calculation."""
        cache_key = str(sorted(numbers))
        
        if cache_key in self._cache:
            print("Cache hit! Using cached result.")
            return self._cache[cache_key]
        
        # Simulate expensive calculation
        print("Cache miss. Calculating...")
        result = sum(x**2 for x in numbers) / len(numbers)
        self._cache[cache_key] = result
        return result

# Context manager class
class PerformanceTimer:
    """Context manager for performance timing."""
    
    def __init__(self, operation_name: str):
        self.operation_name = operation_name
        self.start_time: Optional[float] = None
    
    def __enter__(self):
        self.start_time = time.perf_counter()
        print(f"Starting {self.operation_name}...")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.start_time:
            elapsed = time.perf_counter() - self.start_time
            print(f"{self.operation_name} completed in {elapsed:.4f} seconds")

# Demo the advanced concepts
processor = DataProcessor(chunk_size=3)
large_dataset = list(range(1, 11))  # [1, 2, 3, ..., 10]

print("=== Generator Demo ===")
total_processed = 0
for chunk in processor.chunked_reader(large_dataset):
    total_processed += len(chunk)

print(f"Total items processed: {total_processed}")

print("\\n=== Caching Demo ===")
sample_data = [1, 2, 3, 4, 5]
result1 = processor.cached_calculation(sample_data)
result2 = processor.cached_calculation(sample_data)  # Should hit cache
print(f"Results: {result1:.2f}, {result2:.2f}")

print("\\n=== Context Manager Demo ===")
with PerformanceTimer("List comprehension"):
    squares = [x**2 for x in range(1000)]
    sum_squares = sum(squares)

print(f"Sum of squares: {sum_squares}")`,
          simulatedOutput: `=== Generator Demo ===
Processing chunk 1: 3 items
Processing chunk 2: 3 items
Processing chunk 3: 3 items
Processing chunk 4: 1 items
Total items processed: 10

=== Caching Demo ===
Cache miss. Calculating...
Cache hit! Using cached result.
Results: 11.00, 11.00

=== Context Manager Demo ===
Starting List comprehension...
List comprehension completed in 0.0001 seconds
Sum of squares: 332833500`
        },
        quiz: {
          question: 'What is the main advantage of using generators over regular functions that return lists?',
          options: [
            { text: 'Generators are faster to write', isCorrect: false, explanation: 'The syntax is similar, so writing time is not the main advantage.' },
            { text: 'Generators use memory more efficiently by yielding items one at a time', isCorrect: true, explanation: 'Correct! Generators are memory-efficient because they yield items on-demand rather than creating the entire list in memory.' },
            { text: 'Generators can only be used once', isCorrect: false, explanation: 'This is actually a limitation, not an advantage.' },
            { text: 'Generators automatically cache results', isCorrect: false, explanation: 'Generators don\'t cache by default - caching must be implemented separately.' }
          ]
        }
      }
    },
    {
      id: 'ecosystem-skills',
      title: 'Ecosystem Skills',
      subtitle: '🧪 Cross-cutting – Environment management and development tools',
      meta: {
        duration: '18 min read',
        difficulty: 'Intermediate'
      },
      content: {
        explanation: 'Master the Python ecosystem: virtual environments, dependency management, code formatting, linting, debugging, and package publishing for professional development workflows.',
        codeExample: {
          language: 'bash',
          filename: 'ecosystem_setup.sh',
          code: `# Virtual Environment Setup
python -m venv myproject_env
source myproject_env/bin/activate  # Linux/Mac
# myproject\\Scripts\\activate  # Windows

# Dependency Management
pip install requests flask pytest black flake8
pip freeze > requirements.txt

# Code Quality
black my_module.py          # Auto-format code
flake8 my_module.py        # Lint for style issues
mypy my_module.py          # Type checking

# Testing
pytest tests/ -v           # Run tests with verbose output

# Package Structure
myproject/
├── src/
│   └── myproject/
│       ├── __init__.py
│       └── main.py
├── tests/
├── requirements.txt
├── setup.py
└── README.md`
        },
        interactiveCode: {
          defaultCode: `# Python Ecosystem Best Practices Demo
import os
import sys
from pathlib import Path
from typing import Dict, List, Optional

class ProjectManager:
    """Demonstrate ecosystem tools and best practices."""
    
    def __init__(self, project_name: str):
        self.project_name = project_name
        self.project_path = Path(project_name)
        
    def create_project_structure(self) -> Dict[str, List[str]]:
        """Create a standard Python project structure."""
        directories = [
            "src",
            "tests", 
            "docs",
            "scripts"
        ]
        
        files = [
            "README.md",
            "requirements.txt",
            ".gitignore",
            "setup.py"
        ]
        
        created = {"directories": [], "files": []}
        
        # Simulate directory creation
        for directory in directories:
            created["directories"].append(f"Created: {self.project_name}/{directory}/")
        
        # Simulate file creation  
        for file in files:
            created["files"].append(f"Created: {self.project_name}/{file}")
            
        return created
    
    def generate_requirements(self, packages: List[str]) -> str:
        """Generate requirements.txt content."""
        requirements = []
        
        # Simulate package versions
        version_map = {
            "requests": "2.28.1",
            "flask": "2.2.2", 
            "pytest": "7.1.3",
            "black": "22.8.0",
            "flake8": "5.0.4"
        }
        
        for package in packages:
            version = version_map.get(package, "1.0.0")
            requirements.append(f"{package}=={version}")
            
        return "\\n".join(requirements)
    
    def run_quality_checks(self, code_snippet: str) -> Dict[str, str]:
        """Simulate code quality checks."""
        checks = {}
        
        # Simulate black formatting
        if "def" in code_snippet and not code_snippet.startswith("def "):
            checks["black"] = "✓ Code formatting: PASSED"
        else:
            checks["black"] = "✗ Code formatting: FAILED (inconsistent spacing)"
            
        # Simulate flake8 linting
        if len(code_snippet.split("\\n")) < 10:
            checks["flake8"] = "✓ Style check: PASSED"  
        else:
            checks["flake8"] = "⚠ Style check: WARNING (function too long)"
            
        # Simulate type checking
        if ": " in code_snippet or "->" in code_snippet:
            checks["mypy"] = "✓ Type check: PASSED"
        else:
            checks["mypy"] = "⚠ Type check: WARNING (missing type hints)"
            
        return checks

# Demo the ecosystem tools
manager = ProjectManager("awesome_python_app")

print("=== Project Structure Creation ===")
structure = manager.create_project_structure()
for item in structure["directories"]:
    print(item)
for item in structure["files"]:
    print(item)

print("\\n=== Requirements Generation ===")
packages = ["requests", "flask", "pytest", "black"]
requirements = manager.generate_requirements(packages)
print("requirements.txt content:")
print(requirements)

print("\\n=== Code Quality Demo ===")
sample_code = '''def calculate_average(numbers: List[float]) -> float:
    """Calculate the average of a list of numbers."""
    if not numbers:
        return 0.0
    return sum(numbers) / len(numbers)'''

quality_results = manager.run_quality_checks(sample_code)
for tool, result in quality_results.items():
    print(f"{tool.upper()}: {result}")

print("\\n=== Environment Info ===")
print(f"Python version: {sys.version.split()[0]}")
print(f"Current working directory: {os.getcwd()}")
print(f"Python executable: {sys.executable}")`,
          simulatedOutput: `=== Project Structure Creation ===
Created: awesome_python_app/src/
Created: awesome_python_app/tests/
Created: awesome_python_app/docs/
Created: awesome_python_app/scripts/
Created: awesome_python_app/README.md
Created: awesome_python_app/requirements.txt
Created: awesome_python_app/.gitignore
Created: awesome_python_app/setup.py

=== Requirements Generation ===
requirements.txt content:
requests==2.28.1
flask==2.2.2
pytest==7.1.3
black==22.8.0

=== Code Quality Demo ===
BLACK: ✓ Code formatting: PASSED
FLAKE8: ✓ Style check: PASSED
MYPY: ✓ Type check: PASSED

=== Environment Info ===
Python version: 3.9.7
Current working directory: /home/user/projects
Python executable: /usr/bin/python3`
        },
        quiz: {
          question: 'What is the main purpose of a virtual environment in Python?',
          options: [
            { text: 'To make Python code run faster', isCorrect: false, explanation: 'Virtual environments don\'t affect code execution speed.' },
            { text: 'To isolate project dependencies and avoid version conflicts', isCorrect: true, explanation: 'Correct! Virtual environments create isolated Python environments for each project to prevent dependency conflicts.' },
            { text: 'To automatically format Python code', isCorrect: false, explanation: 'Code formatting is handled by tools like Black, not virtual environments.' },
            { text: 'To compile Python to machine code', isCorrect: false, explanation: 'Python compilation is handled by the interpreter, not virtual environments.' }
          ]
        }
      }
    }
  ]
}; 