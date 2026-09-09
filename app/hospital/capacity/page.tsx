"use client";

import { useEffect, useState } from "react";
import {
  Bed,
  HeartPulse,
  ShieldCheck,
  Plus,
  CheckCircle,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import StatusBadge from "@/components/StatusBadge";

import hospitals from "@/data/hospitals.json";
import hospitalStatus from "@/data/hospital-status.json";

export default function HospitalCapacityPage() {
  const [hospitalId, setHospitalId] = useState("hosp-001");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedId = localStorage.getItem("hospitalId");

    if (savedId) {
      setHospitalId(savedId);
    }
  }, []);

  const hospital = hospitals.find(
    (item) => item.id === hospitalId
  );

  const statusData = hospitalStatus.find(
    (item) => item.hospital_id === hospitalId
  );

  if (!hospital || !statusData) {
    return (
      <AppShell
        portal="hospital"
        title="Hospital Capacity"
      >
        <GlassCard>
          <p className="text-[#FF4D4D]">
            Hospital information not found.
          </p>
        </GlassCard>
      </AppShell>
    );
  }

  const status = statusData;

  const availabilityPercentage = Math.round(
    (status.available_beds / status.total_beds) * 100
  );

  const occupancyPercentage = Math.round(
    (status.occupied_beds / status.total_beds) * 100
  );

  function handleIncreaseCapacity() {
    setMessage(
      "Emergency capacity expansion request recorded."
    );
  }

  function handleMarkReady() {
    setMessage(
      "Hospital marked as ready for emergency response."
    );
  }

  return (
    <AppShell
      portal="hospital"
      title="Hospital Capacity"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <GlassCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#00D4FF]">
                Capacity Management
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {hospital.hospital_name}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {hospital.district} District Emergency Operations
              </p>
            </div>

            <StatusBadge status={status.readiness_status} />

          </div>
        </GlassCard>

        {/* CAPACITY METRICS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <CapacityMetric
            icon={<Bed size={21} />}
            label="Total Beds"
            value={status.total_beds}
          />

          <CapacityMetric
            icon={<Bed size={21} />}
            label="Available Beds"
            value={status.available_beds}
          />

          <CapacityMetric
            icon={<HeartPulse size={21} />}
            label="ICU Beds"
            value={status.icu_beds}
          />

          <CapacityMetric
            icon={<ShieldCheck size={21} />}
            label="Emergency Capacity"
            value={status.emergency_capacity}
          />

        </div>

        {/* BED UTILIZATION */}
        <GlassCard>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
              <Bed size={22} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Bed Utilization
              </h3>

              <p className="text-sm text-slate-400">
                Current hospital bed occupancy
              </p>
            </div>

          </div>

          <div className="mt-6">

            <div className="flex items-center justify-between">

              <span className="text-sm text-slate-400">
                Available Beds
              </span>

              <span className="font-semibold text-white">
                {status.available_beds} / {status.total_beds}
              </span>

            </div>

            <div className="mt-3 h-4 overflow-hidden rounded-full bg-[#081321]">

              <div
                className="h-full rounded-full bg-[#00D4FF]"
                style={{
                  width: `${availabilityPercentage}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-xs">

              <span className="text-[#00D4FF]">
                {availabilityPercentage}% Available
              </span>

              <span className="text-slate-500">
                {occupancyPercentage}% Occupied
              </span>

            </div>

          </div>

        </GlassCard>

        {/* CAPACITY BREAKDOWN */}
        <div className="grid gap-6 lg:grid-cols-2">

          <GlassCard>

            <h3 className="text-lg font-semibold text-white">
              Capacity Breakdown
            </h3>

            <div className="mt-5 space-y-4">

              <Breakdown
                label="Total Beds"
                value={status.total_beds}
              />

              <Breakdown
                label="Occupied Beds"
                value={status.occupied_beds}
              />

              <Breakdown
                label="Available Beds"
                value={status.available_beds}
              />

              <Breakdown
                label="ICU Beds"
                value={status.icu_beds}
              />

              <Breakdown
                label="Emergency Capacity"
                value={status.emergency_capacity}
              />

            </div>

          </GlassCard>

          <GlassCard>

            <h3 className="text-lg font-semibold text-white">
              Emergency Readiness
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Capacity available for incoming emergencies
            </p>

            <div className="mt-6 rounded-2xl border border-[#2ECC71]/30 bg-[#2ECC71]/5 p-5">

              <div className="flex items-center gap-3">

                <CheckCircle
                  size={24}
                  className="text-[#2ECC71]"
                />

                <div>
                  <p className="font-semibold text-white">
                    {status.readiness_status}
                  </p>

                  <p className="text-xs text-slate-400">
                    Current operational status
                  </p>
                </div>

              </div>

              <div className="mt-5">

                <div className="flex justify-between text-sm">

                  <span className="text-slate-400">
                    Emergency Capacity
                  </span>

                  <span className="font-bold text-white">
                    {status.emergency_capacity}
                  </span>

                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#081321]">

                  <div
                    className="h-full rounded-full bg-[#2ECC71]"
                    style={{
                      width: `${Math.min(
                        status.emergency_capacity * 5,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </GlassCard>

        </div>

        {/* ACTIONS */}
        <GlassCard>

          <h3 className="text-lg font-semibold text-white">
            Capacity Actions
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Prepare the hospital for emergency demand.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            <NeonButton
              onClick={handleIncreaseCapacity}
            >
              <Plus
                size={17}
                className="mr-2"
              />
              Increase Capacity
            </NeonButton>

            <NeonButton
              onClick={handleMarkReady}
            >
              <CheckCircle
                size={17}
                className="mr-2"
              />
              Mark Ready
            </NeonButton>

          </div>

          {message && (
            <div className="mt-4 rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/5 px-4 py-3">

              <p className="text-sm text-[#00D4FF]">
                {message}
              </p>

            </div>
          )}

        </GlassCard>

      </div>
    </AppShell>
  );
}

/* =========================
   CAPACITY METRIC
========================= */

function CapacityMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <GlassCard>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
        {icon}
      </div>

      <p className="mt-4 text-xs uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold text-white">
        {value}
      </p>

    </GlassCard>
  );
}

/* =========================
   BREAKDOWN
========================= */

function Breakdown({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#00B8E6]/20 bg-[#081321]/50 px-4 py-3">

      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-lg font-bold text-white">
        {value}
      </span>

    </div>
  );
}