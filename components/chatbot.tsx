"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Send, Bot, User, Star, Trophy, Sparkles, Gift, Target } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  badges?: string[]
  xpGained?: number
}

interface UserStats {
  level: number
  xp: number
  xpToNext: number
  streak: number
  badges: string[]
  totalConversations: number
}

export function ChatBot({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm WellBuddie, your AI wellness companion. I'm here to listen, support, and help you on your mental health journey. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userStats, setUserStats] = useState<UserStats>({
    level: 2,
    xp: 150,
    xpToNext: 200,
    streak: 3,
    badges: ["First Chat", "Mindful Moment", "Self-Care Champion"],
    totalConversations: 12,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): { content: string; badges?: string[]; xpGained?: number } => {
    const lowerMessage = userMessage.toLowerCase()

    // Wellness-focused responses with gamification
    if (lowerMessage.includes("anxious") || lowerMessage.includes("worried") || lowerMessage.includes("stress")) {
      return {
        content:
          "I hear that you're feeling anxious. That's completely valid - anxiety is something many people experience. Let's try a quick breathing exercise together: Breathe in for 4 counts, hold for 4, then breathe out for 6. Would you like me to guide you through some more coping strategies?",
        badges: ["Anxiety Warrior"],
        xpGained: 15,
      }
    }

    if (lowerMessage.includes("sad") || lowerMessage.includes("down") || lowerMessage.includes("depressed")) {
      return {
        content:
          "Thank you for sharing that with me. Feeling sad is a natural human emotion, and it's brave of you to acknowledge it. Remember that this feeling is temporary. What's one small thing that usually brings you a bit of comfort or joy?",
        badges: ["Brave Heart"],
        xpGained: 20,
      }
    }

    if (lowerMessage.includes("good") || lowerMessage.includes("great") || lowerMessage.includes("happy")) {
      return {
        content:
          "That's wonderful to hear! I'm so glad you're feeling good today. It's important to celebrate these positive moments. What's contributing to your good mood? Recognizing these patterns can help you recreate positive experiences.",
        badges: ["Joy Seeker"],
        xpGained: 10,
      }
    }

    if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("insomnia")) {
      return {
        content:
          "Sleep is so important for our mental health. If you're having trouble sleeping, try creating a calming bedtime routine: dim the lights 1 hour before bed, avoid screens, and try some gentle stretching or meditation. Would you like some specific sleep hygiene tips?",
        badges: ["Sleep Guardian"],
        xpGained: 12,
      }
    }

    // Default supportive responses
    const responses = [
      "I'm here to listen. Can you tell me more about what's on your mind?",
      "That sounds important. How does that make you feel?",
      "Thank you for sharing that with me. You're taking a positive step by talking about it.",
      "I appreciate your openness. What would feel most helpful for you right now?",
      "It takes courage to reach out. How can I best support you today?",
    ]

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      xpGained: 5,
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(
      () => {
        const botResponse = generateBotResponse(inputValue)

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse.content,
          sender: "bot",
          timestamp: new Date(),
          badges: botResponse.badges,
          xpGained: botResponse.xpGained,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)

        // Update user stats
        if (botResponse.xpGained) {
          setUserStats((prev) => {
            const newXp = prev.xp + botResponse.xpGained!
            const newLevel = Math.floor(newXp / 100) + 1
            const newBadges = botResponse.badges ? [...prev.badges, ...botResponse.badges] : prev.badges

            return {
              ...prev,
              xp: newXp,
              level: newLevel,
              badges: Array.from(new Set(newBadges)), // Remove duplicates
              totalConversations: prev.totalConversations + 1,
            }
          })
        }
      },
      1000 + Math.random() * 2000,
    ) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const progressPercentage = userStats.xp % 100

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-lg">WellBuddie Chat</CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className={`max-w-[80%] ${message.sender === "user" ? "order-1" : ""}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white ml-auto"
                          : "bg-gray-100 dark:bg-gray-800 text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>

                    {/* XP and Badge Notifications */}
                    {message.xpGained && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>+{message.xpGained} XP earned!</span>
                      </div>
                    )}

                    {message.badges && message.badges.length > 0 && (
                      <div className="mt-2 flex gap-1 flex-wrap">
                        {message.badges.map((badge, index) => (
                          <Badge key={index} className="text-xs bg-amber-100 text-amber-700 hover:bg-amber-100">
                            <Trophy className="w-3 h-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Sidebar */}
      <div className="space-y-4">
        {/* Level Progress */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Level {userStats.level}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{userStats.xp % 100} XP</span>
              <span>{100} XP</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">{100 - (userStats.xp % 100)} XP until next level</p>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" />
              Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Wellness Streak</span>
              <Badge variant="secondary">{userStats.streak} days</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Chats</span>
              <Badge variant="outline">{userStats.totalConversations}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Badges Earned</span>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">{userStats.badges.length}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-500" />
              Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userStats.badges.map((badge, index) => (
                <Badge
                  key={index}
                  className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 dark:from-purple-900 dark:to-pink-900 dark:text-purple-300"
                >
                  <Trophy className="w-3 h-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
