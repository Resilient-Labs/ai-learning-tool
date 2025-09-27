// Consolidated data types for the AI Learning Platform

export interface Student {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  data: StudentData;
  summary: StudentSummary;
}

//moves student data to a separate interface
interface StudentData {
  activity: StudentActivityData;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  streak: number;
  joinDate: string;
}

interface StudentActivityData {
  status: "Active" | "Inactive" | "Pending";
  lastActiveAt: string;
  totalSessions: Array<{ date: string; sessions: number }>;
  sessionLengthDistribution: Array<{ range: string; count: number }>;
}

interface StudentSummary {
  totalSessionsToday: number;
  avgSessionLengthToday: number;
  activeStudents: number;
  lastActiveAt: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  completionRate: number;
  status: "Published" | "Draft" | "Archived";
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: number;
  student: {
    name: string;
    avatar?: string;
  };
  topic: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
  sentiment: "Positive" | "Neutral" | "Frustrated";
  status: "Active" | "Resolved" | "Needs Help";
  aiResponses: number;
  resolved: boolean;
}

export interface Analytics {
  totalStudents: number;
  activeStudents: number;
  totalLessons: number;
  completedLessons: number;
  totalConversations: number;
  averageCompletionRate: number;
  averageProgress: number;
  weeklyEngagement: number;
  monthlyGrowth: number;
}

export interface DashboardStats {
  totalStudents: number;
  activeLessons: number;
  conversations: number;
  completionRate: number;
}

export interface RecentActivity {
  id: number;
  type: "student" | "lesson" | "conversation";
  title: string;
  description: string;
  timestamp: string;
  status: string;
}
// Sample data generators
export const generateSampleStudents = (): Student[] => [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    data: {
      activity: {
        status: "Active",
        lastActiveAt: "2024-01-15T10:30:00Z",
        totalSessions: [
          { date: "2024-01-15", sessions: 3 },
          { date: "2024-01-14", sessions: 2 },
          { date: "2024-01-13", sessions: 4 },
          { date: "2024-01-12", sessions: 1 },
          { date: "2024-01-11", sessions: 3 },
          { date: "2024-01-10", sessions: 2 },
          { date: "2024-01-09", sessions: 5 }
        ],
        sessionLengthDistribution: [
          { range: "0-5min", count: 2 },
          { range: "5-15min", count: 5 },
          { range: "15-30min", count: 8 },
          { range: "30-60min", count: 3 },
          { range: "60min+", count: 1 }
        ]
      },
      progress: 85,
      lessonsCompleted: 12,
      totalLessons: 15,
      streak: 7,
      joinDate: "2024-01-15"
    },
    summary: {
      totalSessionsToday: 3,
      avgSessionLengthToday: 25.5,
      activeStudents: 1089,
      lastActiveAt: "2024-01-15T10:30:00Z"
    }
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    data: {
      activity: {
        status: "Active",
        lastActiveAt: "2024-01-20T14:15:00Z",
        totalSessions: [
          { date: "2024-01-20", sessions: 4 },
          { date: "2024-01-19", sessions: 3 },
          { date: "2024-01-18", sessions: 5 },
          { date: "2024-01-17", sessions: 2 },
          { date: "2024-01-16", sessions: 4 },
          { date: "2024-01-15", sessions: 3 },
          { date: "2024-01-14", sessions: 6 }
        ],
        sessionLengthDistribution: [
          { range: "0-5min", count: 1 },
          { range: "5-15min", count: 3 },
          { range: "15-30min", count: 12 },
          { range: "30-60min", count: 8 },
          { range: "60min+", count: 4 }
        ]
      },
      progress: 92,
      lessonsCompleted: 18,
      totalLessons: 20,
      streak: 12,
      joinDate: "2024-01-20"
    },
    summary: {
      totalSessionsToday: 4,
      avgSessionLengthToday: 42.3,
      activeStudents: 1089,
      lastActiveAt: "2024-01-20T14:15:00Z"
    }
  },
  {
    id: 3,
    name: "David Chen",
    email: "david@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    data: {
      activity: {
        status: "Pending",
        lastActiveAt: "2024-01-25T09:45:00Z",
        totalSessions: [
          { date: "2024-01-25", sessions: 1 },
          { date: "2024-01-24", sessions: 0 },
          { date: "2024-01-23", sessions: 2 },
          { date: "2024-01-22", sessions: 1 },
          { date: "2024-01-21", sessions: 0 },
          { date: "2024-01-20", sessions: 1 },
          { date: "2024-01-19", sessions: 2 }
        ],
        sessionLengthDistribution: [
          { range: "0-5min", count: 3 },
          { range: "5-15min", count: 2 },
          { range: "15-30min", count: 1 },
          { range: "30-60min", count: 0 },
          { range: "60min+", count: 0 }
        ]
      },
      progress: 45,
      lessonsCompleted: 6,
      totalLessons: 15,
      streak: 3,
      joinDate: "2024-01-25"
    },
    summary: {
      totalSessionsToday: 1,
      avgSessionLengthToday: 8.2,
      activeStudents: 1089,
      lastActiveAt: "2024-01-25T09:45:00Z"
    }
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    data: {
      activity: {
        status: "Active",
        lastActiveAt: "2024-02-01T16:20:00Z",
        totalSessions: [
          { date: "2024-02-01", sessions: 2 },
          { date: "2024-01-31", sessions: 3 },
          { date: "2024-01-30", sessions: 1 },
          { date: "2024-01-29", sessions: 4 },
          { date: "2024-01-28", sessions: 2 },
          { date: "2024-01-27", sessions: 3 },
          { date: "2024-01-26", sessions: 1 }
        ],
        sessionLengthDistribution: [
          { range: "0-5min", count: 1 },
          { range: "5-15min", count: 4 },
          { range: "15-30min", count: 6 },
          { range: "30-60min", count: 4 },
          { range: "60min+", count: 2 }
        ]
      },
      progress: 78,
      lessonsCompleted: 14,
      totalLessons: 18,
      streak: 5,
      joinDate: "2024-02-01"
    },
    summary: {
      totalSessionsToday: 2,
      avgSessionLengthToday: 28.7,
      activeStudents: 1089,
      lastActiveAt: "2024-02-01T16:20:00Z"
    }
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    data: {
      activity: {
        status: "Inactive",
        lastActiveAt: "2024-02-05T11:10:00Z",
        totalSessions: [
          { date: "2024-02-05", sessions: 1 },
          { date: "2024-02-04", sessions: 0 },
          { date: "2024-02-03", sessions: 0 },
          { date: "2024-02-02", sessions: 0 },
          { date: "2024-02-01", sessions: 0 },
          { date: "2024-01-31", sessions: 0 },
          { date: "2024-01-30", sessions: 1 }
        ],
        sessionLengthDistribution: [
          { range: "0-5min", count: 2 },
          { range: "5-15min", count: 1 },
          { range: "15-30min", count: 0 },
          { range: "30-60min", count: 0 },
          { range: "60min+", count: 0 }
        ]
      },
      progress: 30,
      lessonsCompleted: 4,
      totalLessons: 15,
      streak: 0,
      joinDate: "2024-02-05"
    },
    summary: {
      totalSessionsToday: 0,
      avgSessionLengthToday: 6.5,
      activeStudents: 1089,
      lastActiveAt: "2024-02-05T11:10:00Z"
    }
  },
];

