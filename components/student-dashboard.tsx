"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PieLabel,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import {
  BookOpen,
  Users,
  MessageCircle,
  GraduationCap,
  CalendarIcon,
  Bell,
  Settings,
  Search,
  ChevronDown,
  Star,
  Heart,
  ThumbsUp,
  Bot,
  User,
  Send,
  Mic,
  Camera,
  FileText,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Play,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Home,
  Share,
  Sidebar,
  Target,
  Trash,
  TrendingUp,
  XCircle,
  Zap,
  Activity,
  Bolt
} from "lucide-react";
import {
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockConversations = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    lastMessage: "Can you explain useEffect dependencies?",
    timestamp: "2 hours ago",
    unread: 0
  },
  {
    id: "2",
    title: "JavaScript Closures",
    lastMessage: "Thanks for the explanation!",
    timestamp: "1 day ago",
    unread: 0
  },
  {
    id: "3",
    title: "CSS Grid Layout",
    lastMessage: "How do I center items in a grid?",
    timestamp: "3 days ago",
    unread: 2
  }
];

const mockMessages = [
  {
    id: "1",
    content: "Hello! I'm your AI learning assistant. How can I help you today?",
    sender: "ai",
    timestamp: "10:30 AM"
  },
  {
    id: "2",
    content: "I'm struggling with understanding React hooks. Can you help?",
    sender: "user",
    timestamp: "10:32 AM"
  },
  {
    id: "3",
    content:
      "Absolutely! React hooks are functions that let you use state and other React features in functional components. The most common ones are useState and useEffect. Would you like me to explain useState first?",
    sender: "ai",
    timestamp: "10:33 AM"
  }
];

const mockStats = {
  sessionsCount: 12,
  totalTime: "24h 30m",
  topicsLearned: ["React", "JavaScript", "CSS", "HTML"],
  currentStreak: 7,
  achievements: [
    {
      id: "1",
      name: "First Steps",
      description: "Completed your first lesson",
      icon: "🎯",
      earned: true
    },
    {
      id: "2",
      name: "Week Warrior",
      description: "7-day learning streak",
      icon: "🔥",
      earned: true
    },
    {
      id: "3",
      name: "Code Master",
      description: "Complete 50 coding challenges",
      icon: "💻",
      earned: false
    }
  ]
};

const chartData = [
  { day: "Mon", lessons: 10, flashCards: 1, chats: 3 },
  { day: "Tue", lessons: 12, flashCards: 3, chats: 9 },
  { day: "Wed", lessons: 8, flashCards: 7, chats: 20 },
  { day: "Thu", lessons: 18, flashCards: 5, chats: 2 },
  { day: "Fri", lessons: 5, flashCards: 9, chats: 25 },
  { day: "Sat", lessons: 9, flashCards: 4, chats: 28 },
  { day: "Sun", lessons: 12, flashCards: 8, chats: 12 }
];

const pieData = [
  { name: "JavaScript", description: "The programming language of the web", value: 400, fill: "var(--chart-1)" },
  { name: "Python", description: "Train Machine Learning Models", value: 300, fill: "var(--chart-2)" },
  { name: "Java", description: "Build Android Apps", value: 200, fill: "var(--chart-3)" },
  { name: "C", description: "Low-Level Systems Programming", value: 100, fill: "var(--chart-4)" }
];

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@school.edu",
    grade: "A",
    course: "Mathematics",
    progress: 85
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@school.edu",
    grade: "B+",
    course: "Science",
    progress: 78
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@school.edu",
    grade: "A-",
    course: "English",
    progress: 92
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@school.edu",
    grade: "B",
    course: "History",
    progress: 67
  }
];

