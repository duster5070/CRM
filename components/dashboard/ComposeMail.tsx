"use client";

import * as React from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { sendComposedEmail, type ComposedEmailData } from "@/actions/emails";
import { getAllUsers } from "@/actions/users";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

type RecipientField = "to" | "cc" | "bcc";

export default function ComposeMail() {
  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [toRecipients, setToRecipients] = React.useState<User[]>([]);
  const [ccRecipients, setCcRecipients] = React.useState<User[]>([]);
  const [bccRecipients, setBccRecipients] = React.useState<User[]>([]);
  const [subject, setSubject] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [broadcast, setBroadcast] = React.useState<boolean>(true);
  const [showCc, setShowCc] = React.useState<boolean>(false);
  const [showBcc, setShowBcc] = React.useState<boolean>(false);
  const [isMinimized, setIsMinimized] = React.useState<boolean>(false);
  const [hasAttachment, setHasAttachment] = React.useState<boolean>(false);
  const [isSending, setIsSending] = React.useState<boolean>(false);

  const [activeField, setActiveField] = React.useState<RecipientField | null>(null);
  const [query, setQuery] = React.useState<string>("");

  React.useEffect(() => {
    async function loadUsers() {
      const users = await getAllUsers();
      setAllUsers(users);
    }
    loadUsers();
  }, []);

  React.useEffect(() => {
    if (!activeField) {
      setQuery("");
    }
  }, [activeField]);

  const getRecipientsForField = (field: RecipientField): User[] => {
    switch (field) {
      case "to":
        return toRecipients;
      case "cc":
        return ccRecipients;
      case "bcc":
        return bccRecipients;
    }
  };

  const setRecipientsForField = (field: RecipientField, recipients: User[]) => {
    switch (field) {
      case "to":
        setToRecipients(recipients);
        break;
      case "cc":
        setCcRecipients(recipients);
        break;
      case "bcc":
        setBccRecipients(recipients);
        break;
    }
  };

  const filteredUsers = React.useMemo(() => {
    if (!activeField || query.trim().length === 0) return [];
    const currentRecipients = getRecipientsForField(activeField);
    const currentIds = currentRecipients.map((r) => r.id);
    return allUsers.filter(
      (user) =>
        !currentIds.includes(user.id) &&
        (user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())),
    );
  }, [query, activeField, allUsers, toRecipients, ccRecipients, bccRecipients]);

  const toggleUser = (user: User, field: RecipientField) => {
    const recipients = getRecipientsForField(field);
    const exists = recipients.find((r) => r.id === user.id);
    if (exists) {
      setRecipientsForField(
        field,
        recipients.filter((r) => r.id !== user.id),
      );
    } else {
      setRecipientsForField(field, [...recipients, user]);
    }
  };

  const removeRecipient = (userId: string, field: RecipientField) => {
    const recipients = getRecipientsForField(field);
    setRecipientsForField(
      field,
      recipients.filter((r) => r.id !== userId),
    );
  };

  const handleSend = async (): Promise<void> => {
    if (toRecipients.length === 0) {
      toast.error("Please add at least one recipient.");
      return;
    }
    if (!subject.trim()) {
      toast.error("Please add a subject.");
      return;
    }
    if (!message.trim()) {
      toast.error("Please write a message.");
      return;
    }

    setIsSending(true);
    try {
      const emailData: ComposedEmailData = {
        from: "Project X <onboarding@resend.dev>",
        to: toRecipients.map((r) => r.email),
        cc: ccRecipients.length > 0 ? ccRecipients.map((r) => r.email) : undefined,
        bcc: bccRecipients.length > 0 ? bccRecipients.map((r) => r.email) : undefined,
        subject,
        message,
        broadcast,
      };
      const result = await sendComposedEmail(emailData);
      if (result.success) {
        toast.success(`Sent to ${toRecipients.length} recipients!`);
        setSubject("");
        setMessage("");
        setToRecipients([]);
        setCcRecipients([]);
        setBccRecipients([]);
        setShowCc(false);
        setShowBcc(false);
        setHasAttachment(false);
      }
    } catch (error) {
      toast.error("Failed to send email.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDiscard = (): void => {
    if (confirm("Discard this email?")) {
      setSubject("");
      setMessage("");
      setToRecipients([]);
      setCcRecipients([]);
      setBccRecipients([]);
      setShowCc(false);
      setShowBcc(false);
      setHasAttachment(false);
    }
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl transition-all duration-300 ease-in-out",
          isMinimized ? "mb-4 mt-auto h-14" : "my-8 h-[85vh]",
        )}
      >
        {/* Header - Glass effect */}
        <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-tight opacity-70">
              New Message
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 rounded-full hover:bg-background/80"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDiscard}
              className="h-8 w-8 rounded-full transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Scrollable Form Content */}
            <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto px-8 py-6">
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
                  <div className="relative duration-200 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 transition-all focus-within:ring-1 focus-within:ring-primary/30">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        autoFocus
                        placeholder={`Search for ${activeField}...`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onBlur={() => setTimeout(() => setActiveField(null), 200)}
                        className="h-6 border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                      />
                    </div>
                    {query.trim().length > 0 && (
                      <div className="absolute z-50 mt-2 max-h-[280px] w-full overflow-y-auto rounded-xl border bg-popover shadow-xl">
                        {filteredUsers.length === 0 ? (
                          <div className="p-8 text-center text-sm text-muted-foreground">
                            No matches found.
                          </div>
                        ) : (
                          filteredUsers.map((user) => (
                            <div
                              key={user.id}
                              onMouseDown={() => toggleUser(user, activeField)}
                              className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                            >
                              <Avatar className="h-8 w-8 border">
                                <AvatarImage src={user.image || undefined} />
                                <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                                  {user.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold leading-tight">
                                  {user.name}
                                </span>
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
                  className="h-auto border-none p-0 text-2xl font-bold tracking-tight shadow-none placeholder:text-muted-foreground/30 focus-visible:ring-0"
                  placeholder="Subject"
                />
              </div>

              {/* Body */}
              <div className="min-h-[300px]">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-full min-h-[300px] w-full resize-none border-none bg-transparent p-0 text-lg leading-relaxed shadow-none outline-none placeholder:text-muted-foreground/30 focus-visible:ring-0"
                  placeholder="Tell your story..."
                />
              </div>

              {/* Attachments Preview */}
              {hasAttachment && (
                <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="group relative flex cursor-default items-center gap-3 rounded-2xl border border-transparent bg-muted/40 px-4 py-3 transition-all hover:border-border hover:bg-muted/60">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Paperclip className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">Design-Guide-v2.pdf</span>
                      <span className="text-[10px] font-black uppercase text-muted-foreground">
                        2.4 MB • PDF
                      </span>
                    </div>
                    <button
                      onClick={() => setHasAttachment(false)}
                      className="absolute -right-1 -top-1 rounded-full bg-destructive p-0.5 text-destructive-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Floating style */}
            <div className="border-t bg-background px-8 py-6">
              <div className="flex items-center justify-between">
                {/* Tools */}
                <div className="flex items-center gap-1.5 rounded-full bg-muted/30 p-1">
                  <ToolbarButton
                    icon={<Paperclip />}
                    tooltip="Attach"
                    onClick={() => setHasAttachment(true)}
                  />
                  <ToolbarButton icon={<Smile />} tooltip="Emoji" />
                  <ToolbarButton icon={<ImageIcon />} tooltip="Image" />
                  <Separator orientation="vertical" className="mx-1 h-6" />
                  <ToolbarButton icon={<Bold />} tooltip="Bold" />
                  <ToolbarButton icon={<Italic />} tooltip="Italic" />
                  <ToolbarButton icon={<List />} tooltip="Bullets" />
                </div>

                {/* Final Actions */}
                <div className="flex items-center gap-4">
                  <div
                    className="group flex cursor-pointer items-center gap-2"
                    onClick={() => setBroadcast(!broadcast)}
                  >
                    <Checkbox
                      checked={broadcast}
                      className="rounded-md border-2 border-primary data-[state=checked]:bg-primary"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                      Broadcast
                    </span>
                  </div>
                  <Button
                    onClick={handleDiscard}
                    variant="ghost"
                    className="rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Discard
                  </Button>
                  <Button
                    onClick={handleSend}
                    disabled={isSending || toRecipients.length === 0}
                    className="h-11 rounded-full bg-primary px-8 font-bold text-primary-foreground shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)] transition-all hover:translate-y-[1px] hover:shadow-none active:scale-95 disabled:opacity-50"
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Send
                        <Send className="ml-2 h-4 w-4" />
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
  );
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
  label: string;
  recipients: User[];
  onRemove: (id: string) => void;
  onFocus: () => void;
  showControls?: boolean;
  onToggleCc?: () => void;
  onToggleBcc?: () => void;
  isCcVisible?: boolean;
  isBccVisible?: boolean;
}) {
  return (
    <div className="group/field flex items-start gap-4 border-b border-muted py-2">
      <span className="w-8 pt-3 text-xs font-black uppercase text-muted-foreground transition-colors group-hover/field:text-primary">
        {label}
      </span>
      <div
        className="flex min-h-[40px] flex-1 cursor-text flex-wrap items-center gap-2"
        onClick={onFocus}
      >
        {recipients.map((r) => (
          <Badge
            key={r.id}
            className="group/badge gap-2 rounded-full border border-primary/20 bg-primary/5 py-0.5 pl-0.5 pr-2 text-foreground transition-colors hover:bg-primary/10"
          >
            <Avatar className="h-6 w-6 border shadow-sm">
              <AvatarImage src={r.image || undefined} />
              <AvatarFallback className="text-[10px] font-bold">
                {r.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-semibold leading-none">{r.email}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(r.id);
              }}
              className="rounded-full p-0.5 opacity-60 transition-colors hover:bg-background hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {recipients.length === 0 && (
          <span className="text-sm italic text-muted-foreground/40">Add recipients...</span>
        )}
      </div>
      {showControls && (
        <div className="flex gap-1 pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCc}
            className={cn(
              "h-7 rounded-full px-3 text-[10px] font-black uppercase transition-all",
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
              "h-7 rounded-full px-3 text-[10px] font-black uppercase transition-all",
              isBccVisible ? "bg-primary/10 text-primary" : "text-muted-foreground",
            )}
          >
            Bcc
          </Button>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({
  icon,
  tooltip,
  onClick,
}: {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className="h-10 w-10 rounded-full text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
        >
          {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="bg-foreground text-[10px] font-bold uppercase tracking-widest text-background"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
