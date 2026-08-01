/* Per-course coding practice question banks. Replaces the old fixed
   "LeetCode-style" question list — every course here has its own unique set
   of problems and its own editor language + starter snippet, so switching the
   course selector genuinely changes what you see (prompt, starter code, and
   the language label shown above the editor). */

export const CODING_COURSES = [
  {
    key: "python", label: "Python", language: "python",
    questions: [
      { id: "py1", title: "Swap Two Variables", difficulty: "Easy", topic: "Variables", prompt: "Write a function that swaps the values of two variables and returns them as a tuple.", starter: 'def swap(a, b):\n    # your code here\n    return a, b\n' },
      { id: "py2", title: "Sum with a Loop", difficulty: "Easy", topic: "Loops", prompt: "Write a function that sums all numbers from 1 to n (inclusive) using a loop.", starter: 'def sum_to_n(n):\n    total = 0\n    # your code here\n    return total\n' },
      { id: "py3", title: "Reverse a List", difficulty: "Easy", topic: "Lists", prompt: "Write a function that returns a new list with the elements of the input list reversed, without using reversed() or [::-1].", starter: 'def reverse_list(items):\n    # your code here\n    pass\n' },
      { id: "py4", title: "Word Frequency Counter", difficulty: "Medium", topic: "Dictionary", prompt: "Write a function that takes a string and returns a dictionary mapping each word to how many times it appears.", starter: 'def word_frequency(text):\n    # your code here\n    pass\n' },
      { id: "py5", title: "Distance Between Points", difficulty: "Easy", topic: "Tuple", prompt: "Write a function that takes two (x, y) tuples and returns the Euclidean distance between them.", starter: 'def distance(p1, p2):\n    # your code here\n    pass\n' },
      { id: "py6", title: "Bank Account Class", difficulty: "Medium", topic: "OOP", prompt: "Implement a BankAccount class with deposit(amount), withdraw(amount), and a balance property. Withdraw should raise an error if funds are insufficient.", starter: 'class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n\n    def deposit(self, amount):\n        # your code here\n        pass\n\n    def withdraw(self, amount):\n        # your code here\n        pass\n' },
      { id: "py7", title: "Safe Division", difficulty: "Easy", topic: "Exception Handling", prompt: "Write a function that divides two numbers and returns None instead of crashing when dividing by zero.", starter: 'def safe_divide(a, b):\n    # your code here\n    pass\n' },
      { id: "py8", title: "Fibonacci (Recursive)", difficulty: "Medium", topic: "Recursion", prompt: "Write a recursive function that returns the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1).", starter: 'def fib(n):\n    # your code here\n    pass\n' },
    ],
  },
  {
    key: "java", label: "Java", language: "java",
    questions: [
      { id: "jv1", title: "Animal Inheritance", difficulty: "Medium", topic: "Inheritance", prompt: "Create an Animal base class with a speak() method, and a Dog subclass that overrides it to return \"Woof\".", starter: 'class Animal {\n    String speak() {\n        return "...";\n    }\n}\n\nclass Dog extends Animal {\n    // your code here\n}\n' },
      { id: "jv2", title: "Shape Interface", difficulty: "Medium", topic: "Interfaces", prompt: "Define a Shape interface with an area() method, then implement it in a Circle class.", starter: 'interface Shape {\n    double area();\n}\n\nclass Circle implements Shape {\n    double radius;\n    Circle(double radius) { this.radius = radius; }\n    // your code here\n}\n' },
      { id: "jv3", title: "Unique Words with a Set", difficulty: "Easy", topic: "Collections", prompt: "Write a method that takes a String[] of words and returns how many unique words it contains, using a HashSet.", starter: 'import java.util.HashSet;\n\nclass Solution {\n    static int uniqueCount(String[] words) {\n        // your code here\n        return 0;\n    }\n}\n' },
      { id: "jv4", title: "Encapsulated Counter", difficulty: "Easy", topic: "OOP", prompt: "Write a Counter class with a private int field, an increment() method, and a getValue() getter.", starter: 'class Counter {\n    private int value;\n    // your code here\n}\n' },
      { id: "jv5", title: "Filter with Streams", difficulty: "Medium", topic: "Streams", prompt: "Given a List<Integer>, use the Stream API to return a list containing only the even numbers.", starter: 'import java.util.List;\nimport java.util.stream.Collectors;\n\nclass Solution {\n    static List<Integer> evensOnly(List<Integer> nums) {\n        // your code here\n        return null;\n    }\n}\n' },
    ],
  },
  {
    key: "javascript", label: "JavaScript", language: "javascript",
    questions: [
      { id: "js1", title: "Debounce a Function", difficulty: "Medium", topic: "Functions", prompt: "Write a debounce(fn, delay) function that returns a new function which only calls fn after `delay` ms of inactivity.", starter: 'function debounce(fn, delay) {\n  // your code here\n}\n' },
      { id: "js2", title: "Chain Promises", difficulty: "Medium", topic: "Promises", prompt: "Write a function that fetches a user by id (simulate with a Promise that resolves after a timeout) and logs their name.", starter: 'function getUser(id) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ id, name: "User " + id }), 100);\n  });\n}\n\n// your code here: call getUser(1) and log the name\n' },
      { id: "js3", title: "Toggle a Class on Click", difficulty: "Easy", topic: "DOM", prompt: "Write code that adds a click listener to an element with id 'box' which toggles the class 'active' on it.", starter: 'const box = document.getElementById("box");\n// your code here\n' },
      { id: "js4", title: "Deep Clone an Object", difficulty: "Medium", topic: "Objects", prompt: "Write a function that deep-clones a plain object (nested objects/arrays included) without mutating the original.", starter: 'function deepClone(obj) {\n  // your code here\n}\n' },
      { id: "js5", title: "Destructure and Default", difficulty: "Easy", topic: "ES6", prompt: "Write a function using destructuring that takes a { name, age = 18 } object and returns a greeting string.", starter: 'function greet({ name, age = 18 } = {}) {\n  // your code here\n}\n' },
      { id: "js6", title: "Fetch with Async/Await", difficulty: "Medium", topic: "Async/Await", prompt: "Write an async function that awaits a fetch('/api/data') call and returns the parsed JSON, catching any errors.", starter: 'async function loadData() {\n  // your code here\n}\n' },
    ],
  },
  {
    key: "react", label: "React", language: "javascript",
    questions: [
      { id: "rc1", title: "Todo List Component", difficulty: "Medium", topic: "Components", prompt: "Build a TodoList component that renders an array of todo strings as a <ul> of <li> items.", starter: 'function TodoList({ todos }) {\n  // your code here\n  return null;\n}\n' },
      { id: "rc2", title: "Counter with useState", difficulty: "Easy", topic: "Hooks", prompt: "Build a Counter component with increment and decrement buttons using useState.", starter: 'import { useState } from "react";\n\nfunction Counter() {\n  // your code here\n}\n' },
      { id: "rc3", title: "Theme via Context", difficulty: "Medium", topic: "Context", prompt: "Create a ThemeContext and a ThemedButton component that reads the current theme from it.", starter: 'import { createContext, useContext } from "react";\n\nconst ThemeContext = createContext("light");\n\nfunction ThemedButton() {\n  // your code here\n}\n' },
      { id: "rc4", title: "Two Routes with React Router", difficulty: "Medium", topic: "Router", prompt: "Set up two routes, \"/\" and \"/about\", each rendering a simple component, using react-router-dom.", starter: 'import { Routes, Route } from "react-router-dom";\n\nfunction AppRoutes() {\n  // your code here\n  return null;\n}\n' },
      { id: "rc5", title: "Simple Redux Reducer", difficulty: "Hard", topic: "Redux", prompt: "Write a reducer function for a counter slice supporting \"increment\" and \"decrement\" action types.", starter: 'function counterReducer(state = { value: 0 }, action) {\n  // your code here\n  return state;\n}\n' },
    ],
  },
  {
    key: "node", label: "Node.js", language: "javascript",
    questions: [
      { id: "nd1", title: "Hello World Route", difficulty: "Easy", topic: "Express", prompt: "Write an Express GET route for \"/hello\" that responds with { message: \"Hello World\" }.", starter: 'const express = require("express");\nconst app = express();\n\n// your code here\n' },
      { id: "nd2", title: "REST CRUD for Notes", difficulty: "Medium", topic: "REST", prompt: "Write GET /notes and POST /notes route handlers backed by an in-memory array.", starter: 'let notes = [];\n\napp.get("/notes", (req, res) => {\n  // your code here\n});\n\napp.post("/notes", (req, res) => {\n  // your code here\n});\n' },
      { id: "nd3", title: "Verify a JWT", difficulty: "Medium", topic: "JWT", prompt: "Write a middleware function that checks for a Bearer token in the Authorization header and rejects the request with 401 if missing.", starter: 'function requireAuth(req, res, next) {\n  // your code here\n}\n' },
      { id: "nd4", title: "Request Logger Middleware", difficulty: "Easy", topic: "Middleware", prompt: "Write a middleware function that logs the method and URL of every incoming request, then calls next().", starter: 'function logger(req, res, next) {\n  // your code here\n}\n' },
    ],
  },
  {
    key: "sql", label: "SQL", language: "sql",
    questions: [
      { id: "sq1", title: "Select Active Users", difficulty: "Easy", topic: "SELECT", prompt: "Write a query that selects the name and email of all users where status = 'active'.", starter: "SELECT\n  -- your code here\nFROM users\n" },
      { id: "sq2", title: "Orders with Customer Names", difficulty: "Medium", topic: "JOIN", prompt: "Write a query that joins orders to customers and lists order id, customer name, and order total.", starter: "SELECT\n  -- your code here\nFROM orders o\nJOIN customers c ON -- your code here\n" },
      { id: "sq3", title: "Revenue by Month", difficulty: "Medium", topic: "GROUP BY", prompt: "Write a query that returns total revenue grouped by month from an orders table with columns (order_date, amount).", starter: "SELECT\n  -- your code here\nFROM orders\nGROUP BY -- your code here\n" },
      { id: "sq4", title: "Customers with 5+ Orders", difficulty: "Medium", topic: "HAVING", prompt: "Write a query that returns customers who have placed more than 5 orders.", starter: "SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING -- your code here\n" },
      { id: "sq5", title: "Running Total", difficulty: "Hard", topic: "Window Functions", prompt: "Write a query that returns each order's amount plus a running total of amounts ordered by date, using a window function.", starter: "SELECT order_date, amount,\n  SUM(amount) OVER (ORDER BY order_date) AS running_total\nFROM orders;\n" },
    ],
  },
  {
    key: "mongodb", label: "MongoDB", language: "javascript",
    questions: [
      { id: "mg1", title: "Insert a Document", difficulty: "Easy", topic: "CRUD", prompt: "Write a command that inserts a new product document with name and price fields into the products collection.", starter: 'db.products.insertOne({\n  // your code here\n});\n' },
      { id: "mg2", title: "Find Products in Stock", difficulty: "Easy", topic: "CRUD", prompt: "Write a query that finds all products where stock is greater than 0.", starter: 'db.products.find({\n  // your code here\n});\n' },
      { id: "mg3", title: "Update a Field", difficulty: "Easy", topic: "CRUD", prompt: "Write a command that updates the price of the product with name \"Widget\" to 19.99.", starter: 'db.products.updateOne(\n  { name: "Widget" },\n  { /* your code here */ }\n);\n' },
      { id: "mg4", title: "Revenue by Category", difficulty: "Hard", topic: "Aggregation Pipeline", prompt: "Write an aggregation pipeline that groups orders by category and sums the amount field.", starter: 'db.orders.aggregate([\n  // your code here\n]);\n' },
    ],
  },
  {
    key: "powerbi", label: "Power BI", language: "dax",
    questions: [
      { id: "pb1", title: "Total Sales Measure", difficulty: "Easy", topic: "Measures", prompt: "Write a DAX measure that sums the Amount column of the Sales table.", starter: "Total Sales = -- your code here\n" },
      { id: "pb2", title: "Year-over-Year Growth", difficulty: "Hard", topic: "DAX", prompt: "Write a DAX measure that calculates the percentage growth in Total Sales versus the same period last year.", starter: "Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date]))\nYoY Growth % = -- your code here\n" },
      { id: "pb3", title: "Filter Rows in Power Query", difficulty: "Medium", topic: "Power Query", prompt: "Describe (in M-style pseudocode) the step that filters a table to only rows where Country equals \"India\".", starter: "= Table.SelectRows(Source, each [Country] = -- your code here)\n" },
      { id: "pb4", title: "Average Order Value", difficulty: "Easy", topic: "Measures", prompt: "Write a DAX measure for average order value: total sales divided by count of distinct orders.", starter: "Avg Order Value = -- your code here\n" },
    ],
  },
  {
    key: "excel", label: "Excel", language: "excel-formula",
    questions: [
      { id: "xl1", title: "Look Up a Price", difficulty: "Easy", topic: "VLOOKUP/XLOOKUP", prompt: "Write a formula that looks up the price of the product ID in A2 from a Products table (columns: ID, Price).", starter: "=XLOOKUP(A2, -- your code here)\n" },
      { id: "xl2", title: "Conditional Sum", difficulty: "Medium", topic: "SUMIFS", prompt: "Write a formula that sums the Amount column where Region = \"West\" and Month = \"Jan\".", starter: "=SUMIFS(-- your code here)\n" },
      { id: "xl3", title: "Grade Bucket", difficulty: "Easy", topic: "Logical Formulas", prompt: "Write a formula that returns \"Pass\" if the score in A2 is 40 or above, otherwise \"Fail\".", starter: "=IF(-- your code here)\n" },
      { id: "xl4", title: "Remove Duplicates Description", difficulty: "Easy", topic: "Data Cleaning", prompt: "Describe the formula/approach to count how many unique values exist in range A2:A100.", starter: "=SUMPRODUCT(1/COUNTIF(-- your code here))\n" },
    ],
  },
  {
    key: "ml", label: "Machine Learning", language: "python",
    questions: [
      { id: "ml1", title: "Train/Test Split", difficulty: "Easy", topic: "Model Evaluation", prompt: "Write code that splits X, y into training and test sets using an 80/20 split with scikit-learn.", starter: 'from sklearn.model_selection import train_test_split\n\n# your code here\n' },
      { id: "ml2", title: "Fit a Linear Regression", difficulty: "Medium", topic: "Regression", prompt: "Write code that fits a LinearRegression model on X_train, y_train and predicts on X_test.", starter: 'from sklearn.linear_model import LinearRegression\n\n# your code here\n' },
      { id: "ml3", title: "Accuracy Score", difficulty: "Easy", topic: "Classification", prompt: "Write code that computes the accuracy of predictions y_pred against true labels y_test.", starter: 'from sklearn.metrics import accuracy_score\n\n# your code here\n' },
      { id: "ml4", title: "Normalize Features", difficulty: "Medium", topic: "Preprocessing", prompt: "Write code that scales feature matrix X to zero mean and unit variance using StandardScaler.", starter: 'from sklearn.preprocessing import StandardScaler\n\n# your code here\n' },
    ],
  },
  {
    key: "ai", label: "Artificial Intelligence", language: "python",
    questions: [
      { id: "ai1", title: "Simple Rule-Based Agent", difficulty: "Easy", topic: "Agents", prompt: "Write a function that acts as a simple thermostat agent: return \"heat\" if temp < 18, \"cool\" if temp > 24, else \"idle\".", starter: 'def thermostat_agent(temp):\n    # your code here\n    pass\n' },
      { id: "ai2", title: "Breadth-First Search", difficulty: "Hard", topic: "Search", prompt: "Write a BFS function that finds the shortest path between two nodes in an adjacency-list graph.", starter: 'from collections import deque\n\ndef bfs(graph, start, goal):\n    # your code here\n    pass\n' },
      { id: "ai3", title: "Single Neuron Forward Pass", difficulty: "Medium", topic: "Neural Networks", prompt: "Write a function that computes a single neuron's output given inputs, weights, a bias, and a step activation function.", starter: 'def neuron(inputs, weights, bias):\n    # your code here\n    pass\n' },
    ],
  },
  {
    key: "datascience", label: "Data Science", language: "python",
    questions: [
      { id: "ds1", title: "Handle Missing Values", difficulty: "Easy", topic: "Data Cleaning", prompt: "Write pandas code that fills missing values in the 'age' column with the column's median.", starter: 'import pandas as pd\n\n# df is a given DataFrame\n# your code here\n' },
      { id: "ds2", title: "Group and Aggregate", difficulty: "Medium", topic: "EDA", prompt: "Write pandas code that groups df by 'region' and computes the mean of 'revenue' per region.", starter: 'import pandas as pd\n\n# your code here\n' },
      { id: "ds3", title: "Create a Derived Feature", difficulty: "Medium", topic: "Feature Engineering", prompt: "Write pandas code that adds a 'day_of_week' column derived from an existing 'date' column.", starter: 'import pandas as pd\n\n# your code here\n' },
      { id: "ds4", title: "Detect Outliers", difficulty: "Hard", topic: "EDA", prompt: "Write code that flags rows in df['value'] more than 3 standard deviations from the mean.", starter: 'import pandas as pd\n\n# your code here\n' },
    ],
  },
  {
    key: "aws", label: "AWS", language: "bash",
    questions: [
      { id: "aw1", title: "Upload a File to S3", difficulty: "Easy", topic: "S3", prompt: "Write the AWS CLI command to upload local file report.csv to the bucket my-reports under the reports/ prefix.", starter: "aws s3 cp report.csv -- your code here\n" },
      { id: "aw2", title: "List Running Instances", difficulty: "Easy", topic: "EC2", prompt: "Write the AWS CLI command to list EC2 instances filtered to only running ones.", starter: "aws ec2 describe-instances -- your code here\n" },
      { id: "aw3", title: "Create an IAM Policy Reference", difficulty: "Medium", topic: "IAM", prompt: "Write the AWS CLI command to attach the policy arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess to a user named 'analyst'.", starter: "aws iam attach-user-policy -- your code here\n" },
      { id: "aw4", title: "Invoke a Lambda Function", difficulty: "Medium", topic: "Lambda", prompt: "Write the AWS CLI command to invoke a Lambda function named 'processOrder' and save the output to out.json.", starter: "aws lambda invoke -- your code here\n" },
    ],
  },
  {
    key: "devops", label: "DevOps", language: "yaml",
    questions: [
      { id: "dv1", title: "Basic Dockerfile", difficulty: "Easy", topic: "Docker", prompt: "Write a Dockerfile that uses a node:20-alpine base image, installs dependencies, and starts the app with npm start.", starter: "FROM node:20-alpine\nWORKDIR /app\n# your code here\n" },
      { id: "dv2", title: "CI Pipeline on Push", difficulty: "Medium", topic: "CI/CD", prompt: "Write a GitHub Actions workflow that runs `npm install` and `npm test` on every push to main.", starter: "name: CI\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      # your code here\n" },
      { id: "dv3", title: "Kubernetes Deployment Replicas", difficulty: "Medium", topic: "Kubernetes", prompt: "Write a Kubernetes Deployment snippet that runs 3 replicas of an nginx image.", starter: "apiVersion: apps/v1\nkind: Deployment\nspec:\n  replicas: -- your code here\n" },
      { id: "dv4", title: "Terraform S3 Bucket", difficulty: "Medium", topic: "Infrastructure as Code", prompt: "Write a Terraform resource block that creates an S3 bucket named 'my-app-assets'.", starter: 'resource "aws_s3_bucket" "assets" {\n  # your code here\n}\n' },
    ],
  },
];

export const codingCourseByKey = (key) => CODING_COURSES.find((c) => c.key === key) || CODING_COURSES[0];
