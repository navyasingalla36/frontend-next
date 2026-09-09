import GlassCard from "@/components/GlassCard";

interface IncomingCardProps {
  location: string;
  patients: number;
  eta: string;
  severity?: string;
}

export default function IncomingCard({
  location,
  patients,
  eta,
  severity,
}: IncomingCardProps) {
  return (
    <GlassCard>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white">
              {location}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {patients} predicted patients
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-[#00D4FF]">
              {eta}
            </p>

            <p className="text-xs text-slate-500">
              ETA
            </p>
          </div>
        </div>

        {severity && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Expected load
            </span>

            <span className="text-xs text-slate-400">
              {severity}
            </span>
          </div>
        )}

        <div className="h-2 overflow-hidden rounded-full bg-[#081321]">
          <div
            className="h-full rounded-full bg-[#00D4FF]"
            style={{
              width: `${Math.min(patients * 5, 100)}%`,
            }}
          />
        </div>
      </div>
    </GlassCard>
  );
}