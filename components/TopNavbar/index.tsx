import { Bell } from "lucide-react";

interface TopNavbarProps {
  title: string;
  subtitle?: string;
}

export default function TopNavbar({
  title,
  subtitle = "NTR District",
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#00B8E6]/20 bg-[#081321]/95 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]">
            RESQNOVA
          </p>

          <h1 className="text-lg font-semibold text-white">
            {title}
          </h1>

          <p className="text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <button
          className="rounded-full border border-[#00B8E6]/30 p-2 text-[#00D4FF]"
          aria-label="Notifications"
        >
          <Bell size={19} />
        </button>
      </div>
    </header>
  );
}