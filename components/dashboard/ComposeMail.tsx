"use client"

import * as React from "react"
import {
  Paperclip,
  Smile,
  ImageIcon,
  Bold,
  Italic,
  List,
  X,
  Minimize2,
  Maximize2,
  Loader2,
  Search,
  Send,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { sendComposedEmail, type ComposedEmailData } from "@/actions/emails"
import { getAllUsers } from "@/actions/users"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  image?: string | null
}

type RecipientField = "to" | "cc" | "bcc"

export default function ComposeMail() {
  const [allUsers, setAllUsers] = React.useState<User[]>([])
  const [toRecipients, setToRecipients] = React.useState<User[]>([])
  const [ccRecipients, setCcRecipients] = React.useState<User[]>([])
  const [bccRecipients, setBccRecipients] = React.useState<User[]>([])
  const [subject, setSubject] = React.useState<string>("")
  const [message, setMessage] = React.useState<string>("")
  const [broadcast, setBroadcast] = React.useState<boolean>(true)
  const [showCc, setShowCc] = React.useState<boolean>(false)
  const [showBcc, setShowBcc] = React.useState<boolean>(false)
  const [isMinimized, setIsMinimized] = React.useState<boolean>(false)
  const [hasAttachment, setHasAttachment] = React.useState<boolean>(false)
  const [isSending, setIsSending] = React.useState<boolean>(false)

  const [activeField, setActiveField] = React.useState<RecipientField | null>(null)
  const [query, setQuery] = React.useState<string>("")

  React.useEffect(() => {
    async function loadUsers() {
      const users = await getAllUsers()
      setAllUsers(users)
    }
    loadUsers()
  }, [])

  React.useEffect(() => {
    if (!activeField) {
      setQuery("")
    }
  }, [activeField])

  const getRecipientsForField = (field: RecipientField): User[] => {
    switch (field) {
      case "to":
        return toRecipients
      case "cc":
        return ccRecipients
      case "bcc":
        return bccRecipients
    }
  }

  const setRecipientsForField = (field: RecipientField, recipients: User[]) => {
    switch (field) {
      case "to":
        setToRecipients(recipients)
        break
      case "cc":
        setCcRecipients(recipients)
        break
      case "bcc":
        setBccRecipients(recipients)
        break
    }
  }

  const filteredUsers = React.useMemo(() => {
    if (!activeField || query.trim().length === 0) return []
    const currentRecipients = getRecipientsForField(activeField)
    const currentIds = currentRecipients.map((r) => r.id)
    return allUsers.filter(
      (user) =>
        !currentIds.includes(user.id) &&
        (user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())),
    )
  }, [query, activeField, allUsers, toRecipients, ccRecipients, bccRecipients])

  const toggleUser = (user: User, field: RecipientField) => {
    const recipients = getRecipientsForField(field)
    const exists = recipients.find((r) => r.id === user.id)
    if (exists) {
      setRecipientsForField(
        field,
        recipients.filter((r) => r.id !== user.id),
      )
    } else {
      setRecipientsForField(field, [...recipients, user])
    }
  }

  const removeRecipient = (userId: string, field: RecipientField) => {
    const recipients = getRecipientsForField(field)
    setRecipientsForField(
      field,
      recipients.filter((r) => r.id !== userId),
    )
  }

  const handleSend = async (): Promise<void> => {
    if (toRecipients.length === 0) {
      toast.error("Please add at least one recipient.")
      return
    }
    if (!subject.trim()) {
      toast.error("Please add a subject.")
      return
    }
    if (!message.trim()) {
      toast.error("Please write a message.")
      return
    }

    setIsSending(true)
    try {
      const emailData: ComposedEmailData = {
        from: "Project X <onboarding@resend.dev>",
        to: toRecipients.map((r) => r.email),
        cc: ccRecipients.length > 0 ? ccRecipients.map((r) => r.email) : undefined,
        bcc: bccRecipients.length > 0 ? bccRecipients.map((r) => r.email) : undefined,
        subject,
        message,
        broadcast,
      }
      const result = await sendComposedEmail(emailData)
      if (result.success) {
        toast.success(`Sent to ${toRecipients.length} recipients!`)
        setSubject("")
        setMessage("")
        setToRecipients([])
        setCcRecipients([])
        setBccRecipients([])
        setShowCc(false)
        setShowBcc(false)
        setHasAttachment(false)
      }
    } catch (error) {
      toast.error("Failed to send email.")
    } finally {
      setIsSending(false)
    }
  }

  const handleDiscard = (): void => {
    if (confirm("Discard this email?")) {
      setSubject("")
      setMessage("")
      setToRecipients([])
      setCcRecipients([])
      setBccRecipients([])
      setShowCc(false)
      setShowBcc(false)
      setHasAttachment(false)
    }
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex flex-col w-full max-w-4xl mx-auto bg-background border rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out",
          isMinimized ? "h-14 mt-auto mb-4" : "h-[85vh] my-8",
        )}
      >
        {/* Header - Glass effect */}
        <div className="flex items-center justify-between px-5 py-3 bg-muted/30 backdrop-blur-sm border-b">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h2 className="text-sm font-semibold tracking-tight uppercase opacity-70">New Message</h2>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 rounded-full hover:bg-background/80"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDiscard}
              className="w-8 h-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 custom-scrollbar">
              {/* Recipients Logic */}
              <div className="space-y-4">
                <RecipientFieldItem
                  label="To"
                  recipients={toRecipients}
                  onRemove={(id) => removeRecipient(id, "to")}
                  onFocus={() => setActiveField("to")}
                  showControls={true}
                  onToggleCc={() => setShowCc(!showCc)}
                  onToggleBcc={() => setShowBcc(!showBcc)}
                  isCcVisible={showCc}
                  isBccVisible={showBcc}
                />

                {/* Inline Search for active field */}
                {activeField && (
                  <div className="relative animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 border focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <Input
                        autoFocus
                        placeholder={`Search for ${activeField}...`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onBlur={() => setTimeout(() => setActiveField(null), 200)}
                        className="border-none shadow-none p-0 h-6 bg-transparent focus-visible:ring-0 text-sm"
                      />
                    </div>
                    {query.trim().length > 0 && (
                      <div className="absolute z-50 w-full mt-2 bg-popover border rounded-xl shadow-xl max-h-[280px] overflow-y-auto">
                        {filteredUsers.length === 0 ? (
                          <div className="p-8 text-center text-sm text-muted-foreground">No matches found.</div>
                        ) : (
                          filteredUsers.map((user) => (
                            <div
                              key={user.id}
                              onMouseDown={() => toggleUser(user, activeField)}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-muted cursor-pointer transition-colors"
                            >
                              <Avatar className="w-8 h-8 border">
                                <AvatarImage src={user.image || undefined} />
                                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                  {user.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold leading-tight">{user.name}</span>
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}

                {showCc && (
                  <RecipientFieldItem
                    label="Cc"
                    recipients={ccRecipients}
                    onRemove={(id) => removeRecipient(id, "cc")}
                    onFocus={() => setActiveField("cc")}
                  />
                )}

                {showBcc && (
                  <RecipientFieldItem
                    label="Bcc"
                    recipients={bccRecipients}
                    onRemove={(id) => removeRecipient(id, "bcc")}
                    onFocus={() => setActiveField("bcc")}
                  />
                )}
              </div>

              <Separator className="opacity-50" />

              {/* Subject */}
              <div className="space-y-2">
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border-none shadow-none text-2xl font-bold tracking-tight p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/30"
                  placeholder="Subject"
                />
              </div>

              {/* Body */}
              <div className="min-h-[300px]">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-full min-h-[300px] border-none shadow-none text-lg leading-relaxed p-0 focus-visible:ring-0 placeholder:text-muted-foreground/30 resize-none bg-transparent outline-none"
                  placeholder="Tell your story..."
                />
              </div>

              {/* Attachments Preview */}
              {hasAttachment && (
                <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="group relative flex items-center gap-3 bg-muted/40 hover:bg-muted/60 px-4 py-3 rounded-2xl border border-transparent hover:border-border transition-all cursor-default">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                      <Paperclip className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">Design-Guide-v2.pdf</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-black">2.4 MB • PDF</span>
                    </div>
                    <button
                      onClick={() => setHasAttachment(false)}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Floating style */}
            <div className="px-8 py-6 bg-background border-t">
              <div className="flex items-center justify-between">
                {/* Tools */}
                <div className="flex items-center gap-1.5 p-1 bg-muted/30 rounded-full">
                  <ToolbarButton icon={<Paperclip />} tooltip="Attach" onClick={() => setHasAttachment(true)} />
                  <ToolbarButton icon={<Smile />} tooltip="Emoji" />
                  <ToolbarButton icon={<ImageIcon />} tooltip="Image" />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  <ToolbarButton icon={<Bold />} tooltip="Bold" />
                  <ToolbarButton icon={<Italic />} tooltip="Italic" />
                  <ToolbarButton icon={<List />} tooltip="Bullets" />
                </div>

                {/* Final Actions */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center gap-2 group cursor-pointer"
                    onClick={() => setBroadcast(!broadcast)}
                  >
                    <Checkbox
                      checked={broadcast}
                      className="rounded-md border-2 border-primary data-[state=checked]:bg-primary"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                      Broadcast
                    </span>
                  </div>
                  <Button
                    onClick={handleDiscard}
                    variant="ghost"
                    className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Discard
                  </Button>
                  <Button
                    onClick={handleSend}
                    disabled={isSending || toRecipients.length === 0}
                    className="h-11 px-8 rounded-full bg-primary text-primary-foreground font-bold shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)] hover:shadow-none hover:translate-y-[1px] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isSending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Send
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  )
}

function RecipientFieldItem({
  label,
  recipients,
  onRemove,
  onFocus,
  showControls,
  onToggleCc,
  onToggleBcc,
  isCcVisible,
  isBccVisible,
}: {
  label: string
  recipients: User[]
  onRemove: (id: string) => void
  onFocus: () => void
  showControls?: boolean
  onToggleCc?: () => void
  onToggleBcc?: () => void
  isCcVisible?: boolean
  isBccVisible?: boolean
}) {
  return (
    <div className="flex items-start gap-4 py-2 border-b border-muted group/field">
      <span className="w-8 text-xs font-black uppercase text-muted-foreground pt-3 group-hover/field:text-primary transition-colors">
        {label}
      </span>
      <div className="flex-1 flex flex-wrap gap-2 min-h-[40px] items-center cursor-text" onClick={onFocus}>
        {recipients.map((r) => (
          <Badge
            key={r.id}
            className="pl-0.5 pr-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-foreground gap-2 group/badge"
          >
            <Avatar className="w-6 h-6 border shadow-sm">
              <AvatarImage src={r.image || undefined} />
              <AvatarFallback className="text-[10px] font-bold">{r.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-semibold leading-none">{r.email}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove(r.id)
              }}
              className="p-0.5 hover:bg-background rounded-full transition-colors opacity-60 hover:opacity-100"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        {recipients.length === 0 && <span className="text-sm text-muted-foreground/40 italic">Add recipients...</span>}
      </div>
      {showControls && (
        <div className="flex gap-1 pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCc}
            className={cn(
              "h-7 px-3 rounded-full text-[10px] font-black uppercase transition-all",
              isCcVisible ? "bg-primary/10 text-primary" : "text-muted-foreground",
            )}
          >
            Cc
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleBcc}
            className={cn(
              "h-7 px-3 rounded-full text-[10px] font-black uppercase transition-all",
              isBccVisible ? "bg-primary/10 text-primary" : "text-muted-foreground",
            )}
          >
            Bcc
          </Button>
        </div>
      )}
    </div>
  )
}

function ToolbarButton({ icon, tooltip, onClick }: { icon: React.ReactNode; tooltip: string; onClick?: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className="w-10 h-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
        >
          {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="text-[10px] font-bold uppercase tracking-widest bg-foreground text-background"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}
