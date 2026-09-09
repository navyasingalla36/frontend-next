"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";

interface UpdateFormProps {
  hospitalId: string;
  availableBeds: number;
  occupiedBeds: number;
  oxygen: number;
  ventilators: number;
  medicalKits: number;
  bloodUnits: number;
}

export default function UpdateForm({
  hospitalId,
  availableBeds,
  occupiedBeds,
  oxygen,
  ventilators,
  medicalKits,
  bloodUnits,
}: UpdateFormProps) {
  const [beds, setBeds] = useState(availableBeds);
  const [occupied, setOccupied] = useState(occupiedBeds);
  const [oxygenValue, setOxygenValue] = useState(oxygen);
  const [ventilatorValue, setVentilatorValue] = useState(ventilators);
  const [medicalKitValue, setMedicalKitValue] = useState(medicalKits);
  const [bloodValue, setBloodValue] = useState(bloodUnits);
  const [message, setMessage] = useState("");

  const saveUpdate = () => {
    const update = {
      hospital_id: hospitalId,
      available_beds: beds,
      occupied_beds: occupied,
      oxygen: oxygenValue,
      ventilators: ventilatorValue,
      medical_kits: medicalKitValue,
      blood_units: bloodValue,
      updated_at: new Date().toLocaleString(),
    };

    localStorage.setItem(
      `resqnova_hospital_update_${hospitalId}`,
      JSON.stringify(update)
    );

    setMessage("Hospital status updated successfully.");
  };

  return (
    <GlassCard>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-wider text-slate-400">
          Update Hospital Status
        </p>

        <h3 className="mt-1 text-lg font-semibold text-white">
          Update Current Resources
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          These mock updates are stored locally until Supabase integration.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">

        <label className="space-y-2">
          <span className="text-xs text-slate-400">
            Available Beds
          </span>

          <input
            type="number"
            min="0"
            value={beds}
            onChange={(e) => setBeds(Number(e.target.value))}
            className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-3 py-3 text-white outline-none focus:border-[#00D4FF]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs text-slate-400">
            Occupied Beds
          </span>

          <input
            type="number"
            min="0"
            value={occupied}
            onChange={(e) => setOccupied(Number(e.target.value))}
            className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-3 py-3 text-white outline-none focus:border-[#00D4FF]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs text-slate-400">
            Oxygen (%)
          </span>

          <input
            type="number"
            min="0"
            max="100"
            value={oxygenValue}
            onChange={(e) =>
              setOxygenValue(Number(e.target.value))
            }
            className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-3 py-3 text-white outline-none focus:border-[#00D4FF]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs text-slate-400">
            Ventilators
          </span>

          <input
            type="number"
            min="0"
            value={ventilatorValue}
            onChange={(e) =>
              setVentilatorValue(Number(e.target.value))
            }
            className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-3 py-3 text-white outline-none focus:border-[#00D4FF]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs text-slate-400">
            Medical Kits
          </span>

          <input
            type="number"
            min="0"
            value={medicalKitValue}
            onChange={(e) =>
              setMedicalKitValue(Number(e.target.value))
            }
            className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-3 py-3 text-white outline-none focus:border-[#00D4FF]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs text-slate-400">
            Blood Units
          </span>

          <input
            type="number"
            min="0"
            value={bloodValue}
            onChange={(e) =>
              setBloodValue(Number(e.target.value))
            }
            className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-3 py-3 text-white outline-none focus:border-[#00D4FF]"
          />
        </label>
      </div>

      <div className="mt-5">
        <NeonButton onClick={saveUpdate}>
          <Save size={17} className="mr-2" />
          Save Hospital Update
        </NeonButton>
      </div>

      {message && (
        <p className="mt-3 text-sm text-[#2ECC71]">
          {message}
        </p>
      )}
    </GlassCard>
  );
}