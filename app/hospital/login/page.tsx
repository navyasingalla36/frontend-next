"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Hospital,
  LockKeyhole,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import hospitals from "@/data/hospitals.json";

export default function HospitalLoginPage() {
  const router = useRouter();

  const [hospitalId, setHospitalId] = useState("hosp-001");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const selectedHospital = hospitals.find(
    (hospital) => hospital.id === hospitalId
  );

  function handleLogin() {
    if (!password.trim()) {
      setError("Please enter the demo password.");
      return;
    }

    setError("");

    localStorage.setItem("hospitalId", hospitalId);

    router.push("/hospital/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#081321] px-4 py-8 text-white">
      <div className="w-full max-w-md">

        {/* BRAND */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00B8E6]/40 bg-[#00D4FF]/10 shadow-[0_0_30px_rgba(0,212,255,0.08)]">
            <Hospital
              size={32}
              className="text-[#00D4FF]"
            />
          </div>

          <p className="mt-5 text-xs font-bold tracking-[0.3em] text-[#00D4FF]">
            RESQNOVA
          </p>

          <h1 className="mt-2 text-2xl font-bold text-white">
            Hospital Portal
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            NTR District Emergency Management
          </p>
        </div>

        {/* LOGIN CARD */}
        <GlassCard className="p-6 sm:p-8">

          <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#00B8E6]/15 bg-[#081321] p-4">
            <ShieldCheck
              size={20}
              className="shrink-0 text-[#00D4FF]"
            />

            <div>
              <p className="text-sm font-semibold text-white">
                Authorized Hospital Access
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Select your hospital to access its emergency dashboard.
              </p>
            </div>
          </div>

          <div className="space-y-5">

            {/* HOSPITAL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Select Hospital
              </label>

              <select
                value={hospitalId}
                onChange={(e) => {
                  setHospitalId(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00D4FF]/70 focus:ring-1 focus:ring-[#00D4FF]/30"
              >
                {hospitals.map((hospital) => (
                  <option
                    key={hospital.id}
                    value={hospital.id}
                  >
                    {hospital.hospital_name}
                  </option>
                ))}
              </select>
            </div>

            {/* SELECTED HOSPITAL INFO */}
            {selectedHospital && (
              <div className="rounded-xl border border-[#00B8E6]/15 bg-[#081321] p-4">
                <div className="flex items-center gap-3">
                  <MapPin
                    size={18}
                    className="text-[#00D4FF]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {selectedHospital.hospital_name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {selectedHospital.district} District
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-[#00B8E6]/10 bg-[#0B1F36] p-3">
                    <p className="text-[11px] text-slate-500">
                      Available Beds
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#00D4FF]">
                      {selectedHospital.available_beds}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#00B8E6]/10 bg-[#0B1F36] p-3">
                    <p className="text-[11px] text-slate-500">
                      Emergency Capacity
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#00D4FF]">
                      {selectedHospital.emergency_capacity}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter demo password"
                  className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00D4FF]/70 focus:ring-1 focus:ring-[#00D4FF]/30"
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-[#FF4D4D]/30 bg-[#FF4D4D]/10 px-4 py-3 text-sm text-[#FF4D4D]">
                {error}
              </div>
            )}

            {/* LOGIN */}
            <NeonButton
              onClick={handleLogin}
              className="w-full"
            >
              Access Hospital Dashboard
            </NeonButton>

            <p className="text-center text-[11px] text-slate-600">
              Demo prototype • NTR District
            </p>

          </div>
        </GlassCard>

      </div>
    </main>
  );
}