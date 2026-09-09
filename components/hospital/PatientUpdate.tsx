import GlassCard from "@/components/GlassCard";

interface PatientUpdateProps {
  patientsAdded: number;
  patientsDischarged: number;
  occupiedBeds: number;
  availableBeds: number;
}

export default function PatientUpdate({
  patientsAdded,
  patientsDischarged,
  occupiedBeds,
  availableBeds,
}: PatientUpdateProps) {
  return (
    <GlassCard>
      <p className="text-xs uppercase tracking-wider text-slate-400">
        Patient Activity
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500">
            Patients Added
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {patientsAdded}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Discharged
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {patientsDischarged}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Occupied Beds
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {occupiedBeds}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Available Beds
          </p>

          <p className="mt-1 text-xl font-bold text-[#00D4FF]">
            {availableBeds}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}