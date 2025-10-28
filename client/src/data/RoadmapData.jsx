import { BookOpen, Code, Brain, Target, Zap, Trophy } from 'lucide-react'

const roadmapData = [
    {
      id: 'stage1',
      title: 'Programming & Logic Foundation',
      subtitle: 'Stage 1',
      description: 'Learn core C++ and basic problem-solving',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      duration: '2-3 weeks',
      difficulty: 'Beginner',
      checkpoint: 'Can solve simple logic questions using loops, arrays, and strings.',
      topics: [
        { id: 'syntax', title: 'Syntax, Data Types, Loops, Conditionals', description: 'Master C++ fundamentals and control structures', estimatedTime: '1 week', problems: 20 },
        { id: 'functions', title: 'Functions, Arrays, Strings', description: 'Learn function creation and basic data structures', estimatedTime: '1 week', problems: 25 },
        { id: 'complexity', title: 'Time & Space Complexity', description: 'Understand Big O notation and algorithm analysis', estimatedTime: '3 days', problems: 10 },
        { id: 'stl-basic', title: 'Basic STL (Vectors, Pairs, Sorting)', description: 'Introduction to Standard Template Library', estimatedTime: '3 days', problems: 15 }
      ],
      practice: '30-50 Easy problems on HackerRank, Codeforces Edu'
    },
    {
      id: 'stage2',
      title: 'Core DSA + Beginner CP',
      subtitle: 'Stage 2',
      description: 'Understand key data structures and solve simple CP problems',
      icon: Code,
      color: 'from-green-500 to-green-600',
      duration: '1-1.5 months',
      difficulty: 'Beginner',
      checkpoint: 'Can solve 100+ LeetCode problems and CP problems rated up to 1100.',
      topics: [
        { id: 'arrays-advanced', title: 'Arrays (prefix sum, max/min, subarrays)', description: 'Advanced array techniques and algorithms', estimatedTime: '1 week', problems: 30 },
        { id: 'strings-advanced', title: 'Strings (manipulation, hashing basics)', description: 'String processing and basic hashing', estimatedTime: '1 week', problems: 25 },
        { id: 'linked-lists', title: 'Linked List (singly, doubly)', description: 'Linear data structures and pointer manipulation', estimatedTime: '1 week', problems: 20 },
        { id: 'stack-queue', title: 'Stack, Queue (using STL and custom)', description: 'LIFO and FIFO data structures', estimatedTime: '1 week', problems: 25 },
        { id: 'recursion-basic', title: 'Recursion & Backtracking Basics', description: 'Recursive thinking and problem solving', estimatedTime: '1 week', problems: 30 },
        { id: 'search-techniques', title: 'Binary Search, Sliding Window, Two Pointer', description: 'Efficient searching and array techniques', estimatedTime: '1 week', problems: 35 }
      ],
      practice: 'LeetCode Easy/Medium, A2OJ Ladder 800-1100, Div 3 contests'
    },
    {
      id: 'stage3',
      title: 'Intermediate DSA + CP Level-Up',
      subtitle: 'Stage 3',
      description: 'Handle standard CP challenges and explore more DSA',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      duration: '1.5-2 months',
      difficulty: 'Intermediate',
      checkpoint: 'Rating ~1300; confident in STL, trees, and recursion.',
      topics: [
        { id: 'trees', title: 'Trees (Binary Tree, BST, Traversals)', description: 'Hierarchical data structures and tree algorithms', estimatedTime: '2 weeks', problems: 40 },
        { id: 'hashmaps', title: 'HashMaps & Sets', description: 'Hash-based data structures for fast lookups', estimatedTime: '1 week', problems: 25 },
        { id: 'sorting', title: 'Sorting Algorithms (Quick, Merge)', description: 'Advanced sorting techniques and analysis', estimatedTime: '1 week', problems: 20 },
        { id: 'bit-manipulation', title: 'Bit Manipulation', description: 'Bitwise operations and optimization tricks', estimatedTime: '1 week', problems: 30 },
        { id: 'heap', title: 'Heap & Priority Queue', description: 'Priority-based data structures', estimatedTime: '1 week', problems: 25 },
        { id: 'backtracking', title: 'Recursion + Backtracking (N-Queens, Subsets)', description: 'Advanced recursive problem solving', estimatedTime: '1 week', problems: 35 },
        { id: 'greedy', title: 'Greedy Algorithms', description: 'Optimization through greedy choices', estimatedTime: '1 week', problems: 30 }
      ],
      practice: 'LeetCode Medium, CP rating 1100-1400, Codeforces B-Level'
    },
    {
      id: 'stage4',
      title: 'Advanced DSA + CP Concepts',
      subtitle: 'Stage 4',
      description: 'Master DP, Graphs, and become a rated CP player',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      duration: '2-3 months',
      difficulty: 'Advanced',
      checkpoint: 'Rating ~1600, comfortable with Graphs and DP.',
      topics: [
        { id: 'graphs', title: 'Graphs (BFS, DFS, Topo Sort, Dijkstra, Union Find)', description: 'Graph algorithms and shortest path problems', estimatedTime: '3 weeks', problems: 50 },
        { id: 'dp', title: 'Dynamic Programming (Knapsack, LIS, DP on Trees)', description: 'Optimization through memoization and tabulation', estimatedTime: '3 weeks', problems: 60 },
        { id: 'advanced-ds', title: 'Trie, Segment Tree, Fenwick Tree', description: 'Advanced data structures for complex queries', estimatedTime: '2 weeks', problems: 40 },
        { id: 'dsu', title: 'DSU (Disjoint Set Union)', description: 'Union-Find data structure and applications', estimatedTime: '1 week', problems: 25 },
        { id: 'number-theory', title: 'Number Theory Basics (GCD, Sieve)', description: 'Mathematical foundations for CP', estimatedTime: '1 week', problems: 30 }
      ],
      practice: 'LeetCode DP section, Codeforces 1400-1700, AtCoder DP problems'
    },
    {
      id: 'stage5',
      title: 'Competitive CP + Mixed DSA Mastery',
      subtitle: 'Stage 5',
      description: 'Real contest performance and top interview readiness',
      icon: Zap,
      color: 'from-red-500 to-red-600',
      duration: 'Ongoing',
      difficulty: 'Advanced',
      checkpoint: 'Rating 1700+, can solve 3-4 problems/contest.',
      topics: [
        { id: 'mixed-topics', title: 'Mixed-topic problem solving', description: 'Combine multiple concepts in single problems', estimatedTime: 'Ongoing', problems: 100 },
        { id: 'contest-practice', title: '1300-1800 CP contests', description: 'Regular participation in competitive programming', estimatedTime: 'Ongoing', problems: 200 },
        { id: 'optimization', title: 'Time optimization, debugging, fast I/O', description: 'Performance tuning and contest strategies', estimatedTime: '2 weeks', problems: 0 },
        { id: 'revision', title: 'Revisit weak topics regularly', description: 'Continuous improvement and practice', estimatedTime: 'Ongoing', problems: 50 }
      ],
      practice: '1-2 contests/week, Virtual contests, upsolve every problem'
    },
    {
      id: 'stage6',
      title: 'Placement & Interview Prep',
      subtitle: 'Stage 6',
      description: 'Be fully placement-ready + polish CP skills',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-600',
      duration: '2-3 months',
      difficulty: 'Expert',
      checkpoint: 'Confident for both technical interviews & CP rankings.',
      topics: [
        { id: 'revision-core', title: 'Revisit: Trees, Graphs, DP, Hashing, Binary Search', description: 'Polish core interview topics', estimatedTime: '1 month', problems: 100 },
        { id: 'projects', title: 'Resume-ready projects (DSA visualizer, contest tracker)', description: 'Build impressive portfolio projects', estimatedTime: '3 weeks', problems: 0 },
        { id: 'interviews', title: 'Mock interviews, behavioral questions', description: 'Interview skills and communication practice', estimatedTime: '2 weeks', problems: 50 },
        { id: 'system-design', title: 'System Design (basic understanding)', description: 'High-level system architecture concepts', estimatedTime: '1 week', problems: 0 }
      ],
      practice: 'Top Interview Questions, Mock Interviews, Focused contests with upsolving'
    }
  ]

  export default roadmapData;