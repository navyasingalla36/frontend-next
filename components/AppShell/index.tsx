"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hospital,
  Bed,
  Ambulance,
  Package,
  ClipboardList,
} from "lucide-react";

import Sidebar from "../Sidebar";
import TopNavbar from "../TopNavbar";

interface AppShellProps {
  children: React.ReactNode;
  portal: "hospital" | "shelter";
  title: string;
}

export default function AppShell({
  children,
  portal,
  title,
}: AppShellProps) {
  const pathname = usePathname();

  const hospitalLinks = [
    {
      label: "Overview",
      href: "/hospital/dashboard",
      icon: Hospital,
    },
    {
      label: "Capacity",
      href: "/hospital/capacity",
      icon: Bed,
    },
    {
      label: "Resources",
      href: "/hospital/resources",
      icon: Package,
    },
    {
      label: "Incoming",
      href: "/hospital/incoming",
      icon: Ambulance,
    },
    {
      label: "Updates",
      href: "/hospital/updates",
      icon: ClipboardList,
    },
    {
      label: "Coordination",
      href: "/hospital/coordination",
      icon: Hospital,
    },
  ];

  const shelterLinks = [
    {
      label: "Overview",
      href: "/shelter",
      icon: Hospital,
    },
    {
      label: "Allocation",
      href: "/shelter/allocation",
      icon: Bed,
    },
    {
      label: "Inventory",
      href: "/shelter/inventory",
      icon: Package,
    },
  ];

  const links =
    portal === "hospital"
      ? hospitalLinks
      : shelterLinks;

  return (
    <div className="min-h-screen bg-[#081321] text-white">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden min-[1536px]:block">
          <Sidebar type={portal} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Navbar */}
          <TopNavbar title={title} />

          {/* Mobile / Tablet Navigation */}
          <div className="sticky top-[73px] z-30 border-b border-[#00B8E6]/25 bg-[#081321]/95 px-3 py-2 backdrop-blur-md min-[1536px]:hidden">
            <div className="flex gap-2 overflow-x-auto">
              {links.map((link) => {
                const Icon = link.icon;

                const isActive =
                  pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex min-w-fit items-center gap-2
                      rounded-xl border
                      px-4 py-2.5
                      text-xs font-semibold
                      transition
                      ${
                        isActive
                          ? "border-[#00D4FF] bg-[#00D4FF]/15 text-[#00D4FF]"
                          : "border-[#00B8E6]/20 bg-[#0B1F36] text-slate-300"
                      }
                    `}
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 px-4 py-5 min-[1536px]:px-6 min-[1536px]:py-6">
            <div className="mx-auto w-full max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}