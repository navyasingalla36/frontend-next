import GlassCard from "@/components/GlassCard";

interface HospitalStatusProps {
  status: "Ready" | "Warning" | "Critical";
  message?: string;
}

export default function HospitalStatus({
  status,
  message,
}: HospitalStatusProps) {
  const styles = {
    Ready: "border-[#2ECC71]/40 bg-[#2ECC71]/10 text-[#2ECC71]",
    Warning: "border-[#FFD43B]/40 bg-[#FFD43B]/10 text-[#FFD43B]",
    Critical: "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF4D4D]",
  };

  return (
    <GlassCard>
      <p className="text-xs uppercase tracking-wider text-slate-400">
        Readiness Status
      </p>

      <div
        className={`mt-3 rounded-xl border px-4 py-3 text-sm font-semibold ${styles[status]}`}
      >
        {message ?? `Hospital ${status}`}
      </div>
    </GlassCard>
  );
}