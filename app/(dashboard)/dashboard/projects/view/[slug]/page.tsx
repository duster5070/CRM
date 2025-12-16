"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  DollarSign,
  Edit,
  Eye,
  MessageSquare,
  Users,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectDeatilPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const modules = [
    {
      id: 1,
      title: "Propulsion",
      category: "Engineering",
    },
    { id: 2, title: "Life Support", category: "Environmental" },
    { id: 3, title: "Navigation", category: "Technology" },
    { id: 4, title: "Communication", category: "Technology" },
    { id: 5, title: "Power System", category: "Engineering" },
    { id: 6, title: "Thermal Control", category: "Environmental" },
  ];

  const invoices = [
    { id: "INV-001", title: "Initial design phase", amount: 250000 },
    { id: "INV-002", title: "Propulsion System Development", amount: 500000 },
    { id: "INV-003", title: "Life Support Systems", amount: 350000 },
    { id: "INV-004", title: "Navigation and AI Integration", amount: 400000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      {/*project banner*/}
      <div className="relative h-64 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 mb-8 overflow-hidden">
        <img
          src="/placeholder.svg?height=256&width=1024"
          alt="Project Banner"
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-white">Project Nebula</h1>
        </div>
      </div>

      {/*main content*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*left column*/}
        <div className="lg:col-span-2 space-y-6">
          {/*project description*/}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Project Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Project Nebula is an innovative space exploration initiative
                aimed at developing cutting-edge technologies for interstellar
                travel.
              </p>
            </CardContent>
          </Card>

          {/*notes*/}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notes</CardTitle>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="prose">
                <h3>Key Objectives:</h3>
                <ul>
                  <li>Develop sustainable propulsion systems</li>
                  <li>Design long term life support modules</li>
                  <li>Create AI-driven navigation systems</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/*Modules*/}
          <Card>
            <CardHeader>
              <CardTitle>Project Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {modules.map((module) => (
                    <Card
                      key={module.id}
                      className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-indigo-50 to-cyan-50"
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">
                          {module.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {module.category}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/*right column*/}
        <div className="space-y-6">
          {/*Project Info Card*/}
          <Card>
            <CardHeader>
              <CardTitle>Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-semibold">Budget:</span>
                <span className="ml-2">$10,000,000</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="font-semibold">Timeline:</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="text-sm">Start: Jan 1, 2023</div>
                  <div className="text-sm">End: Dec 31, 2025</div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Users className="mr-2 h-4 w-4 text-purple-500" />
                  <span className="font-semibold">Members:</span>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar key={i}>
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      />
                      <AvatarFallback>M{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/*Client Card*/}
          <Card>
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48&text=SC" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Space Corp</p>
                  <p className="text-sm text-gray-500">
                    Leading space exploration company
                  </p>
                </div>
              </div>
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Contact:</span> John Explorer
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  John@spacecorp.com
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> +1 (555)
                  123-4567
                </p>
              </div>
            </CardContent>
          </Card>

          {/*Invoices and Payments*/}
          <Card>
            <CardHeader>
              <CardTitle>Invoices & Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="invoices">Invoices</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>
                <TabsContent value="invoices" className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{invoice.title}</p>
                        <p className="text-sm text-gray-500">{invoice.id}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          ${invoice.amount.toLocaleString()}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="payments" className="space-y-4">
                  {["PAY-001", "PAY-002"].map((pay) => (
                    <div
                      key={pay}
                      className="flex justify-between items-center"
                    >
                      <span>{pay}</span>
                      <Badge variant="outline" className="bg-green-100">
                        $500,000
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Progress value={50} className="w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
