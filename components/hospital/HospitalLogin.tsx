"use client";

import { useState } from "react";
import { Hospital, LogIn } from "lucide-react";

import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";

interface Hospital {
  id: string;
  hospital_name: string;
  district: string;
}

interface HospitalLoginProps {
  hospitals: Hospital[];
}

export default function HospitalLogin({
  hospitals,
}: HospitalLoginProps) {
  const [selectedHospital, setSelectedHospital] = useState(
    hospitals[0]?.id ?? ""
  );

  const handleLogin = () => {
    localStorage.setItem("resqnova_hospital_id", selectedHospital);
    window.location.href = "/hospital";
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <GlassCard className="w-full max-w-md p-6">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00B8E6]/40 bg-[#00D4FF]/10 text-[#00D4FF]">
            <Hospital size={28} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Hospital Login
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Access your hospital's emergency operations portal.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Hospital
            </label>

            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-sm text-white outline-none focus:border-[#00D4FF]"
            >
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.hospital_name}
                </option>
              ))}
            </select>
          </div>

          <NeonButton
            onClick={handleLogin}
            className="w-full"
          >
            <LogIn size={17} className="mr-2" />
            Enter Hospital Portal
          </NeonButton>
        </div>
      </GlassCard>
    </div>
  );
}