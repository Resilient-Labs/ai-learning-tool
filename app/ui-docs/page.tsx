"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Badge as _Badge } from "@/components/ui/badge";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from "@/components/ui/input-otp";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter
} from "@/components/ui/drawer";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem
} from "@/components/ui/context-menu";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty
} from "@/components/ui/command";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";
import { useRouter } from "next/navigation";

export default function UiDocsPage() {
  const [inputVal, setInputVal] = useState("");
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [sliderValue, setSliderValue] = useState([30]);
  const router = useRouter();

  const chartData = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 55 },
    { month: "Mar", value: 70 }
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-8">
        <main className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">UI | Docs</h1>
          <p className="text-muted-foreground">
            A short guide to the smaller UI components (buttons, inputs, badges,
            etc.)
          </p>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">Badge</h2>
            <p className="text-sm text-muted-foreground">
              Small status labels used to highlight counts or states.
            </p>
            <div className="mt-3 flex gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">Buttons</h2>
            <p className="text-sm text-muted-foreground">
              Primary, secondary and icon-sized buttons. Use `variant` and
              `size` props.
            </p>
            <div className="mt-3 flex gap-2 items-center">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button size="sm">Small</Button>
              <Button size="icon">Icon</Button>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">Inputs & Textareas</h2>
            <p className="text-sm text-muted-foreground">
              Controlled inputs with labels and placeholder support.
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="basic-input">Basic Input</Label>
                <Input
                  id="basic-input"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type something..."
                />
              </div>

              <div>
                <Label htmlFor="bio">Textarea</Label>
                <Textarea id="bio" placeholder="A short bio..." />
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">Form Controls</h2>
            <p className="text-sm text-muted-foreground">
              Checkboxes, radios, switches and toggles.
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" />
                  <Label htmlFor="agree">I agree</Label>
                </div>

                <div className="mt-2">
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="a">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="a" id="r-a" />
                      <Label htmlFor="r-a">Option A</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="b" id="r-b" />
                      <Label htmlFor="r-b">Option B</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Enable</Label>
                </div>

                <div className="mt-2">
                  <ToggleGroup type="single" defaultValue="on">
                    <ToggleGroupItem value="on">On</ToggleGroupItem>
                    <ToggleGroupItem value="off">Off</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              <div>
                <div>
                  <Label>Select</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one">One</SelectItem>
                      <SelectItem value="two">Two</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4">
                  <Label>Slider</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                  />
                </div>

                <div className="mt-4">
                  <Label>OTP Input</Label>
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
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">Avatar & Media</h2>
            <p className="text-sm text-muted-foreground">
              Profile images with fallback initials.
            </p>
            <div className="mt-3 flex gap-3 items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">
              Tooling: Tooltip, Popover, Dialog
            </h2>
            <p className="text-sm text-muted-foreground">
              Small floating UIs for contextual info and actions.
            </p>
            <div className="mt-4 flex gap-3 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Helpful hint</p>
                </TooltipContent>
              </Tooltip>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-2">Quick actions inside a popover</div>
                </PopoverContent>
              </Popover>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Example Dialog</DialogTitle>
                    <DialogDescription>
                      Use for forms or confirmations.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <p>This is content inside a dialog.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">Cards, Tables & Progress</h2>
            <p className="text-sm text-muted-foreground">
              Data display primitives: cards, tables, and progress indicators.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Use cards to group related content.</p>
                </CardContent>
              </Card>

              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alice</TableCell>
                      <TableCell className="text-right">95%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bob</TableCell>
                      <TableCell className="text-right">87%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <Label>Progress</Label>
                <Progress value={60} className="mt-2" />
              </div>

              <div>
                <Label>Skeleton</Label>
                <div className="mt-2 flex gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">Interactive / Complex</h2>
            <p className="text-sm text-muted-foreground">
              Examples of more complex composed components.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium">Accordion</h3>
                <Accordion type="single" collapsible>
                  <AccordionItem value="a">
                    <AccordionTrigger>Section A</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">Content for A</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h3 className="font-medium">Collapsible</h3>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost">Toggle</Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-sm">Hidden content revealed.</p>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <div>
                <h3 className="font-medium">Drawer</h3>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Side Panel</DrawerTitle>
                      <DrawerDescription>
                        Useful for chat or details.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">Drawer content</div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button>Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>

              <div>
                <h3 className="font-medium">Carousel</h3>
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {[1, 2, 3].map((i) => (
                      <CarouselItem key={i}>
                        <div className="p-4 border rounded">Item {i}</div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              <div>
                <h3 className="font-medium">Context Menu</h3>
                <ContextMenu>
                  <ContextMenuTrigger className="inline-block border rounded p-6">
                    Right click me
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>Action 1</ContextMenuItem>
                    <ContextMenuItem>Action 2</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>

              <div>
                <h3 className="font-medium">Command Palette</h3>
                <Command>
                  <CommandInput placeholder="Search commands..." />
                  <CommandList>
                    <CommandEmpty>No results</CommandEmpty>
                    <CommandItem>Open Settings</CommandItem>
                  </CommandList>
                </Command>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold">Charts</h2>
            <p className="text-sm text-muted-foreground">
              Use `ChartContainer` with Recharts to render charts.
            </p>
            <div className="mt-4 w-full h-64">
              <ChartContainer
                config={{ value: { label: "Value", color: "#8884d8" } }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </section>

          <Separator />

          <section className="pb-16">
            <h2 className="text-2xl font-semibold">Where to go next</h2>
            <p className="text-sm text-muted-foreground py-2">
              This page covers the smaller components. For higher-level
              patterns, check the components page.
            </p>
            <Button onClick={() => router.push("/components")}>Components</Button>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
}
