"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle, CheckCircle } from "lucide-react"

interface ConsentState {
  dataCollection: boolean
  anonymizedAnalytics: boolean
  communicationPreferences: boolean
  thirdPartySharing: boolean
}

export function PrivacyConsent({ onComplete }: { onComplete: (consents: ConsentState) => void }) {
  const [consents, setConsents] = useState<ConsentState>({
    dataCollection: false,
    anonymizedAnalytics: false,
    communicationPreferences: false,
    thirdPartySharing: false,
  })

  const [showDetails, setShowDetails] = useState<string | null>(null)

  const handleConsentChange = (key: keyof ConsentState, value: boolean) => {
    setConsents((prev) => ({ ...prev, [key]: value }))
  }

  const canProceed = consents.dataCollection && consents.anonymizedAnalytics

  const consentItems = [
    {
      key: "dataCollection" as keyof ConsentState,
      title: "Essential Data Collection",
      description: "Allow collection of wellness assessment responses for personalized recommendations",
      required: true,
      icon: Database,
      details: [
        "Your PHQ-9 and GAD-7 assessment responses",
        "Chat interactions with the AI wellness companion",
        "Mini-game participation and progress",
        "All data is encrypted and anonymized within 24 hours",
        "No personal identifiers are stored with wellness data",
      ],
    },
    {
      key: "anonymizedAnalytics" as keyof ConsentState,
      title: "Anonymized Analytics",
      description: "Help improve the platform through anonymized usage analytics",
      required: true,
      icon: Eye,
      details: [
        "Aggregated usage patterns and feature engagement",
        "Platform performance and error reporting",
        "Anonymized wellness trends for research purposes",
        "Data cannot be traced back to individual users",
        "Used only for platform improvement and mental health research",
      ],
    },
    {
      key: "communicationPreferences" as keyof ConsentState,
      title: "Wellness Reminders",
      description: "Receive optional reminders for check-ins and wellness activities",
      required: false,
      icon: UserCheck,
      details: [
        "Daily or weekly wellness check-in reminders",
        "Motivational messages and progress updates",
        "New feature announcements related to mental health",
        "You can opt out at any time from your profile",
        "No marketing or promotional content",
      ],
    },
    {
      key: "thirdPartySharing" as keyof ConsentState,
      title: "Research Participation",
      description: "Share anonymized data with approved mental health research institutions",
      required: false,
      icon: Shield,
      details: [
        "Only aggregated, anonymized data shared with research partners",
        "Contributes to advancing mental health research and treatment",
        "All research partners are vetted and HIPAA-compliant",
        "Individual responses are never shared",
        "You can withdraw consent at any time",
      ],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Privacy & Data Protection</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Your privacy is our top priority. Please review and customize your data preferences below. We follow strict
            HIPAA compliance and never store personal identifiers with your wellness data.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {consentItems.map((item) => {
          const IconComponent = item.icon
          const isChecked = consents[item.key]
          const isExpanded = showDetails === item.key

          return (
            <Card
              key={item.key}
              className={`border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all ${
                isChecked ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      id={item.key}
                      checked={isChecked}
                      onCheckedChange={(checked) => handleConsentChange(item.key, checked as boolean)}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isChecked ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 ${isChecked ? "text-blue-600" : "text-gray-500"}`} />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {item.required && (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm leading-relaxed mb-3">{item.description}</CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDetails(isExpanded ? null : item.key)}
                      className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"
                    >
                      {isExpanded ? "Hide details" : "View details"}
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">What this includes:</h4>
                    <ul className="space-y-1">
                      {item.details.map((detail, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Important Privacy Information</p>
              <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                Essential data collection and anonymized analytics are required to provide personalized wellness
                support. All data is encrypted, anonymized within 24 hours, and automatically deleted after 30 days. You
                can modify these preferences anytime in your account settings.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => onComplete(consents)}
              disabled={!canProceed}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
            >
              <Lock className="w-4 h-4 mr-2" />
              Continue with Selected Preferences
            </Button>
          </div>

          {!canProceed && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              Please accept the required privacy settings to continue
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
