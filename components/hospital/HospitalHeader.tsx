import GlassCard from "@/components/GlassCard";

interface HospitalHeaderProps {
  name: string;
  district: string;
  status: string;
}

export default function HospitalHeader({
  name,
  district,
  status,
}: HospitalHeaderProps) {
  const statusClass =
    status === "Ready"
      ? "border-[#2ECC71]/40 bg-[#2ECC71]/10 text-[#2ECC71]"
      : status === "Warning"
        ? "border-[#FFD43B]/40 bg-[#FFD43B]/10 text-[#FFD43B]"
        : "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF4D4D]";

  return (
    <GlassCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#00D4FF]">
            Hospital Operations
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            {name}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {district} District
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
        >
          {status.toUpperCase()}
        </span>
      </div>
    </GlassCard>
  );
}