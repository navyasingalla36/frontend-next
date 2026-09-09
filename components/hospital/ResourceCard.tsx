import GlassCard from "@/components/GlassCard";

interface ResourceCardProps {
  label: string;
  value: number;
  unit: string;
}

export default function ResourceCard({
  label,
  value,
  unit,
}: ResourceCardProps) {
  return (
    <GlassCard>
      <p className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-2xl font-bold text-white">
          {value}
        </p>

        <p className="text-xs text-slate-500">
          {unit}
        </p>
      </div>
    </GlassCard>
  );
}