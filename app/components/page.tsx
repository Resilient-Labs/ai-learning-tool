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
  Activity
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

const chartData = [
  { month: "Jan", students: 186, courses: 80 },
  { month: "Feb", students: 305, courses: 200 },
  { month: "Mar", students: 237, courses: 120 },
  { month: "Apr", students: 273, courses: 190 },
  { month: "May", students: 209, courses: 130 },
  { month: "Jun", students: 214, courses: 140 }
];

const pieData = [
  { name: "Mathematics", value: 400, fill: "var(--chart-1)" },
  { name: "Science", value: 300, fill: "var(--chart-2)" },
  { name: "Literature", value: 200, fill: "var(--chart-3)" },
  { name: "History", value: 100, fill: "var(--chart-4)" }
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

export default function MicroComponentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(65);
  const [sliderValue, setSliderValue] = useState([50]);
  const [chatMessage, setChatMessage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast } = useToast();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-8">
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                {/* <SidebarTrigger /> */}
                <h1 className="text-3xl font-bold text-foreground ml-4 inline">
                  Design Showcase
                </h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive UI components for the AI Learning Platform
                </p>
              </div>
            </div>

            {/*
             Breadcrumb
             Usage: Wrap `BreadcrumbList` with `Breadcrumb` and provide
             `BreadcrumbItem` children. Use `BreadcrumbLink` for links and
             `BreadcrumbPage` for the current page. `BreadcrumbSeparator`
             renders a visual separator between items.
             Props: none (wrapper component)
             Example:
             <Breadcrumb>
               <BreadcrumbList>
                 <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                 <BreadcrumbSeparator />
                 <BreadcrumbItem><BreadcrumbPage>Designs</BreadcrumbPage></BreadcrumbItem>
               </BreadcrumbList>
             </Breadcrumb>
            */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>components</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/*
             Navigation Menu
             Usage: Use `NavigationMenu` as the root, with `NavigationMenuList`
             containing `NavigationMenuItem`s. Each item can have a
             `NavigationMenuTrigger` and an associated `NavigationMenuContent`.
             Good for feature or section shortcuts with rich content.
             Example:
             <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>...</NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
             </NavigationMenu>
            */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">
                          Forms
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Input fields, selects, and form controls
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Data Display</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px]">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">
                          Charts & Tables
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Data visualization components
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/*
             Menubar
             Usage: Top-level menu bar similar to desktop application menus.
             Compose `Menubar` with multiple `MenubarMenu` children. Each
             `MenubarMenu` should include a `MenubarTrigger` and
             `MenubarContent` which contains `MenubarItem`s and optional
             separators. Use for file/edit style actions.
            */}
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>New Course</MenubarItem>
                  <MenubarItem>Import Students</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Export Data</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Undo</MenubarItem>
                  <MenubarItem>Redo</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            {/*
             Alerts
             Usage: `Alert` shows an inline message. Include an icon,
             `AlertTitle`, and `AlertDescription`. Use `variant="destructive"`
             for error/destructive states.
             Example:
             <Alert>
               <AlertCircle />
               <AlertTitle>Title</AlertTitle>
               <AlertDescription>Details</AlertDescription>
             </Alert>
            */}
            <div className="grid gap-4 md:grid-cols-2">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>AI Tutor Update</AlertTitle>
                <AlertDescription>
                  New AI capabilities have been added to help students with
                  advanced mathematics.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>System Maintenance</AlertTitle>
                <AlertDescription>
                  Scheduled maintenance will occur tonight from 2-4 AM EST.
                </AlertDescription>
              </Alert>
            </div>

            {/*
             Tabs with Content
             Usage: Wrap with `Tabs` and provide a `TabsList` of `TabsTrigger`s
             and matching `TabsContent` sections identified by their `value`.
             Props: `defaultValue` to set the initial tab.
            */}
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
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
                        Total Students
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,234</div>
                      <p className="text-xs text-muted-foreground">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Courses
                      </CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">45</div>
                      <p className="text-xs text-muted-foreground">
                        <Target className="inline h-3 w-3 mr-1" />3 new this
                        week
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
                        Completion Rate
                      </CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87%</div>
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
                      <CardTitle>Student Enrollment Trends</CardTitle>
                      <CardDescription>
                        Monthly enrollment and course completion data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          students: {
                            label: "Students",
                            color: "var(--chart-1)"
                          },
                          courses: {
                            label: "Courses",
                            color: "var(--chart-2)"
                          }
                        }}
                        // className="h-[300px]"
                      >
                        <ResponsiveContainer>
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="students"
                              stroke="var(--chart-1)"
                              strokeWidth={2}
                              name="Students"
                            />
                            <Line
                              type="monotone"
                              dataKey="courses"
                              stroke="var(--chart-2)"
                              strokeWidth={2}
                              name="Courses"
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
                          mathematics: {
                            label: "Mathematics",
                            color: "#0088FE"
                          },
                          science: { label: "Science", color: "#00C49F" },
                          english: { label: "English", color: "#FFBB28" },
                          history: { label: "History", color: "#FF8042" }
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
                                }) =>
                                  `${name} ${(percent * 100).toFixed(
                                    0
                                  )}%`) as any
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
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>
                      Manage student profiles and track their progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableCaption>
                        A list of enrolled students and their progress.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage
                                    src={`/student-.jpg?height=32&width=32&query=student-${student.id}`}
                                  />
                                  <AvatarFallback>
                                    {student.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {student.name}
                              </div>
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {student.course}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  student.grade.startsWith("A")
                                    ? "default"
                                    : "outline"
                                }
                              >
                                {student.grade}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={student.progress}
                                  className="w-[60px]"
                                />
                                <span className="text-sm text-muted-foreground">
                                  {student.progress}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Student
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Remove Student
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/*
                 Pagination
                 Usage: Combine `Pagination`, `PaginationContent`, and
                 `PaginationItem` nodes. Use `PaginationLink` for page links
                 and `PaginationPrevious`/`PaginationNext` for navigation.
                */}
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                {/*
                 Course Management (Forms)
                 Usage: Demonstrates form controls: `Input`, `Textarea`,
                 `Select`, `Slider`, `Switch`, `Checkbox`, `RadioGroup`, and
                 `ToggleGroup`. These components are controlled/uncontrolled
                 depending on props; many accept `id`, `defaultValue`, and
                 change callbacks.
                */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Course</CardTitle>
                      <CardDescription>
                        Add a new course to the learning platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="course-name">Course Name</Label>
                        <Input
                          id="course-name"
                          placeholder="Advanced Mathematics"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course-description">Description</Label>
                        <Textarea
                          id="course-description"
                          placeholder="Course description..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course-category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">
                              Mathematics
                            </SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <Slider
                          id="difficulty"
                          min={1}
                          max={5}
                          step={1}
                          value={sliderValue}
                          onValueChange={setSliderValue}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Beginner</span>
                          <span>Advanced</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="ai-enabled" />
                        <Label htmlFor="ai-enabled">Enable AI Tutor</Label>
                      </div>
                      <Button className="w-full">Create Course</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Settings</CardTitle>
                      <CardDescription>
                        Configure course preferences and features
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <Label>Notification Preferences</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="email-notifications" />
                            <Label htmlFor="email-notifications">
                              Email notifications
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="push-notifications" />
                            <Label htmlFor="push-notifications">
                              Push notifications
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sms-notifications" />
                            <Label htmlFor="sms-notifications">
                              SMS notifications
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <Label>Grading System</Label>
                        <RadioGroup defaultValue="letter">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="letter" id="letter" />
                            <Label htmlFor="letter">Letter grades (A-F)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="percentage"
                              id="percentage"
                            />
                            <Label htmlFor="percentage">
                              Percentage (0-100%)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="points" id="points" />
                            <Label htmlFor="points">Point system</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <Label>Course Visibility</Label>
                        <ToggleGroup type="single" defaultValue="public">
                          <ToggleGroupItem value="public">
                            Public
                          </ToggleGroupItem>
                          <ToggleGroupItem value="private">
                            Private
                          </ToggleGroupItem>
                          <ToggleGroupItem value="invite">
                            Invite Only
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/*
                 Accordion for Course Modules
                 Usage: Use `Accordion` with `AccordionItem`s. Each item has
                 an `AccordionTrigger` and `AccordionContent`. `type="single"`
                 makes it behave like an accordion; `collapsible` allows
                 closing the active item.
                */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Modules</CardTitle>
                    <CardDescription>
                      Organize your course content into modules
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="module-1">
                        <AccordionTrigger>
                          Module 1: Introduction to AI
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <p>
                              This module covers the basics of artificial
                              intelligence and machine learning.
                            </p>
                            <div className="flex gap-2">
                              <Badge>Video Lesson</Badge>
                              <Badge variant="outline">Quiz</Badge>
                              <Badge variant="secondary">Assignment</Badge>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="module-2">
                        <AccordionTrigger>
                          Module 2: Machine Learning Fundamentals
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <p>
                              Deep dive into machine learning algorithms and
                              applications.
                            </p>
                            <div className="flex gap-2">
                              <Badge>Interactive Lab</Badge>
                              <Badge variant="outline">Project</Badge>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="module-3">
                        <AccordionTrigger>
                          Module 3: Neural Networks
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <p>
                              Understanding neural networks and deep learning
                              concepts.
                            </p>
                            <div className="flex gap-2">
                              <Badge>Simulation</Badge>
                              <Badge variant="outline">Final Exam</Badge>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
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
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>AI Tutor Interactions</CardTitle>
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
                          <span className="text-sm font-medium">
                            Success Rate
                          </span>
                          <Badge variant="default">76%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
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
                              <p className="text-muted-foreground">
                                Calculus help
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Upload className="h-4 w-4 text-purple-500" />
                            <div className="text-sm">
                              <p className="font-medium">
                                Assignment submitted
                              </p>
                              <p className="text-muted-foreground">
                                Physics Lab Report
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <div className="text-sm">
                              <p className="font-medium">
                                Achievement unlocked
                              </p>
                              <p className="text-muted-foreground">
                                Problem Solver
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                {/*
                 Calendar
                 Usage: `Calendar` supports `mode` (e.g., "single") and
                 controlled `selected` value with `onSelect` handler. Use
                 for picking dates or displaying schedules.
                */}
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Calendar</CardTitle>
                    <CardDescription>
                      Important dates and deadlines
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                      <div className="space-y-4">
                        <h4 className="font-semibold">Upcoming Events</h4>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/*
             Interactive Components Section
             Usage: Showcases interactive primitives like `Dialog`, `Sheet`,
             `Popover`, and `HoverCard`. Typically each has a `Trigger`
             and content component. Use `asChild` to wrap custom triggers
             (e.g., `Button`).
            */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive Components</CardTitle>
                <CardDescription>
                  Dialogs, sheets, popovers, and other interactive elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/*
                   Dialog
                   Usage: `Dialog` requires a `DialogTrigger` and `DialogContent`.
                   Provide a `DialogHeader` with `DialogTitle` and
                   `DialogDescription` for consistent layout. Use `asChild`
                   on triggers to render custom trigger elements.
                  */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Student Profile</DialogTitle>
                        <DialogDescription>
                          View and edit student information
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="student-name">Name</Label>
                          <Input
                            id="student-name"
                            defaultValue="Alice Johnson"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-email">Email</Label>
                          <Input
                            id="student-email"
                            defaultValue="alice@school.edu"
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/*
                   Sheet
                   Usage: Mobile-friendly slide-over panel. `SheetTrigger`
                   opens the sheet and `SheetContent` contains the body.
                   Use `SheetHeader`, `SheetTitle`, and `SheetDescription` for
                   consistent structure.
                  */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Course Details</SheetTitle>
                        <SheetDescription>
                          Detailed information about the selected course
                        </SheetDescription>
                      </SheetHeader>
                      <div className="space-y-4 mt-6">
                        <div>
                          <h4 className="font-semibold">Mathematics 101</h4>
                          <p className="text-sm text-muted-foreground">
                            Introduction to Algebra
                          </p>
                        </div>
                        <Separator />
                        <div>
                          <h5 className="font-medium">Instructor</h5>
                          <p className="text-sm">Dr. Sarah Wilson</p>
                        </div>
                        <div>
                          <h5 className="font-medium">Schedule</h5>
                          <p className="text-sm">Mon, Wed, Fri - 10:00 AM</p>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/*
                   Popover
                   Usage: Small floating panel anchored to a trigger.
                   Use `PopoverTrigger` and `PopoverContent`. Good for
                   quick actions and menus.
                  */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="space-y-2">
                        <h4 className="font-medium">Quick Actions</h4>
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Student
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Create Course
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Bot className="mr-2 h-4 w-4" />
                            AI Assistant
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/*
                   Hover Card
                   Usage: Reveal extra information on hover. `HoverCardTrigger`
                   wraps the element that should reveal content and
                   `HoverCardContent` holds the details. Keep content brief.
                  */}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="outline">Hover Card</Button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src="/diverse-classroom-teacher.png" />
                          <AvatarFallback>SW</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            Dr. Sarah Wilson
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Mathematics Professor
                          </p>
                          <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-3 w-3 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                              Teaching since 2015
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <Separator className="my-6" />

                {/*
                 More Interactive Elements
                 Usage: Examples of `AlertDialog`, `Drawer`, and `Tooltip`.
                 `AlertDialog` is used for destructive confirmations and
                 includes `AlertDialogTrigger` and `AlertDialogContent` with
                 action/cancel controls.
                */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/*
                   Alert Dialog
                   Usage: Confirmation modal for destructive actions. Use
                   `AlertDialogTrigger` (often a destructive button) and
                   include `AlertDialogHeader`, `AlertDialogTitle`, and
                   `AlertDialogDescription`. Provide `AlertDialogCancel`
                   and `AlertDialogAction` in the footer.
                  */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Course</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the course and remove all associated data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Delete Course</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/*
                   Drawer
                   Usage: Persistent side panel for chat or details. Use
                   `DrawerTrigger` to open and `DrawerContent` to render the
                   panel. `DrawerFooter` can contain actions like Close.
                  */}
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>AI Tutor Chat</DrawerTitle>
                        <DrawerDescription>
                          Ask questions and get instant help
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm">
                              How can I help you with your studies today?
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Input placeholder="Ask a question..." />
                          <Button size="sm">Send</Button>
                        </div>
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>

                  {/*
                   Tooltip Examples
                   Usage: Use `Tooltip` with `TooltipTrigger` and
                   `TooltipContent`. Wrap `TooltipTrigger` with `asChild`
                   to use custom trigger elements (buttons, icons).
                  */}
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to favorites</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share course</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download materials</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/*
             Advanced Components
             Usage: Collapsible, Input OTP, and other advanced layout
             components. Each component has its own control props shown
             in the examples below.
            */}
            <div className="grid gap-6 md:grid-cols-2">
              {/*
               Collapsible
               Usage: `Collapsible` manages show/hide state and exposes
               `onOpenChange`. `CollapsibleTrigger` toggles, and
               `CollapsibleContent` wraps the collapsible area.
              */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center justify-between w-full p-0"
                      >
                        <span>Week 1-4: Fundamentals</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isCollapsed ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      <div className="pl-4 space-y-1">
                        <p className="text-sm">• Introduction to concepts</p>
                        <p className="text-sm">• Basic problem solving</p>
                        <p className="text-sm">• Practice exercises</p>
                        <p className="text-sm">• First assessment</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/*
               Input OTP
               Usage: `InputOTP` groups several `InputOTPSlot` inputs to
               create a multi-field one-time-password input. Pass `maxLength`
               and optionally style groups with `InputOTPGroup`.
              */}
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Enter the 6-digit code from your authenticator app
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </CardContent>
              </Card>
            </div>

            {/*
             Resizable Panels
             Usage: `ResizablePanelGroup` composes resizable panels with
             `ResizablePanel` and `ResizableHandle`. Use `direction`
             prop to control horizontal/vertical layout and `defaultSize`
             to set initial proportions.
            */}
            <Card>
              <CardHeader>
                <CardTitle>Resizable Layout</CardTitle>
                <CardDescription>
                  Drag the handles to resize panels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResizablePanelGroup
                  direction="horizontal"
                  className="min-h-[200px] rounded-lg border"
                >
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <div className="text-center">
                        <BookOpen className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-semibold">Course Content</p>
                        <p className="text-sm text-muted-foreground">
                          Lessons and materials
                        </p>
                      </div>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                      <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                          <div className="text-center">
                            <Bot className="h-6 w-6 mx-auto mb-2" />
                            <p className="font-medium">AI Tutor</p>
                          </div>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                          <div className="text-center">
                            <Users className="h-6 w-6 mx-auto mb-2" />
                            <p className="font-medium">Discussion Forum</p>
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </CardContent>
            </Card>

            {/*
             Carousel
             Usage: `Carousel` contains `CarouselContent` and
             child `CarouselItem`s. Use `CarouselPrevious` and
             `CarouselNext` for navigation. Good for featured content.
            */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Courses</CardTitle>
                <CardDescription>
                  Browse our most popular courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <div className="text-center">
                                <div className="text-2xl font-semibold">
                                  {index}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Course {index}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            {/*
             Context Menu
             Usage: Right-click context menu built with `ContextMenu`.
             Use `ContextMenuTrigger` to define the target area and
             `ContextMenuContent` to list `ContextMenuItem`s.
            */}
            <Card>
              <CardHeader>
                <CardTitle>Context Menu</CardTitle>
                <CardDescription>
                  Right-click on the area below to see context menu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContextMenu>
                  <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                    Right-click here
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Student
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Course
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </CardContent>
            </Card>

            {/*
             Skeleton Loading
             Usage: `Skeleton` components provide loading placeholders.
             Use varying sizes and shapes (rounded/full) to match UI.
            */}
            <Card>
              <CardHeader>
                <CardTitle>Loading States</CardTitle>
                <CardDescription>
                  Skeleton components for loading states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/*
             Toast Demo
             Usage: Use the `toast` helper from `use-toast` hook to show
             transient notifications. Call `toast({ title: 'Title', description: 'Details', variant: 'destructive' })`.
            */}
            <Card>
              <CardHeader>
                <CardTitle>Toast Notifications</CardTitle>
                <CardDescription>
                  Show different types of toast messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Success!",
                        description: "Student has been enrolled successfully."
                      });
                    }}
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to save changes. Please try again."
                      });
                    }}
                  >
                    Error Toast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-center gap-2">
            <Badge variant="default">Designs</Badge>
            <Badge variant="secondary">Educational</Badge>
            <Badge variant="outline">AI-Powered</Badge>
          </div>

          {/* Navigation Components */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Navigation Components
              </CardTitle>
              <CardDescription>
                Navigation menus, breadcrumbs, and menu systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Breadcrumb Navigation
                </Label>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Mathematics 101</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Navigation Menu
                </Label>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              Mathematics
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Advanced calculus and algebra courses
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                        Students
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Menubar
                </Label>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New Assignment</MenubarItem>
                      <MenubarItem>Open Course</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Export Grades</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo</MenubarItem>
                      <MenubarItem>Redo</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </CardContent>
          </Card>

          {/* Form Components */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Form Components
              </CardTitle>
              <CardDescription>
                Input fields, selects, and form controls for student
                registration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="student-name">Student Name</Label>
                    <Input id="student-name" placeholder="Enter full name" />
                  </div>

                  <div>
                    <Label htmlFor="student-email">Email Address</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="grade-level">Grade Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">9th Grade</SelectItem>
                        <SelectItem value="10">10th Grade</SelectItem>
                        <SelectItem value="11">11th Grade</SelectItem>
                        <SelectItem value="12">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bio">Student Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Preferred Subjects</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="math" />
                        <Label htmlFor="math">Mathematics</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="science" />
                        <Label htmlFor="science">Science</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="literature" />
                        <Label htmlFor="literature">Literature</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Learning Style</Label>
                    <RadioGroup defaultValue="visual" className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="visual" id="visual" />
                        <Label htmlFor="visual">Visual Learner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="auditory" id="auditory" />
                        <Label htmlFor="auditory">Auditory Learner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                        <Label htmlFor="kinesthetic">Kinesthetic Learner</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" />
                      <Label htmlFor="notifications">Email Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="ai-tutor" defaultChecked />
                      <Label htmlFor="ai-tutor">AI Tutor Assistance</Label>
                    </div>
                  </div>

                  <div>
                    <Label>Study Hours per Week: {sliderValue[0]}</Label>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={40}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Verification Code</Label>
                <InputOTP maxLength={6} className="mt-2">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </CardContent>
          </Card>

          {/* Data Display Components */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Data Display Components
              </CardTitle>
              <CardDescription>
                Tables, charts, and data visualization for academic performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Student Performance Table
                </Label>
                <Table>
                  <TableCaption>Recent student performance data</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Alice Johnson
                      </TableCell>
                      <TableCell>Mathematics</TableCell>
                      <TableCell>
                        <Badge variant="default">A+</Badge>
                      </TableCell>
                      <TableCell className="text-right">95%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bob Smith</TableCell>
                      <TableCell>Science</TableCell>
                      <TableCell>
                        <Badge variant="secondary">B+</Badge>
                      </TableCell>
                      <TableCell className="text-right">87%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Carol Davis</TableCell>
                      <TableCell>Literature</TableCell>
                      <TableCell>
                        <Badge variant="outline">A</Badge>
                      </TableCell>
                      <TableCell className="text-right">92%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Student Enrollment Trends
                  </Label>
                  <ChartContainer
                    config={{
                      students: {
                        label: "Students",
                        color: "var(--chart-1)"
                      },
                      courses: {
                        label: "Courses",
                        color: "var(--chart-2)"
                      }
                    }}
                    // className="h-[300px]"
                  >
                    <ResponsiveContainer>
                      <LineChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="students"
                          stroke="var(--color-students)"
                          strokeWidth={3}
                          dot={{
                            fill: "var(--color-students)",
                            strokeWidth: 2,
                            r: 4
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="courses"
                          stroke="var(--color-courses)"
                          strokeWidth={3}
                          dot={{
                            fill: "var(--color-courses)",
                            strokeWidth: 2,
                            r: 4
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Subject Distribution
                  </Label>
                  <ChartContainer
                    config={{
                      mathematics: {
                        label: "Mathematics",
                        color: "var(--chart-1)"
                      },
                      science: {
                        label: "Science",
                        color: "var(--chart-2)"
                      },
                      literature: {
                        label: "Literature",
                        color: "var(--chart-3)"
                      },
                      history: {
                        label: "History",
                        color: "var(--chart-4)"
                      }
                    }}
                    // className="h-[300px]"
                  >
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={
                            (({
                              name,
                              value
                            }: {
                              name: string;
                              value: number;
                            }) => `${name} ${value}`) as any
                          }
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Course Progress
                </Label>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mathematics 101</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Physics Fundamentals</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>World Literature</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Components */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Interactive Components
              </CardTitle>
              <CardDescription>
                Dialogs, sheets, popovers, and interactive elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">Open Assignment Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Assignment</DialogTitle>
                      <DialogDescription>
                        Create a new assignment for your students.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="assignment-title">
                          Assignment Title
                        </Label>
                        <Input
                          id="assignment-title"
                          placeholder="Enter assignment title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="due-date">Due Date</Label>
                        <Input id="due-date" type="date" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Assignment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Student Profile Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Student Profile</SheetTitle>
                      <SheetDescription>
                        View and edit student information.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">Alice Johnson</h4>
                          <p className="text-sm text-muted-foreground">
                            Grade 11 Student
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Academic Performance</Label>
                        <Progress value={88} />
                        <p className="text-sm text-muted-foreground">
                          Overall GPA: 3.8
                        </p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">Grade Calculator</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Quick Grade Calculator</h4>
                      <div className="space-y-2">
                        <Label htmlFor="points-earned">Points Earned</Label>
                        <Input
                          id="points-earned"
                          type="number"
                          placeholder="85"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total-points">Total Points</Label>
                        <Input
                          id="total-points"
                          type="number"
                          placeholder="100"
                        />
                      </div>
                      <Button className="w-full">Calculate Grade</Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Course</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the course and remove all associated student
                        data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Delete Course</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Mobile Menu</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Quick Actions</DrawerTitle>
                      <DrawerDescription>
                        Common tasks for educators
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 space-y-2">
                      <Button className="w-full justify-start" variant="ghost">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Assignment
                      </Button>
                      <Button className="w-full justify-start" variant="ghost">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Students
                      </Button>
                      <Button className="w-full justify-start" variant="ghost">
                        <FileText className="mr-2 h-4 w-4" />
                        Grade Reports
                      </Button>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>

              <div className="flex flex-wrap gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Course Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Course Management</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      Manage Students
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export Grades
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Course
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link">@teacher_johnson</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>TJ</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          @teacher_johnson
                        </h4>
                        <p className="text-sm">
                          Mathematics Department Head with 15 years of
                          experience.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-xs text-muted-foreground">
                            Joined September 2008
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          {/* Layout Components */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Layout & Organization Components
              </CardTitle>
              <CardDescription>
                Tabs, accordions, carousels, and organizational elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Course Information Tabs
                </Label>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mathematics 101</CardTitle>
                        <CardDescription>
                          Introduction to Algebra and Geometry
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          This course covers fundamental mathematical concepts
                          including algebraic expressions, geometric principles,
                          and problem-solving techniques.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="curriculum">
                    <Card>
                      <CardContent className="pt-6">
                        <p>
                          Detailed curriculum content would be displayed here...
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="assignments">
                    <Card>
                      <CardContent className="pt-6">
                        <p>
                          Assignment list and submission portal would be here...
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="grades">
                    <Card>
                      <CardContent className="pt-6">
                        <p>
                          Grade book and performance analytics would be
                          displayed...
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Frequently Asked Questions
                </Label>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I submit assignments?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can submit assignments through the course portal by
                      clicking on the assignment link and uploading your
                      completed work. Make sure to submit before the due date.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How is my grade calculated?
                    </AccordionTrigger>
                    <AccordionContent>
                      Your final grade is calculated based on assignments (40%),
                      quizzes (30%), midterm exam (15%), and final exam (15%).
                      All grades are weighted accordingly.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Can I get help from the AI tutor?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes! Our AI tutor is available 24/7 to help with homework
                      questions, explain concepts, and provide study guidance.
                      Click the chat icon to start a conversation.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Featured Courses Carousel
                </Label>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    <CarouselItem>
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="text-center">
                            <BookOpen className="h-12 w-12 mx-auto mb-2" />
                            <h3 className="font-semibold">Mathematics</h3>
                            <p className="text-sm text-muted-foreground">
                              Advanced Calculus
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem>
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="text-center">
                            <GraduationCap className="h-12 w-12 mx-auto mb-2" />
                            <h3 className="font-semibold">Science</h3>
                            <p className="text-sm text-muted-foreground">
                              Physics & Chemistry
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem>
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="text-center">
                            <FileText className="h-12 w-12 mx-auto mb-2" />
                            <h3 className="font-semibold">Literature</h3>
                            <p className="text-sm text-muted-foreground">
                              World Literature
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Collapsible Study Resources
                </Label>
                <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-between w-full p-4 border rounded-lg"
                    >
                      <span>Additional Study Materials</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isCollapsed ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    <div className="rounded-md border px-4 py-2">
                      <p className="text-sm">📚 Textbook: Chapter 5-7 Review</p>
                    </div>
                    <div className="rounded-md border px-4 py-2">
                      <p className="text-sm">
                        🎥 Video Lectures: Algebraic Functions
                      </p>
                    </div>
                    <div className="rounded-md border px-4 py-2">
                      <p className="text-sm">📝 Practice Problems: Set A & B</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

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

          {/* Utility Components */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Utility Components
              </CardTitle>
              <CardDescription>
                Alerts, skeletons, separators, and utility elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Alert>
                  <Bell className="h-4 w-4" />
                  <AlertTitle>New Assignment Posted!</AlertTitle>
                  <AlertDescription>
                    Your Mathematics teacher has posted a new assignment due
                    next Friday.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertTitle>Assignment Overdue</AlertTitle>
                  <AlertDescription>
                    You have 2 overdue assignments. Please submit them as soon
                    as possible.
                  </AlertDescription>
                </Alert>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Loading States (Skeletons)
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Toggle Controls
                </Label>
                <div className="flex items-center space-x-4">
                  <ToggleGroup type="multiple">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                      <strong>B</strong>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                      <em>I</em>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="underline"
                      aria-label="Toggle underline"
                    >
                      <u>U</u>
                    </ToggleGroupItem>
                  </ToggleGroup>

                  <Separator orientation="vertical" className="h-6" />

                  <div className="flex items-center space-x-2">
                    <Toggle aria-label="Toggle favorite">
                      <Heart className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle like">
                      <ThumbsUp className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle star">
                      <Star className="h-4 w-4" />
                    </Toggle>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Command Palette
                </Label>
                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Search courses, students, or assignments..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Courses">
                      <CommandItem>
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Mathematics 101</span>
                      </CommandItem>
                      <CommandItem>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        <span>Physics Fundamentals</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Students">
                      <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Alice Johnson</span>
                      </CommandItem>
                      <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Bob Smith</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Calendar Widget
                </Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-fit"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Pagination
                </Label>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Layout Components */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Layout Components</CardTitle>
              <CardDescription>
                Resizable panels and aspect ratio containers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Resizable Dashboard Layout
                </Label>
                <ResizablePanelGroup
                  direction="horizontal"
                  className="min-h-[200px] rounded-lg border"
                >
                  <ResizablePanel defaultSize={25}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">Sidebar</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={75}>
                    <ResizablePanelGroup direction="vertical">
                      <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                          <span className="font-semibold">Header</span>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                          <span className="font-semibold">Main Content</span>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Video Aspect Ratio Container
                </Label>
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Play className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">Educational Video Player</p>
                      <p className="text-sm text-muted-foreground">
                        16:9 Aspect Ratio
                      </p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </CardContent>
          </Card>

          {/* Context Menu Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Context Menu</CardTitle>
              <CardDescription>
                Right-click the area below to see the context menu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContextMenu>
                <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                  Right-click here for context menu
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Assignment
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resources
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Submission
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center py-8 border-t">
            <p className="text-muted-foreground">
              AI Learning Tool Designs - Comprehensive UI Components
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Next.js, Tailwind CSS, and shadcn/ui components
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
