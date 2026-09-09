"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bed,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";

import hospitals from "@/data/hospitals.json";
import hospitalStatus from "@/data/hospital-status.json";
import incomingPatients from "@/data/incoming-patients.json";

interface IncomingPatient {
  location: string;
  patients: number;
  eta: string;
  severity: string;
}

export default function IncomingPatientsPage() {
  const [hospitalId, setHospitalId] = useState("hosp-001");

  useEffect(() => {
    const storedId =
      localStorage.getItem("hospitalId") || "hosp-001";

    setHospitalId(storedId);
  }, []);

  const hospital =
    hospitals.find((item) => item.id === hospitalId) ||
    hospitals[0];

  const status =
    hospitalStatus.find(
      (item) => item.hospital_id === hospitalId
    ) || hospitalStatus[0];

  const incoming =
    incomingPatients as IncomingPatient[];

  const totalIncoming = incoming.reduce(
    (sum, item) => sum + item.patients,
    0
  );

  const projectedRemaining = Math.max(
    status.available_beds - totalIncoming,
    0
  );

  const capacityImpact =
    status.available_beds > 0
      ? Math.min(
          Math.round(
            (totalIncoming / status.available_beds) * 100
          ),
          100
        )
      : 100;

  const highestPriority =
    incoming.find((item) => item.severity === "High") ||
    incoming[0];

  return (
    <AppShell
      portal="hospital"
      title="Incoming Patients"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]">
            PREDICTIVE EMERGENCY LOAD
          </p>

          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Incoming Patients
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Predicted emergency arrivals for{" "}
            {hospital.hospital_name}.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Predicted Patients
              </p>

              <Users
                size={20}
                className="text-[#00D4FF]"
              />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {totalIncoming}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Expected incoming load
            </p>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Available Beds
              </p>

              <Bed
                size={20}
                className="text-[#2ECC71]"
              />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {status.available_beds}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Current availability
            </p>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Projected Beds
              </p>

              <Activity
                size={20}
                className="text-[#FFD43B]"
              />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {projectedRemaining}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              After predicted arrivals
            </p>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Capacity Impact
              </p>

              <AlertTriangle
                size={20}
                className={
                  capacityImpact >= 70
                    ? "text-[#FF4D4D]"
                    : "text-[#FFD43B]"
                }
              />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {capacityImpact}%
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Of available beds
            </p>
          </GlassCard>

        </div>

        {/* EMERGENCY PRIORITY */}
        <GlassCard className="border-[#FF4D4D]/40 p-5">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF4D4D]/10 text-[#FF4D4D]">
              <AlertTriangle size={23} />
            </div>

            <div className="flex-1">

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-xs font-bold tracking-[0.15em] text-[#FF4D4D]">
                    EMERGENCY PRIORITY
                  </p>

                  <h2 className="mt-1 text-lg font-bold">
                    {highestPriority.location}
                  </h2>
                </div>

                <span className="w-fit rounded-full border border-[#FF4D4D]/40 bg-[#FF4D4D]/10 px-3 py-1 text-xs font-bold text-[#FF4D4D]">
                  {highestPriority.severity}
                </span>

              </div>

              <p className="mt-2 text-sm text-slate-300">
                {highestPriority.patients} patients expected
                in {highestPriority.eta}.
              </p>

              <p className="mt-2 text-sm font-semibold text-[#FFD43B]">
                Prepare emergency intake immediately.
              </p>

            </div>

          </div>

        </GlassCard>

        {/* INCOMING FEED */}
        <section>

          <div className="mb-3">
            <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
              PREDICTED ARRIVALS
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Incoming emergency load
            </h2>
          </div>

          <div className="space-y-4">

            {incoming.map((item, index) => {

              const isHigh = item.severity === "High";

              return (
                <GlassCard
                  key={`${item.location}-${index}`}
                  className="p-5"
                >

                  <div className="flex flex-col gap-4 md:flex-row md:items-center">

                    {/* LOCATION */}
                    <div className="flex flex-1 items-center gap-4">

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          isHigh
                            ? "bg-[#FF4D4D]/10 text-[#FF4D4D]"
                            : "bg-[#00D4FF]/10 text-[#00D4FF]"
                        }`}
                      >
                        <MapPin size={20} />
                      </div>

                      <div>
                        <h3 className="font-bold">
                          {item.location}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Predicted emergency arrival
                        </p>
                      </div>

                    </div>

                    {/* PATIENTS */}
                    <div className="min-w-[120px]">

                      <p className="text-xs text-slate-500">
                        Patients
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <Users
                          size={16}
                          className="text-[#00D4FF]"
                        />

                        <span className="text-xl font-bold">
                          {item.patients}
                        </span>
                      </div>

                    </div>

                    {/* ETA */}
                    <div className="min-w-[120px]">

                      <p className="text-xs text-slate-500">
                        ETA
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <Clock3
                          size={16}
                          className="text-[#FFD43B]"
                        />

                        <span className="font-semibold">
                          {item.eta}
                        </span>
                      </div>

                    </div>

                    {/* SEVERITY */}
                    <div>

                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                          isHigh
                            ? "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF4D4D]"
                            : "border-[#FFD43B]/40 bg-[#FFD43B]/10 text-[#FFD43B]"
                        }`}
                      >
                        {item.severity}
                      </span>

                    </div>

                  </div>

                </GlassCard>
              );
            })}

          </div>

        </section>

        {/* BED IMPACT */}
        <GlassCard className="p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                BED AVAILABILITY IMPACT
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Projected capacity
              </h2>
            </div>

            <Bed
              size={21}
              className="text-[#00D4FF]"
            />

          </div>

          <div className="mt-5">

            <div className="mb-2 flex justify-between text-xs">
              <span className="text-slate-400">
                Current available
              </span>

              <span className="font-semibold">
                {status.available_beds} beds
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-[#07101D]">

              <div
                className="h-full rounded-full bg-[#00D4FF]"
                style={{
                  width: `${Math.max(
                    0,
                    100 - capacityImpact
                  )}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-xs">

              <span className="text-slate-500">
                Predicted incoming: {totalIncoming}
              </span>

              <span
                className={
                  projectedRemaining <= 10
                    ? "font-semibold text-[#FF4D4D]"
                    : "font-semibold text-[#2ECC71]"
                }
              >
                Projected remaining: {projectedRemaining}
              </span>

            </div>

          </div>

        </GlassCard>

        {/* INFORMATION */}
        <GlassCard className="p-5">

          <div className="flex gap-3">

            <Activity
              size={20}
              className="mt-0.5 shrink-0 text-[#00D4FF]"
            />

            <div>

              <p className="font-semibold">
                Prediction-only module
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                This page provides an early warning of expected
                patient arrivals so the hospital can prepare beds,
                emergency staff and medical resources in advance.
                Predictions are currently based on local mock data.
              </p>

            </div>

          </div>

        </GlassCard>

      </div>
    </AppShell>
  );
}