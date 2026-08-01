/* Offline AI Tutor knowledge base. Each topic has search aliases (for keyword
   matching against whatever the student types) plus a short explanation and a
   worked example, written like a real tutor answer. No network calls involved. */
export const TUTOR_TOPICS = [
  {
    key: "python", aliases: ["python", "list comprehension", "python dict", "pip", "django", "flask"],
    title: "Python",
    body: "Python is a dynamically-typed, interpreted language prized for readable syntax and a huge standard library. Core building blocks: variables (no type declarations needed), lists/tuples/dicts/sets for data, and functions defined with `def`. Indentation is meaningful — it replaces braces.",
    example: 'def total_price(items):\n    return sum(item["price"] for item in items)\n\ncart = [{"price": 250}, {"price": 99}]\nprint(total_price(cart))  # 349',
  },
  {
    key: "java", aliases: ["java", "jvm", "spring boot", "java oop"],
    title: "Java",
    body: "Java is a statically-typed, object-oriented language that runs on the JVM, which is why 'write once, run anywhere' works. Everything lives inside a class. Key OOP pillars: encapsulation (private fields + getters/setters), inheritance (`extends`), and polymorphism (overriding methods).",
    example: 'public class BankAccount {\n  private double balance;\n  public void deposit(double amt) { balance += amt; }\n  public double getBalance() { return balance; }\n}',
  },
  {
    key: "javascript", aliases: ["javascript", "js ", " js", "closures", "promise", "async await", "event loop"],
    title: "JavaScript",
    body: "JavaScript runs in the browser and on servers (Node.js). It's single-threaded but non-blocking thanks to the event loop: synchronous code runs first, then the microtask queue (Promises) drains, then the macrotask queue (setTimeout, I/O). Closures let inner functions remember variables from their outer scope even after that scope has finished running.",
    example: 'async function getUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n}',
  },
  {
    key: "react", aliases: ["react", "usestate", "useeffect", "jsx", "react hooks", "virtual dom"],
    title: "React",
    body: "React builds UIs from components — functions that return JSX and re-render when their state or props change. `useState` holds local state; `useEffect` runs side effects (data fetching, subscriptions) after render, re-running only when its dependency array changes. React batches updates and diffs a virtual DOM to minimize real DOM writes.",
    example: 'function Counter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => { document.title = `Count: ${count}`; }, [count]);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}',
  },
  {
    key: "node", aliases: ["node.js", "nodejs", "node ", "express", "middleware", "npm"],
    title: "Node.js",
    body: "Node.js runs JavaScript outside the browser using the V8 engine, built around an event loop and non-blocking I/O — great for APIs that spend most of their time waiting on network/disk. Express is the most common web framework: routes handle HTTP verbs + paths, and middleware functions run in sequence before the final handler.",
    example: 'app.use(express.json());\napp.get("/api/courses/:id", (req, res) => {\n  res.json({ id: req.params.id, title: "Node.js & Express" });\n});',
  },
  {
    key: "sql", aliases: ["sql", "select ", "join", "group by", "database query", "primary key", "foreign key"],
    title: "SQL",
    body: "SQL queries relational data with a declarative style: SELECT picks columns, WHERE filters rows, JOIN combines tables on a matching key, and GROUP BY aggregates rows into summary rows (paired with COUNT/SUM/AVG). A primary key uniquely identifies each row; a foreign key references a primary key in another table to model relationships.",
    example: "SELECT c.name, COUNT(o.id) AS orders\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nGROUP BY c.name\nHAVING COUNT(o.id) > 3;",
  },
  {
    key: "mongodb", aliases: ["mongodb", "mongo", "nosql", "document database", "aggregation pipeline"],
    title: "MongoDB",
    body: "MongoDB stores JSON-like documents in collections instead of rows in tables — there's no fixed schema, so documents in the same collection can have different fields. CRUD uses methods like `find`, `insertOne`, `updateOne`. The aggregation pipeline chains stages (`$match`, `$group`, `$sort`) to transform data, similar to SQL's WHERE + GROUP BY.",
    example: 'db.orders.aggregate([\n  { $match: { status: "paid" } },\n  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },\n]);',
  },
  {
    key: "powerbi", aliases: ["power bi", "dax", "power query", "measure"],
    title: "Power BI",
    body: "Power BI connects to data sources, shapes them in Power Query (its ETL layer), models relationships between tables, and visualizes them in reports. DAX (Data Analysis Expressions) is the formula language for measures — calculations like totals or ratios that recompute based on report filters, as opposed to calculated columns which are fixed per row.",
    example: "Total Revenue = SUM(Sales[Amount])\nRevenue LY = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('Date'[Date]))",
  },
  {
    key: "excel", aliases: ["excel", "vlookup", "pivot table", "xlookup", "spreadsheet formula"],
    title: "Excel",
    body: "Excel formulas operate on cell ranges. VLOOKUP/XLOOKUP find a value in one column and return a corresponding value from another — XLOOKUP is the modern, more flexible replacement (works left-to-right or right-to-left, cleaner syntax). Pivot tables summarize large datasets by dragging fields into Rows/Columns/Values without writing formulas at all.",
    example: '=XLOOKUP(A2, Products[ID], Products[Price])\n=SUMIFS(Sales[Amount], Sales[Region], "West", Sales[Month], "Jan")',
  },
  {
    key: "machine learning", aliases: ["machine learning", "ml model", "regression", "classification", "overfitting", "gradient descent"],
    title: "Machine Learning",
    body: "Machine learning fits a model to data so it can predict outcomes on new, unseen data. Regression predicts a number (e.g. house price); classification predicts a category (e.g. spam or not). Models learn by minimizing a loss function, often via gradient descent. Overfitting happens when a model memorizes training data instead of generalizing — caught by evaluating on a held-out test set.",
    example: "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)\npredictions = model.predict(X_test)",
  },
  {
    key: "artificial intelligence", aliases: ["artificial intelligence", " ai ", "neural network", "ai ethics", "search algorithm"],
    title: "Artificial Intelligence",
    body: "AI is the broader field of building systems that perform tasks requiring human-like intelligence — machine learning is one major approach within it. Neural networks are inspired by the brain: layers of weighted connections that transform inputs into outputs, tuned via backpropagation. Responsible AI means checking systems for bias, ensuring transparency, and keeping a human in the loop for high-stakes decisions.",
    example: "# A single artificial neuron\noutput = activation(sum(w_i * x_i for w_i, x_i in zip(weights, inputs)) + bias)",
  },
  {
    key: "data science", aliases: ["data science", "eda", "exploratory data analysis", "feature engineering", "data cleaning"],
    title: "Data Science",
    body: "The data science lifecycle: collect data, clean it (handle missing values/outliers), explore it (EDA — distributions, correlations), engineer features that help a model learn, then train, evaluate, and deploy a model, followed by communicating results to stakeholders with clear visuals and plain language.",
    example: "import pandas as pd\ndf = pd.read_csv('sales.csv')\ndf['month'] = pd.to_datetime(df['date']).dt.month\ndf.groupby('month')['revenue'].sum().plot()",
  },
  {
    key: "cloud", aliases: ["cloud computing", "iaas", "paas", "saas", "cloud service model"],
    title: "Cloud Computing",
    body: "Cloud computing rents compute/storage/networking on demand instead of buying hardware. IaaS gives you raw virtual machines (most control, most management); PaaS gives you a platform to deploy code onto (less management); SaaS is a finished application you just use. Elasticity — scaling resources up/down automatically with demand — is the key economic benefit.",
    example: "# Conceptually: IaaS = rent a computer, PaaS = rent a runtime, SaaS = rent an app",
  },
  {
    key: "aws", aliases: ["aws", "ec2", "s3", "iam", "lambda", "amazon web services"],
    title: "AWS",
    body: "AWS is the largest cloud provider. Core services to know: EC2 (virtual servers), S3 (object storage for files), IAM (who/what can access what, via users/roles/policies), and Lambda (run code without managing servers — pay only per invocation). Most solutions combine several of these behind a load balancer and a VPC for networking.",
    example: "aws s3 cp report.csv s3://my-bucket/reports/\naws ec2 describe-instances --instance-ids i-0123456789abcdef0",
  },
  {
    key: "devops", aliases: ["devops", "ci/cd", "docker", "kubernetes", "pipeline", "infrastructure as code"],
    title: "DevOps",
    body: "DevOps blends development and operations to ship software faster and more reliably. CI/CD pipelines automatically build, test, and deploy code on every push. Docker packages an app with its dependencies into a container that runs identically anywhere. Infrastructure as Code (e.g. Terraform) defines servers/networks in version-controlled files instead of clicking through a console.",
    example: 'FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]',
  },
  {
    key: "recursion", aliases: ["recursion", "recursive function", "base case"],
    title: "Recursion",
    body: "A recursive function calls itself on a smaller version of the problem until it hits a base case that stops the recursion. Every recursive function needs (1) a base case and (2) a recursive case that makes progress toward it, or it will recurse forever and blow the call stack.",
    example: "function factorial(n) {\n  if (n <= 1) return 1;       // base case\n  return n * factorial(n - 1); // recursive case\n}",
  },
  {
    key: "big-o", aliases: ["big-o", "big o", "time complexity", "space complexity"],
    title: "Big-O Notation",
    body: "Big-O describes how an algorithm's running time or memory grows as input size (n) grows, ignoring constants. Common orders from fastest to slowest: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n), O(n²) quadratic, O(2ⁿ) exponential. It's a worst-case, high-level comparison tool, not a stopwatch measurement.",
    example: "// O(n): one loop over the array\nfor (const x of arr) { total += x; }\n// O(n^2): nested loop over the array\nfor (const x of arr) for (const y of arr) { compare(x, y); }",
  },
  {
    key: "rest api", aliases: ["rest api", "restful", "http methods", "endpoint"],
    title: "REST APIs",
    body: "REST APIs expose resources over HTTP using verbs that map to CRUD: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). URLs identify resources (`/courses/12`), status codes communicate outcome (200 OK, 201 Created, 404 Not Found, 401/403 for auth issues), and the API is stateless — each request carries everything the server needs to handle it.",
    example: "GET  /api/courses/12       -> 200 OK\nPOST /api/courses          -> 201 Created\nGET  /api/courses/999      -> 404 Not Found",
  },
];

export const TUTOR_SUGGESTIONS = [
  "Explain recursion with an example",
  "What's the difference between SQL and NoSQL?",
  "Explain the React useEffect hook",
  "What is Big-O notation?",
  "How does a REST API work?",
];
