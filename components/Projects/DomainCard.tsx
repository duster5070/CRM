"use client"

import { useEffect, useState } from "react"
import { Pencil, Globe, ExternalLink, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProjectData } from "@/types/types"

interface DomainRowProps {
  label: string
  value: string
  isVercel?: boolean
  onSave?: (nextValue: string) => void
}

function normalizeUrl(domain: string) {
  if (!domain) return null
  if (domain.startsWith("http://") || domain.startsWith("https://")) {
    return domain
  }
  return `https://${domain}`
}

function DomainRow({ label, value, isVercel, onSave }: DomainRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  // keep draft in sync with parent value
  useEffect(() => {
    setDraft(value)
  }, [value])

  const url = normalizeUrl(value)

  const handleSave = () => {
    setIsEditing(false)
    if (draft.trim() !== value) {
      onSave?.(draft.trim())
    }
  }

  const handleCancel = () => {
    setDraft(value)
    setIsEditing(false)
  }

  return (
    <div className="group flex items-center justify-between py-3 border-b last:border-0 border-border/50">
      <div className="flex flex-col gap-1 flex-1 mr-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>

        {isEditing ? (
          <div className="flex gap-2 items-center">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-8 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave()
                if (e.key === "Escape") handleCancel()
              }}
            />

            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8 px-2"
              onClick={handleSave}
            >
              Save
            </Button>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleCancel}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold truncate">
              {value || "—"}
            </span>

            {isVercel && (
              <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                Vercel
              </span>
            )}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="sr-only">Edit domain</span>
          </Button>

          {url && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export function DomainCard({ projectData }: { projectData: ProjectData }) {
  const [freeDomain, setFreeDomain] = useState(projectData?.freeDomain ?? "")
  const [customDomain, setCustomDomain] = useState(projectData?.customDomain ?? "")

  // keep local state in sync if projectData updates
  useEffect(() => {
    setFreeDomain(projectData?.freeDomain ?? "")
    setCustomDomain(projectData?.customDomain ?? "")
  }, [projectData])

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/5">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-bold">
            Project Domains
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-1">
        <DomainRow
          label="Preview Domain"
          value={freeDomain}
          isVercel
          onSave={(v) => {
            setFreeDomain(v)
            console.log("save preview domain:", v)
          }}
        />

        <DomainRow
          label="Production Domain"
          value={customDomain}
          onSave={(v) => {
            setCustomDomain(v)
            console.log("save production domain:", v)
          }}
        />
      </CardContent>
    </Card>
  )
}
