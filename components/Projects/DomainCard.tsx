"use client";

import { useEffect, useState } from "react";
import { Pencil, Globe, ExternalLink, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectData } from "@/types/types";

interface DomainRowProps {
  label: string;
  value: string;
  isVercel?: boolean;
  onSave?: (nextValue: string) => void;
}

function normalizeUrl(domain: string) {
  if (!domain) return null;
  if (domain.startsWith("http://") || domain.startsWith("https://")) {
    return domain;
  }
  return `https://${domain}`;
}

function DomainRow({ label, value, isVercel, onSave }: DomainRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  // keep draft in sync with parent value
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const url = normalizeUrl(value);

  const handleSave = () => {
    setIsEditing(false);
    if (draft.trim() !== value) {
      onSave?.(draft.trim());
    }
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  return (
    <div className="group flex items-center justify-between border-b border-border/50 py-3 last:border-0">
      <div className="mr-4 flex flex-1 flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>

        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-8 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
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
            <span className="truncate text-sm font-semibold">{value || "—"}</span>

            {isVercel && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
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
            className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
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
  );
}

export function DomainCard({ projectData }: { projectData: ProjectData }) {
  const [freeDomain, setFreeDomain] = useState(projectData?.freeDomain ?? "");
  const [customDomain, setCustomDomain] = useState(projectData?.customDomain ?? "");

  // keep local state in sync if projectData updates
  useEffect(() => {
    setFreeDomain(projectData?.freeDomain ?? "");
    setCustomDomain(projectData?.customDomain ?? "");
  }, [projectData]);

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/5 p-2">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-bold">Project Domains</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-1">
        <DomainRow
          label="Preview Domain"
          value={freeDomain}
          isVercel
          onSave={(v) => {
            setFreeDomain(v);
            console.log("save preview domain:", v);
          }}
        />

        <DomainRow
          label="Production Domain"
          value={customDomain}
          onSave={(v) => {
            setCustomDomain(v);
            console.log("save production domain:", v);
          }}
        />
      </CardContent>
    </Card>
  );
}
