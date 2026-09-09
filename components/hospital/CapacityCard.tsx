import GlassCard from "@/components/GlassCard";

interface CapacityCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
}

export default function CapacityCard({
  label,
  value,
  subtitle,
}: CapacityCardProps) {
  return (
    <GlassCard>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="text-2xl font-bold text-white">
          {value}
        </p>

        {subtitle && (
          <p className="text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </GlassCard>
  );
}