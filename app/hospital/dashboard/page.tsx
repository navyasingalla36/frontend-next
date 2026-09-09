"use client";

import {
  Activity,
  AlertTriangle,
  Bed,
  Droplets,
  Package,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";

import hospitals from "@/data/hospitals.json";
import hospitalStatus from "@/data/hospital-status.json";
import hospitalResources from "@/data/hospital-resources.json";
import incomingPatients from "@/data/incoming-patients.json";

export default function HospitalDashboardPage() {
  const hospitalId =
    typeof window !== "undefined"
      ? localStorage.getItem("hospitalId") || "hosp-001"
      : "hosp-001";

  const hospital =
    hospitals.find((item) => item.id === hospitalId) ||
    hospitals[0];

  const status =
    hospitalStatus.find(
      (item) => item.hospital_id === hospital.id
    ) || hospitalStatus[0];

  const resourceData =
    hospitalResources.find(
      (item) => item.hospital_id === hospital.id
    ) || hospitalResources[0];

  const totalIncoming = incomingPatients.reduce(
    (sum, item) => sum + item.patients,
    0
  );

  const projectedBeds =
    status.available_beds - totalIncoming;

  const occupancyPercentage = Math.round(
    (status.occupied_beds / status.total_beds) * 100
  );

  const bedAvailabilityPercentage = Math.round(
    (status.available_beds / status.total_beds) * 100
  );

  const resources = resourceData.resources;

  const resourceValues = [
    resources.oxygen,
    resources.ventilators,
    resources.medical_kits,
    resources.blood_units,
  ];

  const resourceReadiness = Math.round(
    resourceValues.reduce((a, b) => a + b, 0) /
      resourceValues.length
  );

  let actionTitle = "Hospital operating normally";
  let actionMessage =
    "Hospital is currently prepared for the predicted emergency load.";

  if (projectedBeds <= 0) {
    actionTitle = "Capacity overflow risk";
    actionMessage =
      "Immediate capacity action required. Predicted incoming patients may exceed available beds.";
  } else if (projectedBeds <= 15) {
    actionTitle = "Prepare for incoming emergency load";
    actionMessage =
      "High incoming load expected. Prepare emergency capacity and critical resources.";
  } else if (resourceReadiness < 60) {
    actionTitle = "Review emergency resources";
    actionMessage =
      "Resource readiness is low. Review emergency medical supplies.";
  }

  return (
    <AppShell
      portal="hospital"
      title="Hospital Command Dashboard"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]">
            HOSPITAL OPERATIONS
          </p>

          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">
                {hospital.hospital_name}
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                {hospital.district} District • Emergency Operations
              </p>
            </div>

            <div
              className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                status.readiness_status === "Ready"
                  ? "border-[#2ECC71]/40 bg-[#2ECC71]/10 text-[#2ECC71]"
                  : status.readiness_status === "Warning"
                  ? "border-[#FFD43B]/40 bg-[#FFD43B]/10 text-[#FFD43B]"
                  : "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF4D4D]"
              }`}
            >
              <ShieldCheck size={17} />
              {status.readiness_status}
            </div>
          </div>
        </div>

        {/* ACTION REQUIRED */}
        <GlassCard className="border-[#00B8E6]/30 p-5">
          <div className="flex gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                projectedBeds <= 0
                  ? "bg-[#FF4D4D]/10 text-[#FF4D4D]"
                  : projectedBeds <= 15
                  ? "bg-[#FFD43B]/10 text-[#FFD43B]"
                  : "bg-[#2ECC71]/10 text-[#2ECC71]"
              }`}
            >
              {projectedBeds <= 15 ? (
                <AlertTriangle size={22} />
              ) : (
                <Activity size={22} />
              )}
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                ACTION REQUIRED
              </p>

              <h2 className="mt-1 font-bold">
                {actionTitle}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {actionMessage}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* CURRENT SITUATION */}
        <section>
          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-slate-500">
            CURRENT SITUATION
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <GlassCard className="p-5">
              <Bed
                size={22}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-3xl font-bold">
                {status.available_beds}
              </p>

              <p className="text-sm text-slate-400">
                Available beds
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-[#00D4FF]"
                  style={{
                    width: `${bedAvailabilityPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {bedAvailabilityPercentage}% available
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Users
                size={22}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-3xl font-bold">
                {status.occupied_beds}
              </p>

              <p className="text-sm text-slate-400">
                Occupied beds
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-[#FFD43B]"
                  style={{
                    width: `${occupancyPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {occupancyPercentage}% occupancy
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Activity
                size={22}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-3xl font-bold">
                {status.icu_beds}
              </p>

              <p className="text-sm text-slate-400">
                ICU beds
              </p>

              <p className="mt-4 text-xs text-slate-500">
                Critical-care capacity
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Truck
                size={22}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-3xl font-bold">
                {status.emergency_capacity}
              </p>

              <p className="text-sm text-slate-400">
                Emergency capacity
              </p>

              <p className="mt-4 text-xs text-slate-500">
                Emergency intake capacity
              </p>
            </GlassCard>

          </div>
        </section>

        {/* CAPACITY FORECAST */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <Activity
              size={21}
              className="text-[#00D4FF]"
            />

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                CAPACITY FORECAST
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Projected hospital capacity
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">

            <div>
              <p className="text-xs text-slate-500">
                CURRENT AVAILABLE
              </p>

              <p className="mt-1 text-2xl font-bold">
                {status.available_beds}
              </p>

              <p className="text-xs text-slate-500">
                beds
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                PREDICTED INCOMING
              </p>

              <p className="mt-1 text-2xl font-bold text-[#FFD43B]">
                {totalIncoming}
              </p>

              <p className="text-xs text-slate-500">
                patients
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                PROJECTED REMAINING
              </p>

              <p
                className={`mt-1 text-2xl font-bold ${
                  projectedBeds <= 0
                    ? "text-[#FF4D4D]"
                    : projectedBeds <= 15
                    ? "text-[#FFD43B]"
                    : "text-[#2ECC71]"
                }`}
              >
                {projectedBeds}
              </p>

              <p className="text-xs text-slate-500">
                beds after forecast
              </p>
            </div>

          </div>
        </GlassCard>

        {/* INCOMING EMERGENCY LOAD */}
        <section>
          <div className="mb-3">
            <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
              INCOMING EMERGENCY LOAD
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Predicted patients
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {incomingPatients.map((item) => (
              <GlassCard
                key={item.location}
                className="p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold">
                      {item.location}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      ETA {item.eta}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      item.severity === "High"
                        ? "bg-[#FF4D4D]/10 text-[#FF4D4D]"
                        : "bg-[#FFD43B]/10 text-[#FFD43B]"
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>

                <p className="mt-5 text-3xl font-bold">
                  {item.patients}
                </p>

                <p className="text-xs text-slate-500">
                  predicted patients
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* RESOURCE READINESS */}
        <section>
          <div className="mb-3">
            <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
              RESOURCE READINESS
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Emergency resource status
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <GlassCard className="p-5">
              <Droplets
                size={21}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-2xl font-bold">
                {resources.oxygen}%
              </p>

              <p className="text-sm text-slate-400">
                Oxygen
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Activity
                size={21}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-2xl font-bold">
                {resources.ventilators}
              </p>

              <p className="text-sm text-slate-400">
                Ventilators
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Package
                size={21}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-2xl font-bold">
                {resources.medical_kits}%
              </p>

              <p className="text-sm text-slate-400">
                Medical kits
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <ShieldCheck
                size={21}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-2xl font-bold">
                {resources.blood_units}
              </p>

              <p className="text-sm text-slate-400">
                Blood units
              </p>
            </GlassCard>

          </div>
        </section>

        {/* SYSTEM SUMMARY */}
        <GlassCard className="p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                SYSTEM SUMMARY
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Current hospital status, capacity forecast,
                incoming emergency load, and resource readiness.
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-[#00B8E6]/20 bg-[#0B1F36] px-4 py-3">
              <p className="text-xs text-slate-500">
                READINESS SCORE
              </p>

              <p
                className={`mt-1 text-xl font-bold ${
                  resourceReadiness >= 70
                    ? "text-[#2ECC71]"
                    : resourceReadiness >= 50
                    ? "text-[#FFD43B]"
                    : "text-[#FF4D4D]"
                }`}
              >
                {resourceReadiness}%
              </p>
            </div>
          </div>
        </GlassCard>

      </div>
    </AppShell>
  );
}