interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border border-[#00B8E6]/30
        bg-[#0B1F36]/80
        p-4
        shadow-[0_0_20px_rgba(0,212,255,0.08)]
        backdrop-blur-md
        ${className}
      `}
    >
      {children}
    </div>
  );
}