export const QUIZ_TEMPLATES = [
  {
    id: "tpl-java-advanced",
    title: "Java OOP & Multithreading Masterclass",
    subject: "Basic Data Structure using Java",
    description: "Assessment on Interfaces, Abstract Classes, ExecutorService, Concurrent Collections, and JVM Memory Management.",
    durationMinutes: 15,
    totalPoints: 50,
    category: "Intermediate / Advanced",
    questions: [
      {
        id: 1,
        questionText: "Which keyword in Java ensures that a variable is read directly from main memory rather than CPU cache?",
        options: ["synchronized", "volatile", "transient", "final"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 2,
        questionText: "What interface must be implemented to return a result from a background thread in Java ExecutorService?",
        options: ["Runnable", "Callable", "Consumer", "Supplier"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 3,
        questionText: "Which memory region in Java JVM stores object instances and dynamic array data?",
        options: ["Metaspace", "Stack Memory", "Heap Memory", "Program Counter Register"],
        correctAnswerIndex: 2,
        points: 10
      },
      {
        id: 4,
        questionText: "In Java 8+, what is the default implementation behavior for interfaces using the 'default' keyword?",
        options: [
          "Methods can have body code inside interfaces without forcing concrete implementations",
          "Methods become final and cannot be overridden",
          "Methods execute on a separate thread automatically",
          "Methods are private to the interface scope"
        ],
        correctAnswerIndex: 0,
        points: 10
      },
      {
        id: 5,
        questionText: "Which collection in java.util.concurrent is thread-safe without locking the entire map?",
        options: ["Hashtable", "Collections.synchronizedMap()", "ConcurrentHashMap", "TreeMap"],
        correctAnswerIndex: 2,
        points: 10
      }
    ]
  },
  {
    id: "tpl-python-ml",
    title: "Python Machine Learning & Scikit-Learn",
    subject: "Data Science using Python",
    description: "Test practical understanding of Feature Scaling, Train-Test splits, Confusion Matrices, and Classification Algorithms.",
    durationMinutes: 12,
    totalPoints: 50,
    category: "Machine Learning",
    questions: [
      {
        id: 1,
        questionText: "Which Scikit-Learn class scales feature datasets so that mean=0 and variance=1?",
        options: ["MinMaxScaler", "StandardScaler", "RobustScaler", "Normalizer"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 2,
        questionText: "What phenomenon occurs when a machine learning model fits noise and training data too closely, failing on test data?",
        options: ["Underfitting", "Overfitting", "Data Drift", "Bias-Variance Equilibrium"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 3,
        questionText: "In a binary classification confusion matrix, what metric represents TP / (TP + FP)?",
        options: ["Recall (Sensitivity)", "Precision", "F1-Score", "Accuracy"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 4,
        questionText: "Which hyperparameter in Random Forest classifier sets the total quantity of decision trees built?",
        options: ["n_estimators", "max_depth", "criterion", "min_samples_split"],
        correctAnswerIndex: 0,
        points: 10
      },
      {
        id: 5,
        questionText: "Which technique is used to combat class imbalance by oversampling the minority class using synthetic samples?",
        options: ["PCA", "SMOTE", "K-Means", "DBSCAN"],
        correctAnswerIndex: 1,
        points: 10
      }
    ]
  },
  {
    id: "tpl-react-next",
    title: "Modern React Hooks & Performance",
    subject: "Web Interface",
    description: "Comprehensive quiz on useMemo, useCallback, React Fiber reconciliation, and Custom Hooks design.",
    durationMinutes: 10,
    totalPoints: 50,
    category: "Frontend Development",
    questions: [
      {
        id: 1,
        questionText: "Which Hook is specifically designed to memoize expensive calculation outputs across re-renders?",
        options: ["useCallback", "useMemo", "useRef", "useLayoutEffect"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 2,
        questionText: "What is the primary difference between useRef and useState in React?",
        options: [
          "Updating useRef.current does NOT trigger a component re-render",
          "useRef only stores DOM elements",
          "useState cannot store objects",
          "useRef is asynchronous while useState is synchronous"
        ],
        correctAnswerIndex: 0,
        points: 10
      },
      {
        id: 3,
        questionText: "When should you pass a callback function to setScore(prevScore => prevScore + 1)?",
        options: [
          "When the next state calculation relies directly on the previous state value",
          "Only when calling inside useEffect",
          "When using custom CSS animations",
          "Only in server-side rendering"
        ],
        correctAnswerIndex: 0,
        points: 10
      },
      {
        id: 4,
        questionText: "Which React API enables lazy loading of components to optimize code splitting?",
        options: ["React.memo", "React.lazy & Suspense", "React.createContext", "React.forwardRef"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 5,
        questionText: "What rule must all custom React Hooks follow?",
        options: [
          "Must start with the prefix 'use' and only be called at the top level",
          "Must return an array of 2 elements",
          "Must be defined inside class components",
          "Must accept at least one prop parameter"
        ],
        correctAnswerIndex: 0,
        points: 10
      }
    ]
  },
  {
    id: "tpl-dbms-sql",
    title: "SQL Performance Tuning & Indexing",
    subject: "Database Management System",
    description: "Audit knowledge in B-Tree Indexing, Query Optimization, Window Functions, and Isolation Levels.",
    durationMinutes: 10,
    totalPoints: 50,
    category: "Database Architecture",
    questions: [
      {
        id: 1,
        questionText: "Which SQL Window Function calculates ranks without leaving gaps for tie scores (e.g., 1, 2, 2, 3)?",
        options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "PERCENT_RANK()"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 2,
        questionText: "What type of Database Index physical reorders the actual rows on disk to match index key order?",
        options: ["Non-Clustered Index", "Clustered Index", "Bitmap Index", "Hash Index"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 3,
        questionText: "Which transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but allows Phantom Reads?",
        options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
        correctAnswerIndex: 2,
        points: 10
      },
      {
        id: 4,
        questionText: "What command generates a query execution plan showing full table scans and index lookups?",
        options: ["DESCRIBE TABLE", "EXPLAIN ANALYZE", "SHOW STATUS", "OPTIMIZE TABLE"],
        correctAnswerIndex: 1,
        points: 10
      },
      {
        id: 5,
        questionText: "Which relationship constraint ensures referential integrity when deleting parent records?",
        options: ["ON DELETE CASCADE", "ON DELETE LOCK", "FOREIGN KEY STRICT", "CHECK CONSTRAINT"],
        correctAnswerIndex: 0,
        points: 10
      }
    ]
  }
];
