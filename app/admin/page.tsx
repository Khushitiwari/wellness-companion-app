"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Shield,
  Users,
  TrendingUp,
  Activity,
  Brain,
  Heart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Calendar,
  Home,
} from "lucide-react"

// Mock data for demonstration
const mockData = {
  totalUsers: 1247,
  activeUsers: 892,
  assessmentsCompleted: 3456,
  averageScore: {
    phq9: 8.2,
    gad7: 6.8,
  },
  riskDistribution: [
    { name: "Low Risk", value: 45, color: "#10b981" },
    { name: "Moderate Risk", value: 35, color: "#f59e0b" },
    { name: "High Risk", value: 20, color: "#ef4444" },
  ],
  weeklyEngagement: [
    { day: "Mon", assessments: 45, chats: 78, games: 123 },
    { day: "Tue", assessments: 52, chats: 85, games: 134 },
    { day: "Wed", assessments: 48, chats: 92, games: 145 },
    { day: "Thu", assessments: 61, chats: 88, games: 156 },
    { day: "Fri", assessments: 55, chats: 95, games: 167 },
    { day: "Sat", assessments: 38, chats: 72, games: 134 },
    { day: "Sun", assessments: 42, chats: 68, games: 128 },
  ],
  monthlyTrends: [
    { month: "Jan", avgPHQ9: 9.1, avgGAD7: 7.2, users: 1100 },
    { month: "Feb", avgPHQ9: 8.8, avgGAD7: 7.0, users: 1150 },
    { month: "Mar", avgPHQ9: 8.5, avgGAD7: 6.9, users: 1200 },
    { month: "Apr", avgPHQ9: 8.2, avgGAD7: 6.8, users: 1247 },
  ],
  gameStats: {
    breathing: { plays: 2341, avgDuration: 4.2 },
    memory: { plays: 1876, avgScore: 6.8 },
    focus: { plays: 1654, avgDuration: 2.1 },
    gratitude: { plays: 2987, entries: 2987 },
  },
}

export default function AdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-4 h-4" />
              Back to WellBuddie
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WellBuddie Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Anonymized insights and platform analytics for mental health support
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <Brain className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.assessmentsCompleted.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15%</span> completion rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Wellness Score</CardTitle>
              <Heart className="h-4 w-4 text-rose-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((mockData.averageScore.phq9 + mockData.averageScore.gad7) / 2).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-5%</span> improvement
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Risk Distribution */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Risk Distribution
                  </CardTitle>
                  <CardDescription>Anonymized mental health risk levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockData.riskDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {mockData.riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {mockData.riskDistribution.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Engagement */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Weekly Engagement
                  </CardTitle>
                  <CardDescription>User activity across different features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockData.weeklyEngagement}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="assessments" fill="#3b82f6" name="Assessments" />
                        <Bar dataKey="chats" fill="#10b981" name="Chats" />
                        <Bar dataKey="games" fill="#8b5cf6" name="Games" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Trends */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  Monthly Wellness Trends
                </CardTitle>
                <CardDescription>Average assessment scores and user growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="avgPHQ9"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Avg PHQ-9"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="avgGAD7"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        name="Avg GAD-7"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="users"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Total Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>PHQ-9 Score Distribution</CardTitle>
                  <CardDescription>Depression assessment results (anonymized)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Minimal (0-4)</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">35%</Badge>
                    </div>
                    <Progress value={35} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mild (5-9)</span>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">28%</Badge>
                    </div>
                    <Progress value={28} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Moderate (10-14)</span>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">22%</Badge>
                    </div>
                    <Progress value={22} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Severe (15+)</span>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">15%</Badge>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>GAD-7 Score Distribution</CardTitle>
                  <CardDescription>Anxiety assessment results (anonymized)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Minimal (0-4)</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">42%</Badge>
                    </div>
                    <Progress value={42} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mild (5-9)</span>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">31%</Badge>
                    </div>
                    <Progress value={31} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Moderate (10-14)</span>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">18%</Badge>
                    </div>
                    <Progress value={18} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Severe (15+)</span>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">9%</Badge>
                    </div>
                    <Progress value={9} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Mini-Game Statistics</CardTitle>
                  <CardDescription>User engagement with wellness activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div>
                        <div className="font-medium">Breathing Exercises</div>
                        <div className="text-sm text-muted-foreground">
                          {mockData.gameStats.breathing.plays} sessions
                        </div>
                      </div>
                      <Badge variant="secondary">{mockData.gameStats.breathing.avgDuration}min avg</Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div>
                        <div className="font-medium">Memory Challenges</div>
                        <div className="text-sm text-muted-foreground">{mockData.gameStats.memory.plays} games</div>
                      </div>
                      <Badge variant="secondary">{mockData.gameStats.memory.avgScore} avg score</Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <div>
                        <div className="font-medium">Focus Sessions</div>
                        <div className="text-sm text-muted-foreground">{mockData.gameStats.focus.plays} sessions</div>
                      </div>
                      <Badge variant="secondary">{mockData.gameStats.focus.avgDuration}min avg</Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <div>
                        <div className="font-medium">Gratitude Entries</div>
                        <div className="text-sm text-muted-foreground">
                          {mockData.gameStats.gratitude.entries} entries
                        </div>
                      </div>
                      <Badge variant="secondary">Daily practice</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Chat Engagement</CardTitle>
                  <CardDescription>AI chatbot interaction metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">2,847</div>
                      <div className="text-sm text-muted-foreground">Total Conversations</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">4.2</div>
                      <div className="text-sm text-muted-foreground">Avg Messages/Session</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">89%</div>
                      <div className="text-sm text-muted-foreground">Positive Sentiment</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">156</div>
                      <div className="text-sm text-muted-foreground">Badges Earned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Privacy Compliance
                  </CardTitle>
                  <CardDescription>Data protection and anonymization status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Data Anonymization</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">End-to-End Encryption</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Enabled</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">HIPAA Compliance</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Certified</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Data Retention Policy</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">30 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    System Status
                  </CardTitle>
                  <CardDescription>Platform health and security monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <span className="text-sm">API Response Time</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">142ms</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <span className="text-sm">System Uptime</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">99.9%</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <span className="text-sm">Security Scans</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Daily</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <span className="text-sm">Last Backup</span>
                      <Badge variant="secondary">2 hours ago</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Privacy Notice</CardTitle>
                <CardDescription>Important information about data handling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    All data displayed in this dashboard is completely anonymized and aggregated. Individual user
                    responses cannot be traced back to specific users. We maintain strict privacy standards and comply
                    with all relevant data protection regulations including HIPAA and GDPR. Personal identifiers are
                    never stored with assessment data, and all communications are encrypted end-to-end.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