export const generateSampleLessons = (): Lesson[] => [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React and component-based architecture",
    category: "Frontend",
    difficulty: "Beginner",
    duration: "2 hours",
    students: 245,
    completionRate: 87,
    status: "Published",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    description: "Master advanced TypeScript concepts and patterns",
    category: "Programming",
    difficulty: "Advanced",
    duration: "4 hours",
    students: 189,
    completionRate: 72,
    status: "Published",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-20",
  },
  {
    id: 3,
    title: "Database Design",
    description: "Learn how to design efficient database schemas",
    category: "Backend",
    difficulty: "Intermediate",
    duration: "3 hours",
    students: 156,
    completionRate: 91,
    status: "Published",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-18",
  },
  {
    id: 4,
    title: "API Development",
    description: "Build RESTful APIs with Node.js and Express",
    category: "Backend",
    difficulty: "Intermediate",
    duration: "5 hours",
    students: 203,
    completionRate: 68,
    status: "Published",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-25",
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    description: "Learn fundamental design principles for better user experiences",
    category: "Design",
    difficulty: "Beginner",
    duration: "2.5 hours",
    students: 178,
    completionRate: 85,
    status: "Draft",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-22",
  },
];

export const generateSampleConversations = (): Conversation[] => [
  {
    id: 1,
    student: {
      name: "Alex Johnson",
    },
    topic: "React Hooks Confusion",
    lastMessage: "I'm having trouble understanding useEffect dependencies. Can you help?",
    timestamp: "2 hours ago",
    messageCount: 8,
    sentiment: "Frustrated",
    status: "Active",
    aiResponses: 5,
    resolved: false,
  },
  {
    id: 2,
    student: {
      name: "Maria Garcia",
    },
    topic: "TypeScript Error",
    lastMessage: "Thanks! That fixed the issue. The type assertion worked perfectly.",
    timestamp: "5 hours ago",
    messageCount: 12,
    sentiment: "Positive",
    status: "Resolved",
    aiResponses: 8,
    resolved: true,
  },
  {
    id: 3,
    student: {
      name: "David Chen",
    },
    topic: "Database Query Optimization",
    lastMessage: "How can I improve the performance of this complex query?",
    timestamp: "1 day ago",
    messageCount: 6,
    sentiment: "Neutral",
    status: "Needs Help",
    aiResponses: 3,
    resolved: false,
  },
  {
    id: 4,
    student: {
      name: "Sarah Wilson",
    },
    topic: "CSS Grid Layout",
    lastMessage: "I'm trying to create a responsive grid but it's not working as expected.",
    timestamp: "3 hours ago",
    messageCount: 4,
    sentiment: "Neutral",
    status: "Active",
    aiResponses: 2,
    resolved: false,
  },
  {
    id: 5,
    student: {
      name: "Michael Brown",
    },
    topic: "JavaScript Promises",
    lastMessage: "I understand now! Thanks for the detailed explanation.",
    timestamp: "1 week ago",
    messageCount: 15,
    sentiment: "Positive",
    status: "Resolved",
    aiResponses: 10,
    resolved: true,
  },
];

