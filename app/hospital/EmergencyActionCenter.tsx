"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bed,
  Package,
  Ambulance,
  CheckCircle,
} from "lucide-react";

import NeonButton from "@/components/NeonButton";

export default function EmergencyActionCenter() {
  const [message, setMessage] = useState("");

  function activateEmergency() {
    setMessage("Emergency response mode activated.");
  }

  function prepareBeds() {
    setMessage("Request recorded: prepare 10 additional beds.");
  }

  function requestResources() {
    setMessage("Medical resource request recorded.");
  }

  return (
    <div className="rounded-2xl border border-[#FF4D4D]/30 bg-[#0B1F36]/80 p-5 shadow-[0_0_25px_rgba(255,77,77,0.08)] backdrop-blur-md">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF4D4D]/30 bg-[#FF4D4D]/10 text-[#FF4D4D]">
            <AlertTriangle size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Emergency Action Center
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Immediate hospital preparedness actions
            </p>
          </div>

        </div>

        <span className="rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/10 px-3 py-1 text-xs font-semibold text-[#2ECC71]">
          Ready
        </span>

      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">

        <NeonButton onClick={activateEmergency}>
          <Ambulance size={17} className="mr-2" />
          Emergency Mode
        </NeonButton>

        <NeonButton onClick={prepareBeds}>
          <Bed size={17} className="mr-2" />
          Prepare Beds
        </NeonButton>

        <NeonButton onClick={requestResources}>
          <Package size={17} className="mr-2" />
          Request Resources
        </NeonButton>

      </div>

      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/5 px-4 py-3">

          <CheckCircle
            size={17}
            className="text-[#2ECC71]"
          />

          <p className="text-sm text-[#00D4FF]">
            {message}
          </p>

        </div>
      )}

    </div>
  );
}