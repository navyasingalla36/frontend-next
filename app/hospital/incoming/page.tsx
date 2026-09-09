"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ambulance,
  Clock,
  Users,
  MapPin,
  Activity,
  AlertTriangle,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";
import StatusBadge from "@/components/StatusBadge";

import hospitals from "@/data/hospitals.json";
import incomingPatients from "@/data/incoming-patients.json";

export default function HospitalIncomingPage() {
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
          Loading Incoming Patient Predictions...
        </p>
      </main>
    );
  }

  const hospital = hospitals.find(
    (item) => item.id === hospitalId
  );

  if (!hospital) {
    return (
      <AppShell
        portal="hospital"
        title="Incoming Patients"
      >
        <GlassCard>
          <p className="text-[#FF4D4D]">
            Hospital information not found.
          </p>
        </GlassCard>
      </AppShell>
    );
  }

  const totalPatients = incomingPatients.reduce(
    (total, item) => total + item.patients,
    0
  );

  const highPriority = incomingPatients.filter(
    (item) => item.severity === "High"
  ).length;

  return (
    <AppShell
      portal="hospital"
      title="Incoming Patients"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <GlassCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#00D4FF]">
                Predictive Emergency Feed
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Incoming Patient Predictions
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {hospital.hospital_name} • NTR District
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
              <Ambulance size={25} />
            </div>

          </div>
        </GlassCard>

        {/* SUMMARY */}
        <div className="grid gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={<Users size={21} />}
            label="Predicted Patients"
            value={totalPatients}
            subtitle="Across monitored locations"
          />

          <SummaryCard
            icon={<MapPin size={21} />}
            label="Monitored Locations"
            value={incomingPatients.length}
            subtitle="Active prediction sources"
          />

          <SummaryCard
            icon={<AlertTriangle size={21} />}
            label="High Priority"
            value={highPriority}
            subtitle="Requires immediate attention"
          />

        </div>

        {/* PREDICTION STATUS */}
        <GlassCard>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
              <Activity size={22} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Live Prediction Queue
              </h3>

              <p className="text-sm text-slate-400">
                Estimated emergency arrivals requiring hospital preparation
              </p>
            </div>

          </div>

          <div className="mt-6 space-y-4">

            {incomingPatients.map((item) => {

              const urgency =
                item.severity === "High"
                  ? "border-[#FF4D4D]/40 bg-[#FF4D4D]/5"
                  : "border-[#00B8E6]/20 bg-[#081321]/60";

              const progress =
                Math.min(item.patients * 7, 100);

              return (
                <div
                  key={`${item.location}-${item.eta}`}
                  className={`rounded-2xl border p-5 ${urgency}`}
                >

                  {/* TOP ROW */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                        <MapPin size={19} />
                      </div>

                      <div>
                        <h4 className="font-semibold text-white">
                          {item.location}
                        </h4>

                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">

                          <span className="flex items-center gap-1">
                            <Clock size={13} />
                            ETA {item.eta}
                          </span>

                          <span className="flex items-center gap-1">
                            <Users size={13} />
                            {item.patients} patients
                          </span>

                        </div>
                      </div>

                    </div>

                    <StatusBadge status={item.severity} />

                  </div>

                  {/* PATIENT LOAD */}
                  <div className="mt-5">

                    <div className="mb-2 flex justify-between text-xs">

                      <span className="text-slate-500">
                        Expected patient load
                      </span>

                      <span className="font-semibold text-white">
                        {item.patients} patients
                      </span>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#081321]">

                      <div
                        className="h-full rounded-full bg-[#00D4FF] transition-all"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* PREPARATION MESSAGE */}
                  <div className="mt-4 rounded-xl border border-[#00B8E6]/15 bg-[#081321]/40 px-4 py-3">

                    <p className="text-xs text-slate-400">

                      <span className="font-semibold text-[#00D4FF]">
                        Preparation:
                      </span>{" "}

                      Prepare emergency capacity for{" "}
                      <span className="font-semibold text-white">
                        {item.patients}
                      </span>{" "}
                      incoming patients within{" "}
                      <span className="font-semibold text-white">
                        {item.eta}
                      </span>
                      .

                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </GlassCard>

        {/* OPERATIONAL NOTE */}
        <GlassCard>

          <div className="flex gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FFD43B]/30 bg-[#FFD43B]/10 text-[#FFD43B]">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Operational Recommendation
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Incoming patient predictions help hospital staff
                prepare beds, emergency capacity and critical
                resources before patients arrive.
              </p>
            </div>

          </div>

        </GlassCard>

      </div>
    </AppShell>
  );
}

/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
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

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {subtitle}
      </p>

    </GlassCard>
  );
}