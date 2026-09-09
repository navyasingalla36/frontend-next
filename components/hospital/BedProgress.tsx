import GlassCard from "@/components/GlassCard";

interface BedProgressProps {
  availableBeds: number;
  totalBeds: number;
}

export default function BedProgress({
  availableBeds,
  totalBeds,
}: BedProgressProps) {
  const percentage =
    totalBeds > 0
      ? Math.round((availableBeds / totalBeds) * 100)
      : 0;

  return (
    <GlassCard>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Bed Availability
          </p>

          <p className="mt-1 text-sm text-white">
            {availableBeds} of {totalBeds} beds available
          </p>
        </div>

        <p className="text-lg font-bold text-[#00D4FF]">
          {percentage}%
        </p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#081321]">
        <div
          className="h-full rounded-full bg-[#00D4FF]"
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </GlassCard>
  );
}