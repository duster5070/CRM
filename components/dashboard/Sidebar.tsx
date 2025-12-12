"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Package2,
  FolderTree,
  FileText,
  ClipboardList,
  FilePlus,
  UserPlus,
  Layers,
  List,
  PlusCircle,
  DollarSign,
 
  CreditCard,
  User,
  Shield,
  Mail,
  MailOpen,
  Send,
  Megaphone,
  Image,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Sidebar with nested sections + collapsible lists.
 * - Matches the structure provided in the screenshots.
 * - Active route is matched exactly (pathname === href). Adjust as needed for partial matches.
 * - Add/adjust hrefs to match your routing.
 */

type LinkItem = { title: string; href: string; icon?: React.ComponentType<any>; badge?: number };
type Group = { title: string; items: (LinkItem | { title: string; items: LinkItem[] })[]; icon?: React.ComponentType<any> };

const SIDEBAR: Group[] = [
  { title: "Dashboard", icon: Home, items: [{ title: "Overview", href: "/dashboard" }] },

  {
    title: "Clients & Projects",
    icon: Users,
    items: [
      { title: "Clients", items: [{ title: "Client List", href: "/clients" }, { title: "Add New Client", href: "/clients/new" }] },
      { title: "Projects", items: [{ title: "Project List", href: "/projects" }, { title: "Add New Project", href: "/projects/new" }] },
      { title: "Modules", items: [{ title: "Module List", href: "/modules" }, { title: "Add New Module", href: "/modules/new" }] },
      { title: "Tasks", items: [{ title: "Task List", href: "/tasks" }, { title: "Add New Task", href: "/tasks/new" }] },
    ],
  },

  {
    title: "Financial",
    icon: DollarSign,
    items: [
      { title: "Invoices", items: [{ title: "Invoice List", href: "/invoices" }, { title: "Create Invoice", href: "/invoices/new" }] },
      { title: "Quotations", items: [{ title: "Quotation List", href: "/quotations" }, { title: "Create Quotation", href: "/quotations/new" }] },
      { title: "Payments", items: [{ title: "Payment List", href: "/payments" }, { title: "Record Payment", href: "/payments/new" }] },
    ],
  },

  {
    title: "Team",
    icon: User,
    items: [
      { title: "Members", items: [{ title: "Member List", href: "/team/members" }, { title: "Add Team Member", href: "/team/members/new" }] },
      { title: "Roles", items: [{ title: "Role List", href: "/team/roles" }, { title: "Assign Roles", href: "/team/roles/assign" }] },
    ],
  },

  {
    title: "Communication",
    icon: Mail,
    items: [
      { title: "Emails", items: [{ title: "Compose Email", href: "/emails/compose" }, { title: "Email Templates", href: "/emails/templates" }, { title: "Sent Emails", href: "/emails/sent" }] },
      { title: "Bulk Emails", items: [{ title: "Create Campaign", href: "/campaigns/new" }, { title: "Campaign History", href: "/campaigns" }] },
    ],
  },

  {
    title: "Portfolio",
    icon: Image,
    items: [{ title: "My Portfolio", href: "/portfolio" }, { title: "Portfolio Items", href: "/portfolio/items" }, { title: "Generate Shareable Link", href: "/portfolio/share" }],
  },

  {
    title: "Brand Management",
    icon: Settings,
    items: [{ title: "Brand Settings", href: "/brand" }, { title: "Logo Upload", href: "/brand/logo" }, { title: "Document Templates", href: "/brand/templates" }],
  },
];

function NestedLink({ item }: { item: LinkItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-primary",
        isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground"
      )}
    >
      {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
      <span className="truncate">{item.title}</span>
      {item.badge ? (
        <Badge className="ml-auto h-5 w-5 shrink-0 grid place-items-center text-xs rounded-full">{item.badge}</Badge>
      ) : null}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  // maintain open sections in state; default open where current pathname exists
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const s of SIDEBAR) {
      // open section if any nested href matches pathname (simple check)
      const found = s.items.some((it) => {
        if ("href" in it) return it.href === pathname;
        return it.items?.some((li) => li.href === pathname);
      });
      initial[s.title] = found || false;
    }
    return initial;
  });

  const toggleSection = (title: string) => setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <aside className="hidden md:block w-72 border-r bg-muted/40 h-screen sticky top-0 overflow-auto">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-4 py-4 border-b">
          <Package2 className="h-6 w-6" />
          <Link href="/" className="font-semibold">
            Acme Inc
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>

        <nav className="px-2 py-4 space-y-3">
          {SIDEBAR.map((section) => {
            const SectionIcon = section.icon;
            const isSectionOpen = !!openSections[section.title];

            return (
              <div key={section.title} className="px-1">
                <button
                  onClick={() => toggleSection(section.title)}
                  aria-expanded={isSectionOpen}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted hover:text-primary"
                >
                  {SectionIcon ? <SectionIcon className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span className="grow text-left">{section.title}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isSectionOpen && "rotate-180")} />
                </button>

                <div className={cn("mt-2 space-y-1 pl-6", !isSectionOpen && "hidden")}>
                  {section.items.map((it, idx) => {
                    if ("href" in it) {
                      // single direct link
                      return <NestedLink key={idx} item={it} />;
                    } else {
                      // sub-group with its own title + items
                      return (
                        <div key={it.title} className="mb-1">
                          <div className="text-xs font-semibold px-3 py-1 text-muted-foreground">{it.title}</div>
                          <div className="space-y-1">
                            {it.items.map((li) => (
                              <NestedLink key={li.href} item={li} />
                            ))}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <Link href="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary">
              <FolderTree className="h-4 w-4" />
              Live Website
            </Link>
          </div>
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-lg border p-3 bg-card">
            <h4 className="text-sm font-semibold">Upgrade to Pro</h4>
            <p className="text-xs text-muted-foreground mt-1">Unlock all features and get unlimited access to our support team.</p>
            <Button size="sm" className="mt-3 w-full">Upgrade</Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
