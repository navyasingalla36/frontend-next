"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bed,
  CheckCircle2,
  Hospital,
  MapPin,
  Package,
  ShieldAlert,
  Users,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";

import hospitals from "@/data/hospitals.json";
import hospitalStatus from "@/data/hospital-status.json";
import incomingPatients from "@/data/incoming-patients.json";

interface HospitalStatus {
  hospital_id: string;
  total_beds: number;
  available_beds: number;
  occupied_beds: number;
  icu_beds: number;
  emergency_capacity: number;
  readiness_status: string;
}

export default function HospitalCoordinationPage() {
  const [hospitalId, setHospitalId] = useState("hosp-001");

  useEffect(() => {
    const storedId =
      localStorage.getItem("hospitalId") || "hosp-001";

    setHospitalId(storedId);
  }, []);

  const currentHospital =
    hospitals.find((hospital) => hospital.id === hospitalId) ||
    hospitals[0];

  const currentStatus =
    (hospitalStatus as HospitalStatus[]).find(
      (status) => status.hospital_id === hospitalId
    ) || (hospitalStatus as HospitalStatus[])[0];

  const otherHospitals = (hospitalStatus as HospitalStatus[])
    .filter((status) => status.hospital_id !== hospitalId)
    .map((status) => {
      const hospital = hospitals.find(
        (item) => item.id === status.hospital_id
      );

      return {
        ...status,
        hospital_name:
          hospital?.hospital_name || "Hospital",
      };
    });

  const totalIncoming = incomingPatients.reduce(
    (sum, item) => sum + item.patients,
    0
  );

  const projectedRemaining = Math.max(
    currentStatus.available_beds - totalIncoming,
    0
  );

  const currentUtilization = Math.round(
    (currentStatus.occupied_beds /
      currentStatus.total_beds) *
      100
  );

  const projectedUtilization = Math.min(
    Math.round(
      ((currentStatus.occupied_beds + totalIncoming) /
        currentStatus.total_beds) *
        100
    ),
    100
  );

  const recommendedHospital = [...otherHospitals].sort(
    (a, b) => b.available_beds - a.available_beds
  )[0];

  const needsSupport = projectedRemaining <= 10;

  return (
    <AppShell
      portal="hospital"
      title="Hospital Coordination"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]">
            INTER-HOSPITAL COORDINATION
          </p>

          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Hospital Coordination
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Compare nearby hospital capacity and identify
            suitable emergency support options.
          </p>
        </div>

        {/* CURRENT HOSPITAL */}
        <GlassCard className="p-5">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
                <Hospital size={23} />
              </div>

              <div>
                <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                  CURRENT HOSPITAL
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {currentHospital.hospital_name}
                </h2>

                <p className="mt-1 flex items-center gap-1 text-sm text-slate-400">
                  <MapPin size={14} />
                  {currentHospital.district} District
                </p>
              </div>

            </div>

            <div
              className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                needsSupport
                  ? "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF4D4D]"
                  : "border-[#2ECC71]/40 bg-[#2ECC71]/10 text-[#2ECC71]"
              }`}
            >
              {needsSupport ? (
                <ShieldAlert size={17} />
              ) : (
                <CheckCircle2 size={17} />
              )}

              {needsSupport
                ? "Support Recommended"
                : "Capacity Stable"}
            </div>

          </div>

        </GlassCard>

        {/* CAPACITY OVERVIEW */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <GlassCard className="p-5">
            <p className="text-sm text-slate-400">
              Available Beds
            </p>

            <p className="mt-2 text-3xl font-bold">
              {currentStatus.available_beds}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <Bed size={14} />
              Current availability
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="text-sm text-slate-400">
              Incoming Patients
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalIncoming}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <Users size={14} />
              Predicted emergency load
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="text-sm text-slate-400">
              Projected Beds
            </p>

            <p
              className={`mt-2 text-3xl font-bold ${
                projectedRemaining <= 10
                  ? "text-[#FF4D4D]"
                  : "text-[#2ECC71]"
              }`}
            >
              {projectedRemaining}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <Activity size={14} />
              After incoming load
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="text-sm text-slate-400">
              Emergency Capacity
            </p>

            <p className="mt-2 text-3xl font-bold">
              {currentStatus.emergency_capacity}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldAlert size={14} />
              Emergency intake
            </div>
          </GlassCard>

        </div>

        {/* COORDINATION RECOMMENDATION */}
        <GlassCard className="border-[#00D4FF]/40 p-5">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
              <Activity size={23} />
            </div>

            <div className="flex-1">

              <p className="text-xs font-bold tracking-[0.15em] text-[#00D4FF]">
                COORDINATION RECOMMENDATION
              </p>

              <h2 className="mt-1 text-lg font-bold">
                {needsSupport
                  ? "Prepare inter-hospital support"
                  : "Maintain current allocation"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {needsSupport
                  ? `${currentHospital.hospital_name} may require additional support after the predicted incoming patient load. ${recommendedHospital?.hospital_name} currently has the highest available bed capacity among the nearby hospitals in this prototype.`
                  : `${currentHospital.hospital_name} currently has sufficient projected capacity. Nearby hospitals can still be monitored for changes in emergency demand.`}
              </p>

            </div>

          </div>

        </GlassCard>

        {/* HOSPITAL COMPARISON */}
        <section>

          <div className="mb-3">
            <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
              NEARBY HOSPITAL NETWORK
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Capacity comparison
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">

            {otherHospitals.map((hospital) => {

              const utilization = Math.round(
                (hospital.occupied_beds /
                  hospital.total_beds) *
                  100
              );

              const isRecommended =
                recommendedHospital?.hospital_id ===
                hospital.hospital_id;

              return (
                <GlassCard
                  key={hospital.hospital_id}
                  className={`p-5 ${
                    isRecommended
                      ? "border-[#00D4FF]/50"
                      : ""
                  }`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-xs font-bold tracking-[0.12em] text-slate-500">
                        NTR DISTRICT
                      </p>

                      <h3 className="mt-1 font-bold">
                        {hospital.hospital_name}
                      </h3>
                    </div>

                    {isRecommended && (
                      <span className="rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-bold text-[#00D4FF]">
                        BEST AVAILABLE
                      </span>
                    )}

                  </div>

                  {/* BED BAR */}
                  <div className="mt-5">

                    <div className="mb-2 flex justify-between text-xs">

                      <span className="text-slate-400">
                        Bed utilization
                      </span>

                      <span className="font-semibold">
                        {utilization}%
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#07101D]">

                      <div
                        className={`h-full rounded-full ${
                          utilization >= 85
                            ? "bg-[#FF4D4D]"
                            : utilization >= 70
                            ? "bg-[#FFD43B]"
                            : "bg-[#2ECC71]"
                        }`}
                        style={{
                          width: `${utilization}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* STATS */}
                  <div className="mt-5 grid grid-cols-3 gap-3">

                    <div className="rounded-xl bg-[#081321] p-3">
                      <p className="text-[10px] text-slate-500">
                        Total
                      </p>

                      <p className="mt-1 font-bold">
                        {hospital.total_beds}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#081321] p-3">
                      <p className="text-[10px] text-slate-500">
                        Available
                      </p>

                      <p className="mt-1 font-bold text-[#2ECC71]">
                        {hospital.available_beds}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#081321] p-3">
                      <p className="text-[10px] text-slate-500">
                        Emergency
                      </p>

                      <p className="mt-1 font-bold text-[#00D4FF]">
                        {hospital.emergency_capacity}
                      </p>
                    </div>

                  </div>

                </GlassCard>
              );
            })}

          </div>

        </section>

        {/* RESOURCE COORDINATION */}
        <GlassCard className="p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
              <Package size={20} />
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                RESOURCE COORDINATION
              </p>

              <h2 className="mt-1 font-bold">
                Emergency resource support
              </h2>
            </div>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl border border-[#00B8E6]/20 bg-[#081321] p-4">
              <p className="text-sm text-slate-400">
                Oxygen
              </p>

              <p className="mt-2 text-xl font-bold">
                Monitor
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Coordinate if demand increases
              </p>
            </div>

            <div className="rounded-xl border border-[#00B8E6]/20 bg-[#081321] p-4">
              <p className="text-sm text-slate-400">
                Medical Kits
              </p>

              <p className="mt-2 text-xl font-bold">
                Monitor
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Maintain emergency stock
              </p>
            </div>

            <div className="rounded-xl border border-[#00B8E6]/20 bg-[#081321] p-4">
              <p className="text-sm text-slate-400">
                Ambulance Support
              </p>

              <p className="mt-2 flex items-center gap-2 text-xl font-bold">
                Ready
                <ArrowRight
                  size={18}
                  className="text-[#00D4FF]"
                />
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Coordinate transfers when required
              </p>
            </div>

          </div>

        </GlassCard>

        {/* SYSTEM NOTE */}
        <GlassCard className="p-5">

          <div className="flex gap-3">

            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-[#2ECC71]"
            />

            <div>

              <p className="font-semibold">
                Prototype coordination engine
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                This prototype compares hospital capacity using
                locally stored mock data. In the integrated Q-Rescue
                system, the same workflow can use live hospital
                updates, emergency severity, distance, available
                resources and quantum-assisted optimization to
                recommend the best hospital for incoming patients.
              </p>

            </div>

          </div>

        </GlassCard>

      </div>
    </AppShell>
  );
}