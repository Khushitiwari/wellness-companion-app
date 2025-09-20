"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Wind, Brain, Target, Sparkles, Trophy, Timer, Heart } from "lucide-react"

type GameType = "breathing" | "memory" | "focus" | "gratitude"

interface GameStats {
  breathingStreak: number
  memoryBest: number
  focusTime: number
  gratitudeEntries: number
  totalXP: number
}

export function MiniGames({ onBack }: { onBack: () => void }) {
  const [currentGame, setCurrentGame] = useState<GameType | null>(null)
  const [gameStats, setGameStats] = useState<GameStats>({
    breathingStreak: 5,
    memoryBest: 8,
    focusTime: 120,
    gratitudeEntries: 12,
    totalXP: 340,
  })

  const games = [
    {
      id: "breathing" as GameType,
      title: "Breathing Exercise",
      description: "Guided breathing to reduce anxiety and stress",
      icon: Wind,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      xpReward: 15,
    },
    {
      id: "memory" as GameType,
      title: "Memory Challenge",
      description: "Improve focus and cognitive function",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      xpReward: 20,
    },
    {
      id: "focus" as GameType,
      title: "Mindful Focus",
      description: "Practice mindfulness and concentration",
      icon: Target,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      xpReward: 25,
    },
    {
      id: "gratitude" as GameType,
      title: "Gratitude Journal",
      description: "Reflect on positive moments and experiences",
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50 dark:bg-rose-950",
      xpReward: 10,
    },
  ]

  if (currentGame) {
    return (
      <div className="max-w-4xl mx-auto">
        {currentGame === "breathing" && (
          <BreathingGame
            onBack={() => setCurrentGame(null)}
            onComplete={(xp) =>
              setGameStats((prev) => ({
                ...prev,
                totalXP: prev.totalXP + xp,
                breathingStreak: prev.breathingStreak + 1,
              }))
            }
          />
        )}
        {currentGame === "memory" && (
          <MemoryGame
            onBack={() => setCurrentGame(null)}
            onComplete={(xp) => setGameStats((prev) => ({ ...prev, totalXP: prev.totalXP + xp }))}
          />
        )}
        {currentGame === "focus" && (
          <FocusGame
            onBack={() => setCurrentGame(null)}
            onComplete={(xp) => setGameStats((prev) => ({ ...prev, totalXP: prev.totalXP + xp }))}
          />
        )}
        {currentGame === "gratitude" && (
          <GratitudeGame
            onBack={() => setCurrentGame(null)}
            onComplete={(xp) =>
              setGameStats((prev) => ({
                ...prev,
                totalXP: prev.totalXP + xp,
                gratitudeEntries: prev.gratitudeEntries + 1,
              }))
            }
          />
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="font-semibold">{gameStats.totalXP} XP</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Wellness Mini-Games</CardTitle>
          <p className="text-center text-muted-foreground">
            Play fun activities designed to boost your mental well-being and earn XP!
          </p>
        </CardHeader>
      </Card>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {games.map((game) => {
          const IconComponent = game.icon
          return (
            <Card
              key={game.id}
              className={`border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer ${game.bgColor}`}
              onClick={() => setCurrentGame(game.id)}
            >
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{game.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{game.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 mb-4">
                  <Trophy className="w-3 h-3 mr-1" />+{game.xpReward} XP
                </Badge>
                <Button className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white`}>
                  <Play className="w-4 h-4 mr-2" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Stats */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Your Game Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <Wind className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{gameStats.breathingStreak}</div>
              <div className="text-sm text-muted-foreground">Breathing Streak</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{gameStats.memoryBest}</div>
              <div className="text-sm text-muted-foreground">Memory Best</div>
            </div>
            <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
              <Timer className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-600">{gameStats.focusTime}s</div>
              <div className="text-sm text-muted-foreground">Focus Time</div>
            </div>
            <div className="text-center p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
              <Heart className="w-6 h-6 text-rose-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-rose-600">{gameStats.gratitudeEntries}</div>
              <div className="text-sm text-muted-foreground">Gratitude Entries</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BreathingGame({ onBack, onComplete }: { onBack: () => void; onComplete: (xp: number) => void }) {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [isActive, setIsActive] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [timeLeft, setTimeLeft] = useState(4)
  const totalCycles = 5

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (phase === "inhale") {
        setPhase("hold")
        setTimeLeft(4)
      } else if (phase === "hold") {
        setPhase("exhale")
        setTimeLeft(6)
      } else if (phase === "exhale") {
        setPhase("rest")
        setTimeLeft(2)
      } else if (phase === "rest") {
        setCycle(cycle + 1)
        if (cycle + 1 >= totalCycles) {
          setIsActive(false)
          onComplete(15)
        } else {
          setPhase("inhale")
          setTimeLeft(4)
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, phase, cycle, onComplete])

  const startExercise = () => {
    setIsActive(true)
    setPhase("inhale")
    setTimeLeft(4)
    setCycle(0)
  }

  const resetExercise = () => {
    setIsActive(false)
    setPhase("inhale")
    setTimeLeft(4)
    setCycle(0)
  }

  const progress = ((cycle * 4 + (4 - timeLeft)) / (totalCycles * 4)) * 100

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Badge variant="outline">Breathing Exercise</Badge>
        </div>
        <CardTitle className="text-center">4-4-6-2 Breathing</CardTitle>
        <p className="text-center text-muted-foreground">
          Follow the guided breathing pattern to reduce stress and anxiety
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div
            className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-1000 ${
              phase === "inhale"
                ? "bg-gradient-to-r from-blue-400 to-blue-600 scale-110"
                : phase === "hold"
                  ? "bg-gradient-to-r from-purple-400 to-purple-600 scale-110"
                  : phase === "exhale"
                    ? "bg-gradient-to-r from-green-400 to-green-600 scale-90"
                    : "bg-gradient-to-r from-gray-400 to-gray-600 scale-100"
            }`}
          >
            {timeLeft}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold capitalize">{phase}</h3>
            <p className="text-muted-foreground">
              {phase === "inhale" && "Breathe in slowly through your nose"}
              {phase === "hold" && "Hold your breath gently"}
              {phase === "exhale" && "Breathe out slowly through your mouth"}
              {phase === "rest" && "Rest and prepare for the next cycle"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Cycle {cycle + 1} of {totalCycles}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {!isActive ? (
            <Button
              onClick={startExercise}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Exercise
            </Button>
          ) : (
            <Button onClick={() => setIsActive(false)} variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={resetExercise} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {cycle >= totalCycles && (
          <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-700 dark:text-green-300">Exercise Complete!</h3>
            <p className="text-sm text-green-600 dark:text-green-400">
              You earned 15 XP for completing the breathing exercise
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MemoryGame({ onBack, onComplete }: { onBack: () => void; onComplete: (xp: number) => void }) {
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [isShowing, setIsShowing] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)

  const colors = [
    { id: 0, color: "bg-red-500", activeColor: "bg-red-300" },
    { id: 1, color: "bg-blue-500", activeColor: "bg-blue-300" },
    { id: 2, color: "bg-green-500", activeColor: "bg-green-300" },
    { id: 3, color: "bg-yellow-500", activeColor: "bg-yellow-300" },
  ]

  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 4)]
    setSequence(newSequence)
    setPlayerSequence([])
    setGameStarted(true)
    setCurrentLevel(1)
    setGameOver(false)
    showSequence(newSequence)
  }

  const showSequence = (seq: number[]) => {
    setIsShowing(true)
    // Implementation would show sequence with delays
    setTimeout(() => setIsShowing(false), seq.length * 1000)
  }

  const handleColorClick = (colorId: number) => {
    if (isShowing || gameOver) return

    const newPlayerSequence = [...playerSequence, colorId]
    setPlayerSequence(newPlayerSequence)

    // Check if player sequence matches
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true)
      onComplete(currentLevel * 5)
      return
    }

    if (newPlayerSequence.length === sequence.length) {
      // Level complete
      const newLevel = currentLevel + 1
      setCurrentLevel(newLevel)
      const newSequence = [...sequence, Math.floor(Math.random() * 4)]
      setSequence(newSequence)
      setPlayerSequence([])

      if (newLevel > 8) {
        // Game won
        setGameOver(true)
        onComplete(50)
      } else {
        showSequence(newSequence)
      }
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Badge variant="outline">Memory Challenge</Badge>
        </div>
        <CardTitle className="text-center">Memory Pattern Game</CardTitle>
        <p className="text-center text-muted-foreground">
          Watch the sequence and repeat it back to improve your memory
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Level {currentLevel}</div>
          <div className="text-sm text-muted-foreground">
            {gameStarted ? `Sequence length: ${sequence.length}` : "Click Start to begin"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorClick(color.id)}
              disabled={isShowing || !gameStarted || gameOver}
              className={`w-24 h-24 rounded-lg transition-all ${color.color} hover:opacity-80 disabled:opacity-50`}
            />
          ))}
        </div>

        <div className="text-center">
          {!gameStarted ? (
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          ) : (
            <div className="space-y-2">
              {isShowing && <p className="text-sm text-muted-foreground">Watch the sequence...</p>}
              {!isShowing && !gameOver && <p className="text-sm text-muted-foreground">Repeat the sequence</p>}
            </div>
          )}
        </div>

        {gameOver && (
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-700 dark:text-purple-300">
              {currentLevel > 8 ? "Amazing! Perfect Score!" : `Great job! Level ${currentLevel - 1}`}
            </h3>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              You earned {currentLevel > 8 ? 50 : (currentLevel - 1) * 5} XP
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function FocusGame({ onBack, onComplete }: { onBack: () => void; onComplete: (xp: number) => void }) {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [selectedDuration, setSelectedDuration] = useState(60)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      onComplete(Math.floor(selectedDuration / 10))
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, selectedDuration, onComplete])

  const startFocus = () => {
    setIsActive(true)
    setTimeLeft(selectedDuration)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Badge variant="outline">Mindful Focus</Badge>
        </div>
        <CardTitle className="text-center">Focus Meditation</CardTitle>
        <p className="text-center text-muted-foreground">Focus on the center dot and practice mindful concentration</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isActive && timeLeft === selectedDuration && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-4">Choose your focus duration:</h3>
              <div className="flex gap-2 justify-center flex-wrap">
                {[30, 60, 120, 300].map((duration) => (
                  <Button
                    key={duration}
                    variant={selectedDuration === duration ? "default" : "outline"}
                    onClick={() => setSelectedDuration(duration)}
                    className="min-w-16"
                  >
                    {duration < 60 ? `${duration}s` : `${duration / 60}m`}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-full flex items-center justify-center relative">
            <div className="w-4 h-4 bg-emerald-600 rounded-full animate-pulse"></div>
            {isActive && <div className="absolute inset-0 border-4 border-emerald-300 rounded-full animate-ping"></div>}
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>

          {!isActive ? (
            <Button
              onClick={startFocus}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Focus Session
            </Button>
          ) : (
            <Button onClick={() => setIsActive(false)} variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              End Session
            </Button>
          )}
        </div>

        {timeLeft === 0 && (
          <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
            <Trophy className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Focus Session Complete!</h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              You earned {Math.floor(selectedDuration / 10)} XP for your mindful focus
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function GratitudeGame({ onBack, onComplete }: { onBack: () => void; onComplete: (xp: number) => void }) {
  const [gratitudeText, setGratitudeText] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (gratitudeText.trim()) {
      setSubmitted(true)
      onComplete(10)
    }
  }

  const prompts = [
    "What made you smile today?",
    "Who are you grateful for and why?",
    "What's something beautiful you noticed recently?",
    "What's a skill or ability you're thankful for?",
    "What's a memory that brings you joy?",
  ]

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Badge variant="outline">Gratitude Journal</Badge>
        </div>
        <CardTitle className="text-center">Daily Gratitude</CardTitle>
        <p className="text-center text-muted-foreground">Take a moment to reflect on something you're grateful for</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!submitted ? (
          <>
            <div className="text-center p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
              <Heart className="w-8 h-8 text-rose-600 mx-auto mb-2" />
              <h3 className="font-semibold text-rose-700 dark:text-rose-300 mb-2">Today's Prompt:</h3>
              <p className="text-rose-600 dark:text-rose-400">{randomPrompt}</p>
            </div>

            <div className="space-y-4">
              <textarea
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
                placeholder="Write about something you're grateful for..."
                className="w-full h-32 p-4 border border-input rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
              />

              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  disabled={!gratitudeText.trim()}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Save Gratitude Entry
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-6 bg-rose-50 dark:bg-rose-950 rounded-lg">
            <Trophy className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-2">Thank you for sharing!</h3>
            <p className="text-rose-600 dark:text-rose-400 mb-4">
              Practicing gratitude has been shown to improve mood and overall well-being.
            </p>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
              <Sparkles className="w-3 h-3 mr-1" />
              +10 XP earned
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
