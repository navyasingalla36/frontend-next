"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Bed,
  CheckCircle2,
  Clock3,
  Package,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";

import hospitals from "@/data/hospitals.json";
import hospitalStatus from "@/data/hospital-status.json";
import patientUpdates from "@/data/patient-updates.json";

interface UpdateRecord {
  type: string;
  title: string;
  description: string;
  time: string;
}

export default function HospitalUpdatesPage() {
  const [hospitalId, setHospitalId] = useState("hosp-001");

  const [updates, setUpdates] = useState<UpdateRecord[]>([]);

  useEffect(() => {
    const storedId =
      localStorage.getItem("hospitalId") || "hosp-001";

    setHospitalId(storedId);

    const hospitalUpdate =
      patientUpdates.find(
        (item) => item.hospital_id === storedId
      ) || patientUpdates[0];

    const storedCapacity = localStorage.getItem(
      `hospitalCapacity_${storedId}`
    );

    const storedResources = localStorage.getItem(
      `hospitalResources_${storedId}`
    );

    const generatedUpdates: UpdateRecord[] = [];

    generatedUpdates.push({
      type: "Patient Update",
      title: `${hospitalUpdate.patients_added} patients added`,
      description:
        "Latest patient intake update recorded by the hospital.",
      time: hospitalUpdate.last_updated,
    });

    generatedUpdates.push({
      type: "Patient Update",
      title: `${hospitalUpdate.patients_discharged} patients discharged`,
      description:
        "Latest patient discharge update recorded by the hospital.",
      time: hospitalUpdate.last_updated,
    });

    if (storedCapacity) {
      const capacity = JSON.parse(storedCapacity);

      generatedUpdates.push({
        type: "Capacity",
        title: "Capacity updated",
        description: `Available beds: ${capacity.availableBeds}. Emergency capacity: ${capacity.emergencyCapacity}. Readiness: ${capacity.readiness}.`,
        time: capacity.updatedAt,
      });
    }

    if (storedResources) {
      generatedUpdates.push({
        type: "Resources",
        title: "Resource inventory updated",
        description:
          "Emergency resource availability was updated by the hospital.",
        time: new Date().toLocaleString(),
      });
    }

    setUpdates(generatedUpdates);
  }, []);

  const hospital =
    hospitals.find((item) => item.id === hospitalId) ||
    hospitals[0];

  const status =
    hospitalStatus.find(
      (item) => item.hospital_id === hospitalId
    ) || hospitalStatus[0];

  return (
    <AppShell
      portal="hospital"
      title="Hospital Updates"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]">
            HOSPITAL OPERATIONS
          </p>

          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Update History
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Operational updates recorded for{" "}
            {hospital.hospital_name}.
          </p>
        </div>

        {/* CURRENT STATUS */}
        <GlassCard className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                CURRENT STATUS
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {hospital.hospital_name}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {hospital.district} District
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#2ECC71]/40 bg-[#2ECC71]/10 px-4 py-2 text-sm font-semibold text-[#2ECC71]">
              <ShieldCheck size={17} />
              {status.readiness_status}
            </div>

          </div>
        </GlassCard>

        {/* UPDATE TIMELINE */}
        <section>
          <div className="mb-3">
            <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
              OPERATIONAL TIMELINE
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Recent updates
            </h2>
          </div>

          <div className="space-y-4">

            {updates.map((update, index) => (
              <GlassCard
                key={`${update.type}-${index}`}
                className="p-5"
              >
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">

                    {update.type === "Capacity" ? (
                      <Bed size={20} />
                    ) : update.type === "Resources" ? (
                      <Package size={20} />
                    ) : (
                      <UserPlus size={20} />
                    )}

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <p className="text-[10px] font-bold tracking-[0.15em] text-[#00D4FF]">
                          {update.type.toUpperCase()}
                        </p>

                        <h3 className="mt-1 font-bold">
                          {update.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock3 size={13} />
                        {update.time}
                      </div>

                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      {update.description}
                    </p>

                  </div>
                </div>
              </GlassCard>
            ))}

          </div>
        </section>

        {/* UPDATE TYPES */}
        <section>
          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-slate-500">
            TRACKED OPERATIONS
          </p>

          <div className="grid gap-4 sm:grid-cols-3">

            <GlassCard className="p-5">
              <UserPlus
                size={21}
                className="text-[#00D4FF]"
              />

              <h3 className="mt-4 font-bold">
                Patient Updates
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Patients added and discharged.
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Bed
                size={21}
                className="text-[#00D4FF]"
              />

              <h3 className="mt-4 font-bold">
                Capacity Updates
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Bed and emergency capacity changes.
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <Package
                size={21}
                className="text-[#00D4FF]"
              />

              <h3 className="mt-4 font-bold">
                Resource Updates
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Emergency resource inventory changes.
              </p>
            </GlassCard>

          </div>
        </section>

        {/* PROTOTYPE NOTE */}
        <GlassCard className="p-5">
          <div className="flex gap-3">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-[#2ECC71]"
            />

            <div>
              <p className="font-semibold">
                Prototype update history
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Updates are currently stored locally for prototype
                demonstration. In the integrated system, these events
                will be synchronized with the central disaster
                management platform.
              </p>
            </div>
          </div>
        </GlassCard>

      </div>
    </AppShell>
  );
}