export const generateSampleAnalytics = (): Analytics => ({
  totalStudents: 1247,
  activeStudents: 1089,
  totalLessons: 89,
  completedLessons: 67,
  totalConversations: 3421,
  averageCompletionRate: 87.3,
  averageProgress: 78.5,
  weeklyEngagement: 92.1,
  monthlyGrowth: 15.7,
});

export const generateSampleDashboardStats = (): DashboardStats => ({
  totalStudents: 1247,
  activeLessons: 89,
  conversations: 3421,
  completionRate: 87.3,
});

export const generateSampleRecentActivity = (): RecentActivity[] => [
  {
    id: 1,
    type: "student",
    title: "Alex Johnson joined",
    description: "New student registered for the platform",
    timestamp: "2 hours ago",
    status: "Active",
  },
  {
    id: 2,
    type: "lesson",
    title: "Advanced TypeScript published",
    description: "New lesson is now available to students",
    timestamp: "5 hours ago",
    status: "Published",
  },
  {
    id: 3,
    type: "conversation",
    title: "Maria Garcia resolved issue",
    description: "Student successfully resolved their TypeScript problem",
    timestamp: "1 day ago",
    status: "Resolved",
  },
  {
    id: 4,
    type: "student",
    title: "David Chen completed lesson",
    description: "Student finished Introduction to React",
    timestamp: "2 days ago",
    status: "Completed",
  },
  {
    id: 5,
    type: "lesson",
    title: "Database Design updated",
    description: "Lesson content was improved and republished",
    timestamp: "3 days ago",
    status: "Updated",
  },
];

// Instructor-specific interfaces and data
export interface StrugglingStudent {
  id: number;
  name: string;
  email: string;
  lastActive: string;
  progress: number;
  strugglingTopics: string[];
  riskLevel: 'High' | 'Medium' | 'Low';
  daysSinceLastSession: number;
}

export interface TopicDifficulty {
  name: string;
  difficulty: 'High' | 'Medium' | 'Low';
  studentsStruggling: number;
  averageTime: string;
  completionRate: number;
}

export interface HotTopic {
  name: string;
  discussionCount: number;
  studentCount: number;
  trend: 'up' | 'down' | 'stable';
  difficulty: 'High' | 'Medium' | 'Low';
  lastActivity: string;
}

export interface StudentProgress {
  id: number;
  name: string;
  email: string;
  progress: number;
  previousProgress: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastActive: string;
  streak: number;
  status: 'On Track' | 'Behind' | 'Ahead' | 'Struggling';
  topics: {
    mastered: string[];
    struggling: string[];
    inProgress: string[];
  };
}

export const generateSampleStrugglingStudents = (): StrugglingStudent[] => [
  {
    id: 1,
    name: "David Chen",
    email: "david@example.com",
    lastActive: "3 days ago",
    progress: 25,
    strugglingTopics: ["Async/Await", "Promises", "Closures"],
    riskLevel: "High",
    daysSinceLastSession: 5,
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily@example.com",
    lastActive: "2 days ago",
    progress: 45,
    strugglingTopics: ["React State", "Props"],
    riskLevel: "Medium",
    daysSinceLastSession: 3,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    lastActive: "1 week ago",
    progress: 15,
    strugglingTopics: ["JavaScript Fundamentals", "Functions"],
    riskLevel: "High",
    daysSinceLastSession: 7,
  },
];

