/* Offline quiz question banks, keyed by the same topic keys used in
   src/data/tutorTopics.js, so the AI Quiz Generator can turn free-text topic
   input (e.g. "python dictionaries") into a real, curated quiz with zero
   network calls. Each entry: { q, options, a (index of correct option), explanation }. */
export const QUIZ_TOPICS = {
  python: [
    { q: "Which keyword defines a function in Python?", options: ["func", "def", "function", "lambda"], a: 1, explanation: "`def` starts a function definition; `lambda` only makes small anonymous functions." },
    { q: "What does `len([1, 2, 3])` return?", options: ["2", "3", "1", "Error"], a: 1, explanation: "len() counts the number of items in the list." },
    { q: "Which data type is immutable in Python?", options: ["list", "dict", "tuple", "set"], a: 2, explanation: "Tuples cannot be modified after creation; lists, dicts and sets can." },
    { q: "What does a list comprehension `[x*2 for x in range(3)]` produce?", options: ["[0, 2, 4]", "[0, 1, 2]", "[1, 2, 3]", "Error"], a: 0, explanation: "range(3) gives 0,1,2; each is doubled to 0,2,4." },
    { q: "Which keyword handles exceptions in Python?", options: ["catch", "except", "rescue", "handle"], a: 1, explanation: "Python uses try/except, not try/catch." },
  ],
  java: [
    { q: "Which keyword lets a class inherit from another?", options: ["implements", "extends", "inherits", "super"], a: 1, explanation: "`extends` is used for class inheritance; `implements` is for interfaces." },
    { q: "Which collection does not allow duplicate elements?", options: ["ArrayList", "LinkedList", "HashSet", "Vector"], a: 2, explanation: "Set implementations like HashSet enforce uniqueness." },
    { q: "What is the entry point of a Java application?", options: ["start()", "main()", "run()", "init()"], a: 1, explanation: "public static void main(String[] args) is the required entry point." },
    { q: "Which of these is NOT an OOP pillar?", options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"], a: 2, explanation: "Compilation is a build step, not an OOP concept." },
    { q: "What does the `interface` keyword define?", options: ["A concrete class", "A contract of methods to implement", "A loop", "A package"], a: 1, explanation: "Interfaces declare method signatures that implementing classes must provide." },
  ],
  javascript: [
    { q: "Which keyword declares a block-scoped variable?", options: ["var", "let", "global", "define"], a: 1, explanation: "`let` (and `const`) are block-scoped; `var` is function-scoped." },
    { q: "What does `===` check that `==` doesn't?", options: ["Nothing extra", "Type, not just value", "Only value", "Only reference"], a: 1, explanation: "`===` requires the same type as well as the same value (no coercion)." },
    { q: "What does `JSON.parse('{\"a\":1}')` return?", options: ["A string", "An object", "undefined", "An error"], a: 1, explanation: "JSON.parse converts a JSON string into a JavaScript object." },
    { q: "What does `Array.prototype.map` return?", options: ["The original array mutated", "A new array", "undefined", "A single value"], a: 1, explanation: "map() creates a new array by transforming each element; it does not mutate the original." },
    { q: "What is a closure?", options: ["A syntax error", "A function bundled with its lexical scope", "A CSS property", "A loop type"], a: 1, explanation: "Closures let a function keep access to variables from its defining scope." },
  ],
  react: [
    { q: "Which hook manages local component state?", options: ["useEffect", "useState", "useRef", "useMemo"], a: 1, explanation: "useState returns a state value and a setter function." },
    { q: "When does `useEffect(fn, [])` run?", options: ["Every render", "Never", "Once, after the first render", "Only on unmount"], a: 2, explanation: "An empty dependency array means the effect runs once after mount." },
    { q: "What does JSX compile down to?", options: ["HTML strings", "React.createElement calls", "CSS", "JSON"], a: 1, explanation: "JSX is syntactic sugar for React.createElement(type, props, children)." },
    { q: "Which hook lets components share state without prop drilling?", options: ["useState", "useContext", "useEffect", "useRef"], a: 1, explanation: "useContext reads a value provided higher up by a Context.Provider." },
    { q: "What triggers a React component to re-render?", options: ["Console logs", "State or prop changes", "Page reload only", "CSS changes"], a: 1, explanation: "React re-renders when its state or the props it receives change." },
  ],
  node: [
    { q: "What does `app.use()` register in Express?", options: ["A database", "Middleware", "A test", "A CSS file"], a: 1, explanation: "app.use() mounts middleware functions that run on incoming requests." },
    { q: "Which HTTP method typically creates a resource in a REST API?", options: ["GET", "POST", "DELETE", "OPTIONS"], a: 1, explanation: "POST is conventionally used to create new resources." },
    { q: "What does `req.params` contain in Express?", options: ["Query string values", "Route path parameters", "Request headers", "The response body"], a: 1, explanation: "req.params holds values captured from the route path, e.g. /users/:id." },
    { q: "Why is Node.js well-suited to I/O-heavy APIs?", options: ["It's multi-threaded by default", "Its non-blocking event loop", "It compiles to machine code", "It has no runtime"], a: 1, explanation: "Node's single-threaded event loop handles many concurrent I/O operations without blocking." },
    { q: "What does JWT commonly secure in a Node API?", options: ["CSS delivery", "Authentication/authorization", "Database indexing", "Image compression"], a: 1, explanation: "JSON Web Tokens carry signed claims used to authenticate and authorize requests." },
  ],
  sql: [
    { q: "Which JOIN returns unmatched rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], a: 3, explanation: "FULL OUTER JOIN keeps unmatched rows from both sides, filling the other side with NULLs." },
    { q: "What does GROUP BY do?", options: ["Filters rows", "Sorts rows", "Aggregates rows sharing a column value", "Joins two tables"], a: 2, explanation: "GROUP BY collapses rows into groups so aggregate functions can summarize each group." },
    { q: "Which clause filters groups after aggregation?", options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"], a: 1, explanation: "HAVING filters on aggregated results; WHERE filters rows before aggregation." },
    { q: "What does a PRIMARY KEY guarantee?", options: ["Fast joins only", "Uniqueness and non-null identity for rows", "Automatic backups", "Encrypted storage"], a: 1, explanation: "A primary key uniquely identifies every row in a table and cannot be NULL." },
    { q: "Which function returns the number of rows in a result set?", options: ["SUM()", "COUNT()", "LEN()", "TOTAL()"], a: 1, explanation: "COUNT() counts rows (or non-null values in a column)." },
  ],
  mongodb: [
    { q: "What is the basic unit of storage in MongoDB?", options: ["Row", "Document", "Record", "Tuple"], a: 1, explanation: "MongoDB stores data as BSON documents inside collections." },
    { q: "Which method inserts a single document?", options: ["insertOne()", "addOne()", "createOne()", "push()"], a: 0, explanation: "insertOne() adds one document to a collection." },
    { q: "What does the aggregation stage `$match` do?", options: ["Sorts documents", "Filters documents, like SQL's WHERE", "Joins collections", "Deletes documents"], a: 1, explanation: "$match filters the documents passed to the next pipeline stage." },
    { q: "Is MongoDB's schema fixed by default?", options: ["Yes, strictly", "No, it's flexible/schemaless", "Only for the first document", "Only in production"], a: 1, explanation: "Documents in the same collection can have different fields." },
    { q: "Which stage groups documents and computes aggregates?", options: ["$group", "$project", "$limit", "$skip"], a: 0, explanation: "$group is the aggregation-pipeline equivalent of SQL's GROUP BY." },
  ],
  powerbi: [
    { q: "What language is used to write Power BI measures?", options: ["SQL", "DAX", "M", "Python"], a: 1, explanation: "DAX (Data Analysis Expressions) is used for measures and calculated columns." },
    { q: "What is Power Query primarily used for?", options: ["Visualizing data", "Extracting, transforming, and loading data", "Writing measures", "Publishing reports"], a: 1, explanation: "Power Query is Power BI's ETL layer, using the M language." },
    { q: "What's the difference between a measure and a calculated column?", options: ["No difference", "Measures recompute per filter context; columns are fixed per row", "Columns are faster always", "Measures can't use SUM"], a: 1, explanation: "Measures are evaluated dynamically based on the current filter/report context." },
    { q: "What connects two tables in the Power BI data model?", options: ["A measure", "A relationship", "A slicer", "A bookmark"], a: 1, explanation: "Relationships link tables via matching key columns, enabling cross-table analysis." },
    { q: "Which DAX function shifts a date column back one year?", options: ["PREVIOUSYEAR / SAMEPERIODLASTYEAR", "DATEADD only forward", "TODAY()", "FILTER()"], a: 0, explanation: "SAMEPERIODLASTYEAR / PREVIOUSYEAR are time-intelligence functions for year-over-year comparisons." },
  ],
  excel: [
    { q: "What does VLOOKUP search in?", options: ["Rows only", "The leftmost column of a range", "Any column", "Only headers"], a: 1, explanation: "VLOOKUP looks up a value in the first column of the given range and returns a value from a specified column to its right." },
    { q: "What is a Pivot Table used for?", options: ["Formatting cells", "Summarizing large datasets interactively", "Writing macros", "Password protection"], a: 1, explanation: "Pivot tables let you summarize/group data by dragging fields, without formulas." },
    { q: "Which function sums values that meet multiple criteria?", options: ["SUM()", "SUMIFS()", "COUNT()", "AVERAGE()"], a: 1, explanation: "SUMIFS supports multiple range/criteria pairs; SUMIF only supports one." },
    { q: "What advantage does XLOOKUP have over VLOOKUP?", options: ["None", "Can look left or right and has cleaner syntax", "Only works on text", "Requires no range"], a: 1, explanation: "XLOOKUP isn't restricted to searching left-to-right like VLOOKUP." },
    { q: "What does conditional formatting do?", options: ["Sorts data", "Visually highlights cells based on rules", "Deletes duplicates", "Creates charts automatically"], a: 1, explanation: "Conditional formatting applies visual styles when cell values meet a condition." },
  ],
  "machine learning": [
    { q: "Linear regression minimizes which quantity?", options: ["Accuracy", "Sum of squared errors", "Entropy", "Precision"], a: 1, explanation: "Ordinary least squares fits a line by minimizing squared residuals." },
    { q: "Overfitting typically shows as:", options: ["Low train, low test error", "High train, high test error", "Low train, high test error", "High train, low test error"], a: 2, explanation: "An overfit model memorizes training data (low train error) but generalizes poorly (high test error)." },
    { q: "What kind of problem is spam vs. not-spam?", options: ["Regression", "Classification", "Clustering", "Dimensionality reduction"], a: 1, explanation: "Predicting a discrete category is a classification task." },
    { q: "What does a confusion matrix show?", options: ["Model training time", "True/false positives and negatives", "Feature importance", "Learning rate"], a: 1, explanation: "It breaks down predictions vs. actual labels into TP/FP/TN/FN counts." },
    { q: "Why split data into train/test sets?", options: ["To speed up training", "To evaluate generalization to unseen data", "It's required by Python", "To reduce storage"], a: 1, explanation: "A held-out test set estimates how the model performs on data it hasn't seen." },
  ],
  "artificial intelligence": [
    { q: "What is a neural network loosely modeled on?", options: ["A relational database", "Neurons in the brain", "A spreadsheet", "A file system"], a: 1, explanation: "Artificial neurons combine weighted inputs, echoing biological neuron behavior at a high level." },
    { q: "What algorithm adjusts neural network weights during training?", options: ["Backpropagation", "Binary search", "Quicksort", "Round robin"], a: 0, explanation: "Backpropagation computes gradients of the loss w.r.t. each weight so they can be updated." },
    { q: "What is AI bias?", options: ["A hardware bug", "Systematic unfairness learned from skewed training data", "A type of neural layer", "A compiler warning"], a: 1, explanation: "If training data reflects historical bias, models can learn and amplify it." },
    { q: "What distinguishes narrow AI from general AI?", options: ["Narrow AI excels at one task; general AI would match human versatility", "There's no difference", "Narrow AI is always faster", "General AI already exists widely"], a: 0, explanation: "All deployed AI today is narrow — good at specific tasks, not general reasoning across any domain." },
    { q: "What is a common use of search algorithms in AI?", options: ["Styling web pages", "Finding a path/solution in a state space (e.g. pathfinding, games)", "Compressing images", "Formatting dates"], a: 1, explanation: "Search algorithms like A* explore possible states to find a solution or optimal path." },
  ],
  "data science": [
    { q: "What is the first step in a typical data science workflow?", options: ["Model deployment", "Data collection", "Hyperparameter tuning", "A/B testing"], a: 1, explanation: "You need data before you can clean, explore, or model it." },
    { q: "What does EDA stand for?", options: ["Estimated Data Average", "Exploratory Data Analysis", "Extended Database Access", "Error Detection Algorithm"], a: 1, explanation: "EDA is the process of summarizing and visualizing data to understand its structure." },
    { q: "Why handle missing values before modeling?", options: ["They slow down typing", "Many models can't handle them and they can bias results", "It's a style preference", "They always mean fraud"], a: 1, explanation: "Missing data can break training or silently bias the model if not addressed appropriately." },
    { q: "What is feature engineering?", options: ["Buying more compute", "Creating new input variables to help a model learn", "Writing unit tests", "Deploying to the cloud"], a: 1, explanation: "Good features (e.g. deriving 'day of week' from a date) often improve model performance more than model choice." },
    { q: "What's a common way to communicate results to non-technical stakeholders?", options: ["Raw JSON dumps", "Clear visualizations and plain-language summaries", "Sharing the model's weights file", "Sending the training logs"], a: 1, explanation: "Charts and plain language make findings actionable for people without a data background." },
  ],
  cloud: [
    { q: "Which cloud model gives you the most infrastructure control?", options: ["SaaS", "PaaS", "IaaS", "FaaS"], a: 2, explanation: "IaaS (e.g. renting VMs) hands you the most low-level control, and the most management responsibility." },
    { q: "What is the key economic benefit of cloud elasticity?", options: ["Fixed monthly cost regardless of usage", "Scale resources up/down automatically with demand", "No internet required", "Unlimited free storage"], a: 1, explanation: "Elastic scaling means you pay roughly for what you use as demand changes." },
    { q: "Which service model requires the least infrastructure management?", options: ["IaaS", "PaaS", "SaaS", "On-premise"], a: 2, explanation: "SaaS is a finished application — the provider manages everything underneath it." },
  ],
  aws: [
    { q: "What does S3 provide?", options: ["Virtual machines", "Object storage", "A managed database only", "DNS routing only"], a: 1, explanation: "Amazon S3 stores objects (files) in buckets, accessible over HTTP(S)." },
    { q: "What does IAM manage?", options: ["Server temperature", "Who/what can access which AWS resources", "Billing currency", "Network latency"], a: 1, explanation: "IAM defines users, roles, and policies controlling access to AWS resources." },
    { q: "What is AWS Lambda used for?", options: ["Running code without provisioning servers", "Storing files", "DNS management", "Sending emails only"], a: 0, explanation: "Lambda runs your code in response to events and you're billed per invocation, with no servers to manage." },
    { q: "What does EC2 provide?", options: ["Object storage", "Resizable virtual servers", "A CDN only", "A ticketing system"], a: 1, explanation: "EC2 (Elastic Compute Cloud) provisions virtual machines you can size and scale." },
  ],
  devops: [
    { q: "What does CI/CD automate?", options: ["Employee onboarding", "Building, testing, and deploying code changes", "Invoice generation", "Office scheduling"], a: 1, explanation: "CI/CD pipelines run automatically on code changes to catch issues early and ship faster." },
    { q: "What problem does Docker solve?", options: ["Slow typing", "'Works on my machine' — inconsistent environments", "Spelling errors in code", "Slow internet"], a: 1, explanation: "Containers package an app with its dependencies so it behaves the same everywhere." },
    { q: "What does Infrastructure as Code let you do?", options: ["Write infrastructure config in version-controlled files", "Delete all servers automatically", "Skip testing", "Avoid using the cloud"], a: 0, explanation: "Tools like Terraform define servers/networking as code, enabling review, versioning, and repeatable deploys." },
    { q: "What is a rollback in a deployment pipeline?", options: ["Speeding up a build", "Reverting to a previous known-good release after a bad deploy", "Compressing Docker images", "Merging two branches"], a: 1, explanation: "Rollbacks quickly restore service by redeploying the last stable version." },
  ],
};

/* Fallback bank used when a typed-in topic doesn't match any known course —
   keeps the "any topic" AI Quiz Generator from ever coming back empty. */
export const GENERIC_QUIZ_TEMPLATE = (topic) => [
  { q: `Which statement best describes a core idea in ${topic}?`, options: [`A foundational concept students of ${topic} learn first`, "An unrelated cooking technique", "A type of physical exercise", "A musical instrument"], a: 0, explanation: `This is a general awareness question about ${topic} fundamentals.` },
  { q: `When studying ${topic}, which approach helps most?`, options: ["Memorizing without practicing", "Practicing with real examples and building small projects", "Avoiding documentation", "Skipping the fundamentals"], a: 1, explanation: "Hands-on practice with real examples builds durable understanding faster than memorization." },
  { q: `A good next step after learning ${topic} basics is to:`, options: ["Stop practicing", "Build a small project applying it", "Forget it", "Only read about it"], a: 1, explanation: "Applying a topic in a small project cements the concepts and reveals gaps." },
  { q: `Which resource type is most useful when starting ${topic}?`, options: ["Official docs / structured course content", "Random unrelated topics", "Nothing at all", "Outdated forum posts only"], a: 0, explanation: "Structured, current material gives the most reliable foundation." },
  { q: `True or False: consistent short study sessions on ${topic} beat rare long ones.`, options: ["True", "False", "It doesn't matter", "Only for beginners"], a: 0, explanation: "Spaced, consistent practice generally improves retention over infrequent cramming." },
];
