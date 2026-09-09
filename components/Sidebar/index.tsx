"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Hospital,
  Bed,
  Ambulance,
  Home,
  Package,
  ClipboardEdit,
} from "lucide-react";

interface SidebarProps {
  type: "hospital" | "shelter";
}

export default function Sidebar({
  type,
}: SidebarProps) {
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
      icon: ClipboardEdit,
    },
  ];

  const shelterLinks = [
    {
      label: "Overview",
      href: "/shelter",
      icon: Home,
    },
    {
      label: "Allocation",
      href: "/shelter/allocation",
      icon: Home,
    },
    {
      label: "Inventory",
      href: "/shelter/inventory",
      icon: Package,
    },
  ];

  const links =
    type === "hospital"
      ? hospitalLinks
      : shelterLinks;

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-[#00B8E6]/20 bg-[#081321]">

      {/* Logo */}
      <div className="border-b border-[#00B8E6]/20 px-6 py-6">
        <p className="text-xs font-bold tracking-[0.3em] text-[#00D4FF]">
          RESQNOVA
        </p>

        <h2 className="mt-2 text-lg font-bold text-white">
          {type === "hospital"
            ? "Hospital Portal"
            : "Shelter Portal"}
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          NTR District Emergency Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3 py-5">

        {links.map((link) => {
          const Icon = link.icon;

          const isActive =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3
                rounded-xl
                border
                px-4 py-3
                text-sm font-semibold
                transition
                ${
                  isActive
                    ? "border-[#00D4FF] bg-[#00D4FF]/10 text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.08)]"
                    : "border-transparent text-slate-400 hover:border-[#00B8E6]/20 hover:bg-[#0B1F36] hover:text-white"
                }
              `}
            >
              <Icon size={19} />

              <span>
                {link.label}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-[#00B8E6]/20 p-4">
        <div className="rounded-xl border border-[#00B8E6]/20 bg-[#0B1F36]/60 p-3">
          <p className="text-xs text-slate-500">
            Location
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            NTR District
          </p>

          <p className="mt-1 text-xs text-[#00D4FF]">
            Emergency Operations
          </p>
        </div>
      </div>

    </aside>
  );
}