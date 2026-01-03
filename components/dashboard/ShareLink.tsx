"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";
import { Input } from "../ui/input";
import { Check } from "lucide-react";
import { Copy } from "lucide-react";
import { Twitter } from "lucide-react";
import { Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface ShareLinkProps {
  link: string;
}

export default function ShareLink({ link }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link Copied to Clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`, "_blank");
  };
  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
      "_blank",
    );
  };
  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-2-md">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input id="link" value={link} readOnly className="flex-1" />
          <Button size={"sm"} className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="mt-4 flex justify-around">
          <Button
            onClick={shareOnTwitter}
            variant={"outline"}
            size={"sm"}
            className="flex items-center space-x-2"
          >
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </Button>
          <Button
            onClick={shareOnLinkedIn}
            variant={"outline"}
            size={"sm"}
            className="flex items-center space-x-2"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </Button>
          <Button
            onClick={shareOnWhatsApp}
            variant={"outline"}
            size={"sm"}
            className="flex items-center space-x-2"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
