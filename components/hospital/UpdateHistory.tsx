import GlassCard from "@/components/GlassCard";

interface UpdateHistoryProps {
  lastUpdated: string;
}

export default function UpdateHistory({
  lastUpdated,
}: UpdateHistoryProps) {
  return (
    <GlassCard>
      <p className="text-xs uppercase tracking-wider text-slate-400">
        Update History
      </p>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            Latest Hospital Update
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Hospital operational data
          </p>
        </div>

        <p className="text-right text-xs text-[#00D4FF]">
          {lastUpdated}
        </p>
      </div>
    </GlassCard>
  );
}