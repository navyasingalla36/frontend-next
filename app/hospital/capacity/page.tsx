"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Bed,
  CheckCircle2,
  Clock3,
  Save,
  ShieldCheck,
  Users,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";

import hospitals from "@/data/hospitals.json";
import hospitalStatus from "@/data/hospital-status.json";

type ReadinessStatus = "Ready" | "Warning" | "Critical";

export default function HospitalCapacityPage() {
  const [hospitalId, setHospitalId] = useState("hosp-001");
  const [availableBeds, setAvailableBeds] = useState(42);
  const [emergencyCapacity, setEmergencyCapacity] = useState(18);
  const [readiness, setReadiness] =
    useState<ReadinessStatus>("Ready");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedId =
      localStorage.getItem("hospitalId") || "hosp-001";

    setHospitalId(storedId);

    const storedUpdate = localStorage.getItem(
      `hospitalCapacity_${storedId}`
    );

    if (storedUpdate) {
      const parsed = JSON.parse(storedUpdate);

      setAvailableBeds(parsed.availableBeds);
      setEmergencyCapacity(parsed.emergencyCapacity);
      setReadiness(parsed.readiness);
      return;
    }

    const hospitalStatusData =
      hospitalStatus.find(
        (item) => item.hospital_id === storedId
      ) || hospitalStatus[0];

    setAvailableBeds(hospitalStatusData.available_beds);
    setEmergencyCapacity(
      hospitalStatusData.emergency_capacity
    );
    setReadiness(
      hospitalStatusData.readiness_status as ReadinessStatus
    );
  }, []);

  const hospital =
    hospitals.find((item) => item.id === hospitalId) ||
    hospitals[0];

  const status =
    hospitalStatus.find(
      (item) => item.hospital_id === hospitalId
    ) || hospitalStatus[0];

  const occupiedBeds =
    status.total_beds - availableBeds;

  const occupancyPercentage =
    status.total_beds > 0
      ? Math.round(
          (occupiedBeds / status.total_beds) * 100
        )
      : 0;

  const availabilityPercentage =
    status.total_beds > 0
      ? Math.round(
          (availableBeds / status.total_beds) * 100
        )
      : 0;

  const handleSave = () => {
    localStorage.setItem(
      `hospitalCapacity_${hospitalId}`,
      JSON.stringify({
        availableBeds,
        emergencyCapacity,
        readiness,
        updatedAt: new Date().toLocaleString(),
      })
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <AppShell
      portal="hospital"
      title="Capacity Management"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]">
            HOSPITAL OPERATIONS
          </p>

          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Capacity Management
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Update the current operational capacity of{" "}
            {hospital.hospital_name}.
          </p>
        </div>

        {/* CURRENT STATUS */}
        <GlassCard className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                CURRENT HOSPITAL
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {hospital.hospital_name}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {hospital.district} District
              </p>
            </div>

            <div
              className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                readiness === "Ready"
                  ? "border-[#2ECC71]/40 bg-[#2ECC71]/10 text-[#2ECC71]"
                  : readiness === "Warning"
                  ? "border-[#FFD43B]/40 bg-[#FFD43B]/10 text-[#FFD43B]"
                  : "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF4D4D]"
              }`}
            >
              <ShieldCheck size={17} />
              {readiness}
            </div>

          </div>
        </GlassCard>

        {/* CURRENT CAPACITY */}
        <section>
          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-slate-500">
            CURRENT CAPACITY
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <GlassCard className="p-5">
              <Bed
                size={22}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-3xl font-bold">
                {status.total_beds}
              </p>

              <p className="text-sm text-slate-400">
                Total beds
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Hospital bed capacity
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Users
                size={22}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-3xl font-bold">
                {occupiedBeds}
              </p>

              <p className="text-sm text-slate-400">
                Occupied beds
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Currently occupied
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

              <p className="mt-3 text-xs text-slate-500">
                Critical-care capacity
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Clock3
                size={22}
                className="text-[#00D4FF]"
              />

              <p className="mt-4 text-3xl font-bold">
                {emergencyCapacity}
              </p>

              <p className="text-sm text-slate-400">
                Emergency capacity
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Emergency intake
              </p>
            </GlassCard>

          </div>
        </section>

        {/* CAPACITY UTILIZATION */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <Activity
              size={21}
              className="text-[#00D4FF]"
            />

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                CAPACITY UTILIZATION
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Current bed utilization
              </h2>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold">
                {occupancyPercentage}%
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {occupiedBeds} occupied / {status.total_beds} total
              </p>
            </div>

            <p className="text-sm font-semibold text-[#00D4FF]">
              {availableBeds} available
            </p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full ${
                occupancyPercentage >= 90
                  ? "bg-[#FF4D4D]"
                  : occupancyPercentage >= 75
                  ? "bg-[#FFD43B]"
                  : "bg-[#2ECC71]"
              }`}
              style={{
                width: `${Math.min(
                  occupancyPercentage,
                  100
                )}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </GlassCard>

        {/* UPDATE CAPACITY */}
        <section>
          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-slate-500">
            UPDATE OPERATIONAL CAPACITY
          </p>

          <GlassCard className="p-5">
            <div className="grid gap-6 md:grid-cols-2">

              {/* AVAILABLE BEDS */}
              <div>
                <label
                  htmlFor="availableBeds"
                  className="text-sm font-semibold"
                >
                  Available Beds
                </label>

                <p className="mt-1 text-xs text-slate-500">
                  Number of beds currently available for new patients.
                </p>

                <input
                  id="availableBeds"
                  type="number"
                  min="0"
                  max={status.total_beds}
                  value={availableBeds}
                  onChange={(event) => {
                    setAvailableBeds(
                      Math.max(
                        0,
                        Math.min(
                          status.total_beds,
                          Number(event.target.value)
                        )
                      )
                    );
                  }}
                  className="mt-4 w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-white outline-none transition focus:border-[#00D4FF]"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Maximum: {status.total_beds} beds
                </p>
              </div>

              {/* EMERGENCY CAPACITY */}
              <div>
                <label
                  htmlFor="emergencyCapacity"
                  className="text-sm font-semibold"
                >
                  Emergency Capacity
                </label>

                <p className="mt-1 text-xs text-slate-500">
                  Number of emergency patients that can be handled.
                </p>

                <input
                  id="emergencyCapacity"
                  type="number"
                  min="0"
                  value={emergencyCapacity}
                  onChange={(event) => {
                    setEmergencyCapacity(
                      Math.max(
                        0,
                        Number(event.target.value)
                      )
                    );
                  }}
                  className="mt-4 w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-white outline-none transition focus:border-[#00D4FF]"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Update when emergency intake capability changes.
                </p>
              </div>

            </div>

            {/* READINESS */}
            <div className="mt-6 border-t border-[#00B8E6]/15 pt-6">
              <label className="text-sm font-semibold">
                Readiness Status
              </label>

              <p className="mt-1 text-xs text-slate-500">
                Set the hospital's current operational readiness.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">

                <button
                  type="button"
                  onClick={() => setReadiness("Ready")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    readiness === "Ready"
                      ? "border-[#2ECC71] bg-[#2ECC71]/10 text-[#2ECC71]"
                      : "border-[#00B8E6]/20 bg-[#081321] text-slate-400"
                  }`}
                >
                  Ready
                </button>

                <button
                  type="button"
                  onClick={() => setReadiness("Warning")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    readiness === "Warning"
                      ? "border-[#FFD43B] bg-[#FFD43B]/10 text-[#FFD43B]"
                      : "border-[#00B8E6]/20 bg-[#081321] text-slate-400"
                  }`}
                >
                  Warning
                </button>

                <button
                  type="button"
                  onClick={() => setReadiness("Critical")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    readiness === "Critical"
                      ? "border-[#FF4D4D] bg-[#FF4D4D]/10 text-[#FF4D4D]"
                      : "border-[#00B8E6]/20 bg-[#081321] text-slate-400"
                  }`}
                >
                  Critical
                </button>

              </div>
            </div>

            {/* SAVE */}
            <div className="mt-6 flex flex-col gap-3 border-t border-[#00B8E6]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock3 size={14} />
                Capacity updates are stored locally in this prototype.
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#00D4FF] bg-[#00D4FF]/10 px-5 py-3 text-sm font-bold text-[#00D4FF] transition hover:bg-[#00D4FF]/20"
              >
                {saved ? (
                  <>
                    <CheckCircle2 size={18} />
                    Updated
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Capacity Update
                  </>
                )}
              </button>

            </div>
          </GlassCard>
        </section>

        {/* INFORMATION */}
        <GlassCard className="p-5">
          <div className="flex gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-[#00D4FF]"
            />

            <div>
              <p className="font-semibold">
                Operational update
              </p>

              <p className="mt-1 text-sm text-slate-400">
                These values represent the hospital's current
                operational state. In the final system, updates
                will be synchronized with the central disaster
                management platform and used for hospital
                resource allocation and emergency optimization.
              </p>
            </div>
          </div>
        </GlassCard>

      </div>
    </AppShell>
  );
}