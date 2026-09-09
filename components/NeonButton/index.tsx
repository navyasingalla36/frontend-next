interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function NeonButton({
  children,
  onClick,
  type = "button",
  className = "",
}: NeonButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        inline-flex
        min-h-11
        items-center
        justify-center
        rounded-xl
        border
        border-[#00B8E6]
        bg-[#00D4FF]/10
        px-4
        py-2.5
        text-sm
        font-semibold
        text-[#00D4FF]
        shadow-[0_0_15px_rgba(0,212,255,0.12)]
        transition
        hover:bg-[#00D4FF]/20
        active:scale-[0.98]
        ${className}
      `}
    >
      {children}
    </button>
  );
}