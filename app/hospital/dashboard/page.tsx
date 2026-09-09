"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bed,
  HeartPulse,
  Ambulance,
  Package,
  Activity,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";
import StatusBadge from "@/components/StatusBadge";
import EmergencyActionCenter from "@/components/hospital/EmergencyActionCenter";

import hospitals from "@/data/hospitals.json";
import hospitalStatus from "@/data/hospital-status.json";
import hospitalResources from "@/data/hospital-resources.json";
import incomingPatients from "@/data/incoming-patients.json";

export default function HospitalDashboardPage() {
  const router = useRouter();

  const [hospitalId, setHospitalId] = useState<string | null>(null);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const savedId = localStorage.getItem("hospitalId");

    if (!savedId) {
      router.replace("/hospital/login");
      return;
    }

    setHospitalId(savedId);
    setCheckingLogin(false);
  }, [router]);

  if (checkingLogin || !hospitalId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#081321] text-white">
        <p className="text-sm text-slate-400">
          Loading Hospital Dashboard...
        </p>
      </main>
    );
  }

  const hospital = hospitals.find(
    (item) => item.id === hospitalId
  );

  const statusData = hospitalStatus.find(
    (item) => item.hospital_id === hospitalId
  );

  const resourceData = hospitalResources.find(
    (item) => item.hospital_id === hospitalId
  );

  if (!hospital || !statusData || !resourceData) {
    return (
      <AppShell
        portal="hospital"
        title="Hospital Dashboard"
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
  const resources = resourceData.resources;

  const totalIncoming = incomingPatients.reduce(
    (total, item) => total + item.patients,
    0
  );

  const bedAvailability = Math.round(
    (status.available_beds / status.total_beds) * 100
  );

  const occupancy = Math.round(
    (status.occupied_beds / status.total_beds) * 100
  );

  const readinessScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        bedAvailability * 0.4 +
        Math.min(status.emergency_capacity * 4, 100) * 0.3 +
        ((resources.oxygen +
          resources.ventilators * 10 +
          resources.medical_kits +
          resources.blood_units) /
          4) *
          0.3
      )
    )
  );

  return (
    <AppShell
      portal="hospital"
      title="Hospital Dashboard"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <GlassCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#00D4FF]">
                Hospital Emergency Operations
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {hospital.hospital_name}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {hospital.district} District
              </p>
            </div>

            <StatusBadge status={status.readiness_status} />

          </div>
        </GlassCard>

        {/* KEY METRICS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Metric
            icon={<Bed size={21} />}
            label="Available Beds"
            value={status.available_beds}
            subtitle={`of ${status.total_beds} total`}
          />

          <Metric
            icon={<HeartPulse size={21} />}
            label="ICU Beds"
            value={status.icu_beds}
            subtitle="Critical care capacity"
          />

          <Metric
            icon={<ShieldCheck size={21} />}
            label="Emergency Capacity"
            value={status.emergency_capacity}
            subtitle="Emergency-ready beds"
          />

          <Metric
            icon={<Ambulance size={21} />}
            label="Incoming Patients"
            value={totalIncoming}
            subtitle="Predicted arrivals"
          />

        </div>

        {/* READINESS + BED STATUS */}
        <div className="grid gap-6 lg:grid-cols-2">

          <GlassCard>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2ECC71]/30 bg-[#2ECC71]/10 text-[#2ECC71]">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Emergency Readiness
                </h3>

                <p className="text-sm text-slate-400">
                  Overall hospital preparedness
                </p>
              </div>

            </div>

            <div className="mt-6 flex items-end gap-2">

              <span className="text-5xl font-bold text-white">
                {readinessScore}
              </span>

              <span className="mb-2 text-lg text-slate-500">
                /100
              </span>

            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#081321]">

              <div
                className="h-full rounded-full bg-[#2ECC71]"
                style={{
                  width: `${readinessScore}%`,
                }}
              />

            </div>

            <p className="mt-3 text-sm text-[#2ECC71]">
              {readinessScore >= 80
                ? "Hospital prepared for emergency surge"
                : readinessScore >= 60
                ? "Hospital requires additional preparation"
                : "Critical preparation required"}
            </p>

          </GlassCard>

          <GlassCard>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                <Bed size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Bed Availability
                </h3>

                <p className="text-sm text-slate-400">
                  Current occupancy status
                </p>
              </div>

            </div>

            <div className="mt-6 flex justify-between">

              <span className="text-sm text-slate-400">
                Available
              </span>

              <span className="font-semibold text-white">
                {status.available_beds} / {status.total_beds}
              </span>

            </div>

            <div className="mt-3 h-4 overflow-hidden rounded-full bg-[#081321]">

              <div
                className="h-full rounded-full bg-[#00D4FF]"
                style={{
                  width: `${bedAvailability}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-xs">

              <span className="text-[#00D4FF]">
                {bedAvailability}% available
              </span>

              <span className="text-slate-500">
                {occupancy}% occupied
              </span>

            </div>

          </GlassCard>

        </div>

        {/* EMERGENCY ACTION CENTER */}
        <EmergencyActionCenter />

        {/* RESOURCES */}
        <GlassCard>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                <Package size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Resource Readiness
                </h3>

                <p className="text-sm text-slate-400">
                  Critical emergency resources
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                router.push("/hospital/resources")
              }
              className="flex items-center gap-1 text-xs font-semibold text-[#00D4FF]"
            >
              View all
              <ArrowRight size={14} />
            </button>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <Resource
              label="Oxygen"
              value={resources.oxygen}
            />

            <Resource
              label="Ventilators"
              value={resources.ventilators}
            />

            <Resource
              label="Medical Kits"
              value={resources.medical_kits}
            />

            <Resource
              label="Blood Units"
              value={resources.blood_units}
            />

          </div>

        </GlassCard>

        {/* INCOMING SUMMARY */}
        <GlassCard>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                <Activity size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Incoming Patient Forecast
                </h3>

                <p className="text-sm text-slate-400">
                  Predicted emergency arrivals
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                router.push("/hospital/incoming")
              }
              className="flex items-center gap-1 text-xs font-semibold text-[#00D4FF]"
            >
              View details
              <ArrowRight size={14} />
            </button>

          </div>

          <div className="mt-5 space-y-4">

            {incomingPatients.map((item) => {

              const progress = Math.min(
                item.patients * 7,
                100
              );

              return (
                <div
                  key={`${item.location}-${item.eta}`}
                  className="rounded-xl border border-[#00B8E6]/20 bg-[#081321]/50 p-4"
                >

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="font-semibold text-white">
                        {item.location}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        ETA {item.eta}
                      </p>
                    </div>

                    <p className="font-bold text-[#00D4FF]">
                      {item.patients}
                    </p>

                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#081321]">

                    <div
                      className="h-full rounded-full bg-[#00D4FF]"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </GlassCard>

      </div>
    </AppShell>
  );
}

/* =========================
   METRIC
========================= */

function Metric({
  icon,
  label,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  subtitle: string;
}) {
  return (
    <GlassCard>

      <div className="flex items-center justify-between">

        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <div className="text-[#00D4FF]">
          {icon}
        </div>

      </div>

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {subtitle}
      </p>

    </GlassCard>
  );
}

/* =========================
   RESOURCE
========================= */

function Resource({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const percentage = Math.min(value, 100);

  return (
    <div className="rounded-xl border border-[#00B8E6]/20 bg-[#081321]/50 p-4">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-400">
          {label}
        </p>

        <p className="font-bold text-white">
          {value}
        </p>

      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#081321]">

        <div
          className="h-full rounded-full bg-[#00D4FF]"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}