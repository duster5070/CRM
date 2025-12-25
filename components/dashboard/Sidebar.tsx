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
import Logo from "../global/Logo";

/**
 * Sidebar with nested sections + collapsible lists.
 * - Matches the structure provided in the screenshots.
 * - Active route is matched exactly (pathname === href). Adjust as needed for partial matches.
 * - Add/adjust hrefs to match your routing.
 */

type LinkItem = {
  title: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: number;
};
type Group = {
  title: string;
  items: (LinkItem | { title: string; items: LinkItem[] })[];
  icon?: React.ComponentType<any>;
};

const SIDEBAR: Group[] = [
  {
    title: "Dashboard",
    icon: Home,
    items: [{ title: "Overview", href: "/dashboard" }],
  },

  {
    title: "Clients & Projects",
    icon: Users,
    items: [
      {
        title: "Clients",
        items: [{ title: "Client List", href: "/dashboard/clients" }],
      },
      {
        title: "Projects",
        items: [{ title: "Project List", href: "/dashboard/projects" }],
      },
      {
        title: "Guest Projects",
        items: [
          { title: "Guest Project List", href: "/dashboard/guest-projects" },
        ],
      },
      // { title: "Modules", items: [{ title: "Module List", href: "/modules" }, { title: "Add New Module", href: "/modules/new" }] },
      // { title: "Tasks", items: [{ title: "Task List", href: "/tasks" }, { title: "Add New Task", href: "/tasks/new" }] },
    ],
  },

  {
    title: "Financial",
    icon: DollarSign,
    items: [
      // {
      //   title: "Invoices",
      //   items: [{ title: "Invoice List", href: "/dashboard/invoices" }],
      // },
      // { title: "Quotations", items: [{ title: "Quotation List", href: "/quotations" }, { title: "Create Quotation", href: "/quotations/new" }] },
      {
        title: "Payments",
        items: [{ title: "Payment List", href: "/dashboard/payments" }],
      },
    ],
  },

  {
    title: "Team",
    icon: User,
    items: [
      {
        title: "Members",
        items: [{ title: "Member List", href: "/dashboard/members" }],
      },
      {
        title: "Roles",
        items: [{ title: "Role List", href: "/dashboard/roles" }],
      },
    ],
  },

  {
    title: "Communication",
    icon: Mail,
    items: [
      {
        title: "Emails",
        items: [
          { title: " Emails", href: "/dashboard/emails" },
          { title: "Sent Emails", href: "/emails/sent" },
        ],
      },
      {
        title: "Subscribers",
        items: [
          { title: " Subscribers", href: "/dashboard/subscribers",},
        ],
      },
      {
        title: "Bulk Emails",
        items: [{ title: "bulk emails", href: "/dashboard/bulk-emails" }],
      },
    ],
  },

  {
    title: "Portfolio",
    icon: Image,
    items: [{ title: "Generate My Portfolio", href: "/dashboard/portfolio" }],
  },

  {
    title: "Brand Management",
    icon: FolderTree,
    items: [
      { title: "Brand Settings", href: "/dashboard/brand-settings" },
      { title: "File Manager", href: "/dashboard/file-manager" },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      { title: "Project process", href: "/dashboard/project-process" },
      { title: "Finance summary", href: "/dashboard/financial-summary" },
      { title: "Time Tracking", href: "/dashboard/time-tracking" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { title: "Account Settings", href: "/dashboard/account-settings" },
      { title: "Notifications", href: "/dashboard/notifications" },
      { title: "Integrations", href: "/dashboard/integration" },
    ],
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
        <Badge className="ml-auto h-5 w-5 shrink-0 grid place-items-center text-xs rounded-full">
          {item.badge}
        </Badge>
      ) : null}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  // maintain open sections in state; default open where current pathname exists
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
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
    }
  );

  const toggleSection = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <aside className="hidden md:block w-71 border-r bg-muted/40 h-screen sticky top-0 overflow-auto ">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-4 py-4 border-b">
          <Logo />
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
                  {SectionIcon ? (
                    <SectionIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="grow text-left">{section.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isSectionOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "mt-2 space-y-1 pl-6",
                    !isSectionOpen && "hidden"
                  )}
                >
                  {section.items.map((it, idx) => {
                    if ("href" in it) {
                      // single direct link
                      return <NestedLink key={idx} item={it} />;
                    } else {
                      // sub-group with its own title + items
                      return (
                        <div key={it.title} className="mb-1">
                          <div className="text-xs font-semibold px-3 py-1 text-muted-foreground">
                            {it.title}
                          </div>
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
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
            >
              <FolderTree className="h-4 w-4" />
              Live Website
            </Link>
          </div>
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-lg border p-3 bg-card">
            <h4 className="text-sm font-semibold">Upgrade to Pro</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Unlock all features and get unlimited access to our support team.
            </p>
            <Button size="sm" className="mt-3 w-full">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