export const StudentDashboard = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [isConversationsOpen, setIsConversationsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  // Imported from components/page.tsx
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(65);
  const [sliderValue, setSliderValue] = useState([50]);
  const [chatMessage, setChatMessage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        content: currentMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="students">Lessons</TabsTrigger>
          <TabsTrigger value="courses">Chat</TabsTrigger>
          <TabsTrigger value="analytics">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/*
          Calendar
          Usage: `Calendar` supports `mode` (e.g., "single") and
          controlled `selected` value with `onSelect` handler. Use
          for picking dates or displaying schedules.
          */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar & Events</CardTitle>
              <CardDescription>Important dates and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Schedule</CardTitle>
                      <CardDescription>
                        What you have planned by month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-full"
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>
                        Monthly enrollment and course completion data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg border">
                          <CalendarIcon className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="font-medium">Midterm Exams</p>
                            <p className="text-sm text-muted-foreground">
                              March 15-20, 2024
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg border">
                          <Clock className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="font-medium">Assignment Due</p>
                            <p className="text-sm text-muted-foreground">
                              March 10, 2024
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg border">
                          <Users className="h-4 w-4 text-purple-500" />
                          <div>
                            <p className="font-medium">Study Group</p>
                            <p className="text-sm text-muted-foreground">
                              March 8, 2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/*
         Student Table
         Usage: Use `Table` with `TableHeader`, `TableBody`, and
         `TableRow`/`TableCell` elements. `TableCaption` is optional
         for describing the table. Good for tabular data and actions.
        */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Courses</CardTitle>
              <CardDescription>
                Jump right into your favourite courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Recents
                </Label>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {pieData.map((course) => (
                      <CarouselItem key={course.name}>
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <div className="text-center">
                              <BookOpen className="h-12 w-12 mx-auto mb-2" />
                              <h3 className="font-semibold">{course.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {course.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          {/* AI Chatbot Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Learning Assistant
              </CardTitle>
              <CardDescription>
                Interactive chatbot for student support and tutoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[300px] w-full border rounded-md p-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Hello! I'm your AI learning assistant. How can I help
                        you with your studies today?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Can you help me understand quadratic equations?
                      </p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Quadratic equations are polynomial equations of degree
                        2. They have the general form ax² + bx + c = 0. Would
                        you like me to walk you through solving one step by
                        step?
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about your studies..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon" variant="outline">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Camera className="h-4 w-4" />
                </Button>
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/*
         Stats Cards
         Usage: Generic `Card` layout composed of `CardHeader`,
         `CardTitle`, `CardContent` and optional `CardDescription`.
         Use icons in headers for quick visual cues.
        */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Lessons
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +20% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Flash Cards
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  <Target className="inline h-3 w-3 mr-1" />6 completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Interactions
                </CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,765</div>
                <p className="text-xs text-muted-foreground">
                  <Zap className="inline h-3 w-3 mr-1" />
                  +15% this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Course Progress
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <Progress value={87} className="mt-2" />
                <p className="text-xs text-muted-foreground">
                  <CheckCircle className="inline h-3 w-3 mr-1" />
                  Above target
                </p>
              </CardContent>
            </Card>
          </div>

          {/*
         Charts
         Usage: Use `ChartContainer` as a wrapper and provide Recharts
         components inside a `ResponsiveContainer`. `ChartContainer`
         accepts a `config` prop mapping series to labels/colors.
         Example: LineChart and PieChart usage shown below.
        */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
                <CardDescription>
                  Your usage trends on lessons, flash cards, and chats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    lessons: {
                      label: "Lessons",
                      color: "var(--chart-1)"
                    },
                    flashCards: {
                      label: "Flash Cards",
                      color: "var(--chart-2)"
                    },
                    chats: {
                      label: "Chats",
                      color: "var(--chart-3)"
                    }
                  }}
                  // className="h-[300px]"
                >
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="lessons"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        name="Lessons"
                      />
                      <Line
                        type="monotone"
                        dataKey="flashCards"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        name="Flash Cards"
                      />
                      <Line
                        type="monotone"
                        dataKey="chats"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                        name="Chats"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Distribution</CardTitle>
                <CardDescription>
                  Popular subjects by enrollment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    javascript: {
                      label: "JavaScript",
                      color: "var(--chart-1)"
                    },
                    python: { label: "Python", color: "var(--chart-2)" },
                    java: { label: "Java", color: "var(--chart-3)" },
                    c: { label: "C", color: "var(--chart-4)" }
                  }}
                  // className="h-[300px]"
                >
                  <ResponsiveContainer>
                    <PieChart>
                      {" "}
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={
                          (({
                            name,
                            percent
                          }: {
                            name: string;
                            percent: number;
                          }) => `${name} ${(percent * 100).toFixed(0)}%`) as any
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          {/*
         Analytics Dashboard
         Usage: Collection of `Card` components showing `Progress`,
         `Badge`, and `ScrollArea`. Use `Calendar` for date selection
         (controlled by `selected` and `onSelect`).
        */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Assignment Completion</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Quiz Performance</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Flashcards Completed</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tutor Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Questions Asked</span>
                    <Badge>247</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Problems Solved</span>
                    <Badge variant="secondary">189</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Study Sessions</span>
                    <Badge variant="outline">34</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <Badge variant="default">76%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recents</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="text-sm">
                        <p className="font-medium">Quiz completed</p>
                        <p className="text-muted-foreground">
                          Mathematics - Algebra
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bot className="h-4 w-4 text-blue-500" />
                      <div className="text-sm">
                        <p className="font-medium">AI Tutor session</p>
                        <p className="text-muted-foreground">Calculus help</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Upload className="h-4 w-4 text-purple-500" />
                      <div className="text-sm">
                        <p className="font-medium">Assignment submitted</p>
                        <p className="text-muted-foreground">
                          Physics Lab Report
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <div className="text-sm">
                        <p className="font-medium">Achievement unlocked</p>
                        <p className="text-muted-foreground">Problem Solver</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
