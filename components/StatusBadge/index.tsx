interface StatusBadgeProps {
  status: "Ready" | "Warning" | "Critical" | string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles = {
    Ready: "border-[#2ECC71]/40 bg-[#2ECC71]/10 text-[#2ECC71]",
    Warning: "border-[#FFD43B]/40 bg-[#FFD43B]/10 text-[#FFD43B]",
    Critical: "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF4D4D]",
  };

  const style =
    styles[status as keyof typeof styles] ??
    "border-slate-500/40 bg-slate-500/10 text-slate-300";

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        border
        px-3 py-1
        text-xs font-semibold
        ${style}
      `}
    >
      {status}
    </span>
  );
}