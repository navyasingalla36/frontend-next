"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hospital } from "lucide-react";

import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import hospitals from "@/data/hospitals.json";

export default function HospitalLoginPage() {
  const router = useRouter();

  const [hospitalId, setHospitalId] = useState("hosp-001");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!password.trim()) {
      alert("Please enter the password");
      return;
    }

    localStorage.setItem("hospitalId", hospitalId);

    router.push("/hospital/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#081321] px-4 text-white">
      <GlassCard className="w-full max-w-md p-8">

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00B8E6]/40 bg-[#00D4FF]/10">
            <Hospital size={32} className="text-[#00D4FF]" />
          </div>

          <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#00D4FF]">
            RESQNOVA
          </p>

          <h1 className="mt-2 text-2xl font-bold">
            Hospital Portal
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            NTR District Emergency Management
          </p>
        </div>

        <div className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Select Hospital
            </label>

            <select
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              className="w-full rounded-xl border border-[#00B8E6]/40 bg-[#081321] px-4 py-3 text-white outline-none"
            >
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.hospital_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter demo password"
              className="w-full rounded-xl border border-[#00B8E6]/40 bg-[#081321] px-4 py-3 text-white outline-none placeholder:text-slate-600"
            />
          </div>

          <NeonButton
            onClick={handleLogin}
            className="w-full"
          >
            Login
          </NeonButton>

        </div>
      </GlassCard>
    </main>
  );
}