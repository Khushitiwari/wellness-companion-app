"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Brain,
  Star,
  Trophy,
  MessageCircle,
  Gamepad2,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react"
import { ChatBot } from "@/components/chatbot"
import { MiniGames } from "@/components/mini-games"
import { PrivacyConsent } from "@/components/privacy-consent"

export default function WellBuddiePage() {
  const [currentView, setCurrentView] = useState<"privacy" | "home" | "assessment" | "chat" | "games">("privacy")
  const [hasConsent, setHasConsent] = useState(false)

  // Check for existing consent on load
  useEffect(() => {
    const existingConsent = localStorage.getItem("wellbuddie-privacy-consent")
    if (existingConsent) {
      setHasConsent(true)
      setCurrentView("home")
    }
  }, [])

  const handlePrivacyComplete = (consents: any) => {
    // Store consent in localStorage (in production, this would be securely stored)
    localStorage.setItem(
      "wellbuddie-privacy-consent",
      JSON.stringify({
        ...consents,
        consentDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      }),
    )
    setHasConsent(true)
    setCurrentView("home")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              WellBuddie
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your AI-powered wellness companion. Take a moment to check in with yourself and discover personalized
            support for your mental well-being.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/admin")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <Shield className="w-3 h-3 mr-1" />
              Admin Dashboard
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("privacy")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <Shield className="w-3 h-3 mr-1" />
              Privacy Settings
            </Button>
          </div>
        </header>

        {currentView === "privacy" ? (
          <PrivacyConsent onComplete={handlePrivacyComplete} />
        ) : currentView === "home" ? (
          <HomeView
            onStartAssessment={() => setCurrentView("assessment")}
            onStartChat={() => setCurrentView("chat")}
            onStartGames={() => setCurrentView("games")}
          />
        ) : currentView === "assessment" ? (
          <AssessmentView onBack={() => setCurrentView("home")} />
        ) : currentView === "chat" ? (
          <ChatBot onBack={() => setCurrentView("home")} />
        ) : (
          <MiniGames onBack={() => setCurrentView("home")} />
        )}
      </div>
    </div>
  )
}

