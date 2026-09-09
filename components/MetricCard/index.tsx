interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function MetricCard({
  label,
  value,
  subtitle,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-[#00B8E6]/30 bg-[#0B1F36]/80 p-4 shadow-[0_0_20px_rgba(0,212,255,0.08)] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>

        {icon && (
          <div className="text-[#00D4FF]">
            {icon}
          </div>
        )}
      </div>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}