export const generateSampleTopicDifficulties = (): TopicDifficulty[] => [
  {
    name: "Async/Await",
    difficulty: "High",
    studentsStruggling: 12,
    averageTime: "3.2 hours",
    completionRate: 45,
  },
  {
    name: "Closures",
    difficulty: "High",
    studentsStruggling: 8,
    averageTime: "2.8 hours",
    completionRate: 52,
  },
  {
    name: "React State Management",
    difficulty: "High",
    studentsStruggling: 10,
    averageTime: "2.5 hours",
    completionRate: 48,
  },
  {
    name: "Props and Components",
    difficulty: "Medium",
    studentsStruggling: 5,
    averageTime: "1.8 hours",
    completionRate: 72,
  },
  {
    name: "API Calls",
    difficulty: "Medium",
    studentsStruggling: 6,
    averageTime: "2.1 hours",
    completionRate: 68,
  },
  {
    name: "Event Handling",
    difficulty: "Medium",
    studentsStruggling: 4,
    averageTime: "1.5 hours",
    completionRate: 75,
  },
  {
    name: "Variables and Functions",
    difficulty: "Low",
    studentsStruggling: 2,
    averageTime: "1.2 hours",
    completionRate: 88,
  },
  {
    name: "Basic React Components",
    difficulty: "Low",
    studentsStruggling: 1,
    averageTime: "1.0 hours",
    completionRate: 92,
  },
];

export const generateSampleHotTopics = (): HotTopic[] => [
  {
    name: "Async/Await",
    discussionCount: 45,
    studentCount: 23,
    trend: "up",
    difficulty: "High",
    lastActivity: "2 hours ago",
  },
  {
    name: "React Hooks",
    discussionCount: 38,
    studentCount: 19,
    trend: "up",
    difficulty: "High",
    lastActivity: "4 hours ago",
  },
  {
    name: "JavaScript Closures",
    discussionCount: 32,
    studentCount: 16,
    trend: "stable",
    difficulty: "High",
    lastActivity: "6 hours ago",
  },
  {
    name: "API Integration",
    discussionCount: 28,
    studentCount: 14,
    trend: "up",
    difficulty: "Medium",
    lastActivity: "8 hours ago",
  },
  {
    name: "CSS Grid Layout",
    discussionCount: 22,
    studentCount: 11,
    trend: "down",
    difficulty: "Medium",
    lastActivity: "1 day ago",
  },
];

export const generateSampleStudentProgress = (): StudentProgress[] => [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    progress: 85,
    previousProgress: 78,
    lessonsCompleted: 12,
    totalLessons: 15,
    lastActive: "2 hours ago",
    streak: 7,
    status: "On Track",
    topics: {
      mastered: ["Variables", "Functions", "Basic React"],
      struggling: [],
      inProgress: ["Async/Await", "API Calls"],
    },
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    progress: 92,
    previousProgress: 89,
    lessonsCompleted: 18,
    totalLessons: 20,
    lastActive: "1 hour ago",
    streak: 12,
    status: "Ahead",
    topics: {
      mastered: ["Variables", "Functions", "React Components", "State Management"],
      struggling: [],
      inProgress: ["Advanced TypeScript"],
    },
  },
  {
    id: 3,
    name: "David Chen",
    email: "david@example.com",
    progress: 25,
    previousProgress: 30,
    lessonsCompleted: 3,
    totalLessons: 15,
    lastActive: "3 days ago",
    streak: 0,
    status: "Struggling",
    topics: {
      mastered: ["Variables"],
      struggling: ["Async/Await", "Promises", "Closures"],
      inProgress: ["Functions"],
    },
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    progress: 78,
    previousProgress: 75,
    lessonsCompleted: 14,
    totalLessons: 18,
    lastActive: "3 hours ago",
    streak: 5,
    status: "On Track",
    topics: {
      mastered: ["Variables", "Functions", "Basic React"],
      struggling: ["State Management"],
      inProgress: ["Props", "Event Handling"],
    },
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily@example.com",
    progress: 45,
    previousProgress: 50,
    lessonsCompleted: 6,
    totalLessons: 15,
    lastActive: "2 days ago",
    streak: 2,
    status: "Behind",
    topics: {
      mastered: ["Variables"],
      struggling: ["React State", "Props"],
      inProgress: ["Functions", "Basic React"],
    },
  },
];