function HomeView({
  onStartAssessment,
  onStartChat,
  onStartGames,
}: {
  onStartAssessment: () => void
  onStartChat: () => void
  onStartGames: () => void
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome Card */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl text-balance">Welcome to Your Wellness Journey</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Take a confidential wellness assessment to understand your current mental health and receive personalized
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Evidence-Based</h3>
              <p className="text-sm text-muted-foreground">PHQ-9 and GAD-7 validated assessments</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Personalized</h3>
              <p className="text-sm text-muted-foreground">Tailored recommendations just for you</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-semibold mb-2">Gamified</h3>
              <p className="text-sm text-muted-foreground">Earn badges and track your progress</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <Button
              onClick={onStartAssessment}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 shadow-md"
            >
              Start Wellness Check-in
            </Button>
            <Button
              onClick={onStartChat}
              size="lg"
              variant="outline"
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950 px-6 py-3 bg-transparent"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with WellBuddie
            </Button>
            <Button
              onClick={onStartGames}
              size="lg"
              variant="outline"
              className="border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950 px-6 py-3 bg-transparent"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Play Mini-Games
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Wellness Streak</span>
            <Badge variant="secondary">3 days</Badge>
          </div>
          <Progress value={60} className="h-2" />
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">First Check-in</Badge>
            <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">Mindful Moment</Badge>
            <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-100">Self-Care Champion</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AssessmentView({ onBack }: { onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [assessmentType, setAssessmentType] = useState<"phq9" | "gad7">("phq9")
  const [showResults, setShowResults] = useState(false)
  const [assessmentScore, setAssessmentScore] = useState(0)

  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly, or being fidgety/restless",
    "Thoughts that you would be better off dead or hurting yourself",
  ]

  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen",
  ]

  const currentQuestions = assessmentType === "phq9" ? phq9Questions : gad7Questions
  const totalQuestions = currentQuestions.length

  const getAssessmentResults = (score: number, type: "phq9" | "gad7") => {
    if (type === "phq9") {
      if (score <= 4)
        return {
          level: "Minimal",
          color: "text-emerald-600",
          bgColor: "bg-emerald-50 border-emerald-200",
          icon: CheckCircle,
          description: "Your responses suggest minimal depression symptoms.",
          suggestions: [
            "Continue maintaining your current wellness practices",
            "Regular exercise and good sleep hygiene can help maintain mental health",
            "Consider mindfulness or meditation practices",
            "Stay connected with friends and family",
          ],
        }
      if (score <= 9)
        return {
          level: "Mild",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50 border-yellow-200",
          icon: Info,
          description: "Your responses suggest mild depression symptoms.",
          suggestions: [
            "Consider talking to a trusted friend or family member",
            "Engage in regular physical activity and outdoor time",
            "Practice stress management techniques like deep breathing",
            "Maintain a regular sleep schedule",
            "Consider speaking with a counselor if symptoms persist",
          ],
        }
      if (score <= 14)
        return {
          level: "Moderate",
          color: "text-orange-600",
          bgColor: "bg-orange-50 border-orange-200",
          icon: AlertTriangle,
          description: "Your responses suggest moderate depression symptoms.",
          suggestions: [
            "Consider reaching out to a mental health professional",
            "Talk to your primary care doctor about your symptoms",
            "Maintain social connections and avoid isolation",
            "Focus on basic self-care: nutrition, sleep, and hygiene",
            "Consider joining a support group",
          ],
        }
      return {
        level: "Severe",
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
        icon: AlertTriangle,
        description: "Your responses suggest severe depression symptoms.",
        suggestions: [
          "Please consider speaking with a mental health professional soon",
          "Contact your doctor or a crisis helpline if you're having thoughts of self-harm",
          "Reach out to trusted friends or family for support",
          "Crisis Helpline: 988 (Suicide & Crisis Lifeline)",
          "Remember: You are not alone, and help is available",
        ],
      }
    } else {
      // GAD-7 scoring
      if (score <= 4)
        return {
          level: "Minimal",
          color: "text-emerald-600",
          bgColor: "bg-emerald-50 border-emerald-200",
          icon: CheckCircle,
          description: "Your responses suggest minimal anxiety symptoms.",
          suggestions: [
            "Continue your current stress management practices",
            "Regular exercise can help maintain low anxiety levels",
            "Practice relaxation techniques like deep breathing",
            "Maintain work-life balance",
          ],
        }
      if (score <= 9)
        return {
          level: "Mild",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50 border-yellow-200",
          icon: Info,
          description: "Your responses suggest mild anxiety symptoms.",
          suggestions: [
            "Practice mindfulness and meditation regularly",
            "Try progressive muscle relaxation techniques",
            "Limit caffeine and alcohol intake",
            "Establish a regular sleep routine",
            "Consider talking to someone you trust about your worries",
          ],
        }
      if (score <= 14)
        return {
          level: "Moderate",
          color: "text-orange-600",
          bgColor: "bg-orange-50 border-orange-200",
          icon: AlertTriangle,
          description: "Your responses suggest moderate anxiety symptoms.",
          suggestions: [
            "Consider speaking with a mental health professional",
            "Practice anxiety management techniques daily",
            "Identify and avoid anxiety triggers when possible",
            "Consider cognitive behavioral therapy (CBT)",
            "Talk to your doctor about your symptoms",
          ],
        }
      return {
        level: "Severe",
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
        icon: AlertTriangle,
        description: "Your responses suggest severe anxiety symptoms.",
        suggestions: [
          "Please consider speaking with a mental health professional",
          "Contact your doctor about treatment options",
          "Practice grounding techniques during anxiety episodes",
          "Avoid isolation and maintain social connections",
          "Crisis support is available 24/7 if needed",
        ],
      }
    }
  }

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0)
      setAssessmentScore(totalScore)
      setShowResults(true)

      const existingResults = JSON.parse(localStorage.getItem("wellbuddie-assessments") || "[]")
      existingResults.push({
        type: assessmentType,
        score: totalScore,
        date: new Date().toISOString(),
        answers: newAnswers,
      })
      localStorage.setItem("wellbuddie-assessments", JSON.stringify(existingResults))
    }
  }

  const restartAssessment = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setAssessmentScore(0)
  }

  const switchAssessment = () => {
    const newType = assessmentType === "phq9" ? "gad7" : "phq9"
    setAssessmentType(newType)
    restartAssessment()
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  if (showResults) {
    const results = getAssessmentResults(assessmentScore, assessmentType)
    const IconComponent = results.icon

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back to Home
              </Button>
              <Badge variant="outline">
                {assessmentType === "phq9" ? "Depression Screening" : "Anxiety Screening"} Results
              </Badge>
            </div>
            <CardTitle className="text-center">Your Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`p-6 rounded-lg border-2 ${results.bgColor}`}>
              <div className="flex items-center gap-3 mb-4">
                <IconComponent className={`w-6 h-6 ${results.color}`} />
                <div>
                  <h3 className={`text-xl font-semibold ${results.color}`}>{results.level} Level</h3>
                  <p className="text-sm text-muted-foreground">
                    Score: {assessmentScore} out of {totalQuestions * 3}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4">{results.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Personalized Suggestions:</h4>
              <ul className="space-y-2">
                {results.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={restartAssessment} variant="outline" className="flex-1 bg-transparent">
                Retake Assessment
              </Button>
              <Button onClick={switchAssessment} variant="outline" className="flex-1 bg-transparent">
                Take {assessmentType === "phq9" ? "Anxiety" : "Depression"} Assessment
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground p-4 bg-muted/50 rounded-lg">
              <p className="font-medium mb-1">Important Disclaimer</p>
              <p>
                This assessment is for informational purposes only and is not a substitute for professional medical
                advice, diagnosis, or treatment. If you're experiencing severe symptoms or thoughts of self-harm, please
                seek immediate professional help.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack}>
              ← Back
            </Button>
            <div className="flex gap-2">
              <Badge
                variant={assessmentType === "phq9" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => assessmentType !== "phq9" && switchAssessment()}
              >
                Depression
              </Badge>
              <Badge
                variant={assessmentType === "gad7" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => assessmentType !== "gad7" && switchAssessment()}
              >
                Anxiety
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-balance">
              Over the last 2 weeks, how often have you been bothered by:
            </h3>
            <p className="text-lg text-balance leading-relaxed">"{currentQuestions[currentQuestion]}"</p>
          </div>

          <div className="grid gap-3">
            {[
              { score: 0, label: "Not at all", color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200" },
              { score: 1, label: "Several days", color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200" },
              {
                score: 2,
                label: "More than half the days",
                color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
              },
              { score: 3, label: "Nearly every day", color: "bg-red-50 hover:bg-red-100 border-red-200" },
            ].map((option) => (
              <Button
                key={option.score}
                variant="outline"
                onClick={() => handleAnswer(option.score)}
                className={`p-4 h-auto text-left justify-start ${option.color} dark:bg-opacity-20`}
              >
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">Score: {option.score}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Your responses are completely confidential and help us provide better support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
