export const INITIAL_QUIZZES = [
  {
    id: "quiz-java-ds-1",
    title: "Java Data Structures Essentials",
    subject: "Basic Data Structure using Java",
    description: "Assess fundamental concepts of Arrays, LinkedLists, Stacks, Queues, and Trees in Java.",
    durationMinutes: 10,
    totalPoints: 50,
    status: "active", // active | upcoming
    scheduleDate: "Available Now",
    questions: [
      {
        id: 1,
        questionText: "Which Java Collection class implements a dynamic re-sizable array?",
        options: [
          "Vector",
          "ArrayList",
          "LinkedList",
          "ArraySet"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 2,
        questionText: "What is the time complexity of searching an element in an unsorted LinkedList in Java?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        correctAnswerIndex: 2,
        points: 10
      },
      {
        id: 3,
        questionText: "Which interface in Java represents a LIFO (Last-In-First-Out) stack data structure?",
        options: [
          "Queue",
          "Deque / Stack",
          "Set",
          "List"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 4,
        questionText: "In Java HashMap, what happens when two different keys hash to the exact same bucket index?",
        options: [
          "Throws a CollisionException",
          "Overwrites the previous value",
          "Stores elements as a LinkedList / Red-Black Tree in the bucket",
          "Resizes the HashMap immediately"
        ],
        correctAnswerIndex: 2,
        points: 10
      },
      {
        id: 5,
        questionText: "Which tree traversal algorithm visits the root node before visiting left and right subtrees?",
        options: [
          "In-order Traversal",
          "Post-order Traversal",
          "Pre-order Traversal",
          "Level-order Traversal"
        ],
        correctAnswerIndex: 2,
        points: 10
      }
    ]
  },
  {
    id: "quiz-python-ds-1",
    title: "Python Data Science Foundations",
    subject: "Data Science using Python",
    description: "Test your skills in NumPy vectorization, Pandas DataFrames, and statistical data cleaning.",
    durationMinutes: 12,
    totalPoints: 50,
    status: "active",
    scheduleDate: "Available Now",
    questions: [
      {
        id: 1,
        questionText: "Which Python library provides high-performance N-dimensional array objects?",
        options: [
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Scikit-Learn"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 2,
        questionText: "In Pandas, which method is used to remove missing/NaN values from a DataFrame?",
        options: [
          "df.dropna()",
          "df.remove_null()",
          "df.clean()",
          "df.drop_empty()"
        ],
        correctAnswerIndex: 0,
        points: 10
      },
      {
        id: 3,
        questionText: "What is the result of np.zeros((3, 3)) in Python?",
        options: [
          "A 1D array with 9 zeros",
          "A 3x3 2D array populated with float 0.0 values",
          "A 3x3 matrix filled with integer 1s",
          "An empty dictionary"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 4,
        questionText: "Which parameter in pd.read_csv() specifies the column to use as the row labels?",
        options: [
          "row_id",
          "index_col",
          "header_num",
          "key_col"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 5,
        questionText: "What metric measures the linear correlation between two continuous variables in Data Science?",
        options: [
          "Confusion Matrix",
          "Pearson Correlation Coefficient",
          "Mean Squared Error",
          "Gini Impurity"
        ],
        correctAnswerIndex: 1,
        points: 10
      }
    ]
  },
  {
    id: "quiz-upcoming-cyber-1",
    title: "Cyber Security & Cloud Defense Midterm",
    subject: "Web Interface",
    description: "Scheduled examination covering OAuth 2.0, JWT Tokens, CSRF Protection, and AWS IAM Policies.",
    durationMinutes: 20,
    totalPoints: 50,
    status: "upcoming",
    scheduleDate: "Tomorrow at 10:00 AM",
    questions: [
      {
        id: 1,
        questionText: "Which HTTP header is commonly used to prevent Cross-Site Scripting (XSS) attacks?",
        options: [
          "Content-Security-Policy",
          "Access-Control-Allow-Origin",
          "X-Frame-Options",
          "Strict-Transport-Security"
        ],
        correctAnswerIndex: 0,
        points: 10
      },
      {
        id: 2,
        questionText: "What part of a JSON Web Token (JWT) holds the actual claims and user identity payload?",
        options: [
          "Header",
          "Payload",
          "Signature",
          "Secret Key"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 3,
        questionText: "Which cryptographic hashing algorithm produces a fixed 256-bit output hash?",
        options: [
          "MD5",
          "SHA-256",
          "DES",
          "RSA-1024"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 4,
        questionText: "What defense mechanism prevents SQL Injection vulnerability in database queries?",
        options: [
          "Parameterized Queries / Prepared Statements",
          "Increasing database server RAM",
          "Using HTTP GET instead of POST",
          "Disabling CORS headers"
        ],
        correctAnswerIndex: 0,
        points: 10
      },
      {
        id: 5,
        questionText: "In cloud security, what principle mandates granting users only the minimum permissions required?",
        options: [
          "Principle of Least Privilege (PoLP)",
          "Zero-Downtime Deployment",
          "Role-Based Overload",
          "Maximum Clearance Access"
        ],
        correctAnswerIndex: 0,
        points: 10
      }
    ]
  },
  {
    id: "quiz-web-1",
    title: "Web Interface Development & React",
    subject: "Web Interface",
    description: "Core HTML5, modern CSS flexbox/grid, DOM event handling, and React state management.",
    durationMinutes: 8,
    totalPoints: 50,
    status: "active",
    scheduleDate: "Available Now",
    questions: [
      {
        id: 1,
        questionText: "Which Hook is used in React to manage local component state?",
        options: [
          "useEffect",
          "useContext",
          "useState",
          "useReducer"
        ],
        correctAnswerIndex: 2,
        points: 10
      },
      {
        id: 2,
        questionText: "What is the purpose of the 'key' prop when rendering lists in React?",
        options: [
          "To format list elements with CSS styles",
          "To help React identify which items have changed, added, or removed",
          "To define the unique index in local database",
          "To enable dark mode automatically"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 3,
        questionText: "Which CSS Flexbox property controls alignment along the cross axis?",
        options: [
          "justify-content",
          "align-items",
          "flex-direction",
          "flex-wrap"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 4,
        questionText: "What does event.preventDefault() do in HTML form submission handlers?",
        options: [
          "Clears all input text fields",
          "Prevents the default browser reload/navigation action",
          "Closes the browser window",
          "Disables user click inputs"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 5,
        questionText: "Which HTTP status code signifies a successful 'OK' request response?",
        options: [
          "404",
          "500",
          "200",
          "301"
        ],
        correctAnswerIndex: 2,
        points: 10
      }
    ]
  },
  {
    id: "quiz-dbms-1",
    title: "Database Management Systems (DBMS)",
    subject: "Database Management System",
    description: "Master SQL queries, Normalization, ACID transactions, and indexing strategies.",
    durationMinutes: 10,
    totalPoints: 50,
    status: "active",
    scheduleDate: "Available Now",
    questions: [
      {
        id: 1,
        questionText: "Which SQL clause is used to filter aggregated group records (with GROUP BY)?",
        options: [
          "WHERE",
          "HAVING",
          "FILTER",
          "ORDER BY"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 2,
        questionText: "In ACID properties of transactions, what does 'Atomicity' guarantee?",
        options: [
          "Transactions are performed in total isolation",
          "Either all operations of a transaction succeed, or none are applied (All-or-Nothing)",
          "Data stays consistent across power outages",
          "Queries complete in atomic clock milliseconds"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 3,
        questionText: "What key uniquely identifies each row in a database table?",
        options: [
          "Foreign Key",
          "Primary Key",
          "Composite Index",
          "Secondary Key"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 4,
        questionText: "Which Normal Form removes partial functional dependencies on candidate keys?",
        options: [
          "First Normal Form (1NF)",
          "Second Normal Form (2NF)",
          "Third Normal Form (3NF)",
          "BCNF"
        ],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 5,
        questionText: "Which SQL join returns all rows from the left table and matched rows from the right table?",
        options: [
          "INNER JOIN",
          "LEFT OUTER JOIN",
          "RIGHT OUTER JOIN",
          "CROSS JOIN"
        ],
        correctAnswerIndex: 1,
        points: 10
      }
    ]
  }
];

export const SUBJECT_OPTIONS = [
  "Basic Data Structure using Java",
  "Data Science using Python",
  "Web Interface",
  "Database Management System"
];
