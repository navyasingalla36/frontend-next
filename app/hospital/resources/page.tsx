"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Droplets,
  Package,
  Save,
  ShieldCheck,
  Syringe,
  Wind,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";

import hospitals from "@/data/hospitals.json";
import hospitalResources from "@/data/hospital-resources.json";

interface ResourceState {
  oxygen: number;
  ventilators: number;
  medical_kits: number;
  blood_units: number;
}

export default function HospitalResourcesPage() {
  const [hospitalId, setHospitalId] = useState("hosp-001");

  const [resources, setResources] =
    useState<ResourceState>({
      oxygen: 82,
      ventilators: 7,
      medical_kits: 85,
      blood_units: 34,
    });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedId =
      localStorage.getItem("hospitalId") || "hosp-001";

    setHospitalId(storedId);

    const storedResources = localStorage.getItem(
      `hospitalResources_${storedId}`
    );

    if (storedResources) {
      setResources(JSON.parse(storedResources));
      return;
    }

    const resourceData =
      hospitalResources.find(
        (item) => item.hospital_id === storedId
      ) || hospitalResources[0];

    setResources(resourceData.resources);
  }, []);

  const hospital =
    hospitals.find((item) => item.id === hospitalId) ||
    hospitals[0];

  const updateResource = (
    key: keyof ResourceState,
    value: number
  ) => {
    setResources((current) => ({
      ...current,
      [key]: Math.max(0, value),
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      `hospitalResources_${hospitalId}`,
      JSON.stringify(resources)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const getStatus = (value: number) => {
    if (value >= 70) {
      return {
        label: "Ready",
        className:
          "border-[#2ECC71]/40 bg-[#2ECC71]/10 text-[#2ECC71]",
      };
    }

    if (value >= 40) {
      return {
        label: "Monitor",
        className:
          "border-[#FFD43B]/40 bg-[#FFD43B]/10 text-[#FFD43B]",
      };
    }

    return {
      label: "Critical",
      className:
        "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF4D4D]",
    };
  };

  return (
    <AppShell
      portal="hospital"
      title="Resource Management"
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]">
            HOSPITAL OPERATIONS
          </p>

          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Resource Management
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Monitor and update emergency resources at{" "}
            {hospital.hospital_name}.
          </p>
        </div>

        {/* RESOURCE OVERVIEW */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={21}
              className="text-[#00D4FF]"
            />

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-slate-500">
                RESOURCE READINESS
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Emergency resource inventory
              </h2>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Update resource availability as supplies are consumed,
            replenished, transferred, or received.
          </p>
        </GlassCard>

        {/* RESOURCE CARDS */}
        <section>
          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-slate-500">
            CURRENT RESOURCES
          </p>

          <div className="grid gap-4 md:grid-cols-2">

            {/* OXYGEN */}
            <GlassCard className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
                    <Wind size={21} />
                  </div>

                  <div>
                    <h2 className="font-bold">
                      Oxygen
                    </h2>

                    <p className="text-xs text-slate-500">
                      Current availability
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-bold ${
                    getStatus(resources.oxygen).className
                  }`}
                >
                  {getStatus(resources.oxygen).label}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={resources.oxygen}
                  onChange={(event) =>
                    updateResource(
                      "oxygen",
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-white outline-none focus:border-[#00D4FF]"
                />

                <span className="font-bold text-slate-400">
                  %
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    resources.oxygen >= 70
                      ? "bg-[#2ECC71]"
                      : resources.oxygen >= 40
                      ? "bg-[#FFD43B]"
                      : "bg-[#FF4D4D]"
                  }`}
                  style={{
                    width: `${Math.min(
                      resources.oxygen,
                      100
                    )}%`,
                  }}
                />
              </div>
            </GlassCard>

            {/* VENTILATORS */}
            <GlassCard className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
                    <Activity size={21} />
                  </div>

                  <div>
                    <h2 className="font-bold">
                      Ventilators
                    </h2>

                    <p className="text-xs text-slate-500">
                      Available units
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-bold ${
                    getStatus(
                      resources.ventilators * 10
                    ).className
                  }`}
                >
                  {
                    getStatus(
                      resources.ventilators * 10
                    ).label
                  }
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  value={resources.ventilators}
                  onChange={(event) =>
                    updateResource(
                      "ventilators",
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-white outline-none focus:border-[#00D4FF]"
                />

                <span className="font-bold text-slate-400">
                  units
                </span>
              </div>
            </GlassCard>

            {/* MEDICAL KITS */}
            <GlassCard className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
                    <Package size={21} />
                  </div>

                  <div>
                    <h2 className="font-bold">
                      Medical Kits
                    </h2>

                    <p className="text-xs text-slate-500">
                      Inventory readiness
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-bold ${
                    getStatus(
                      resources.medical_kits
                    ).className
                  }`}
                >
                  {
                    getStatus(
                      resources.medical_kits
                    ).label
                  }
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={resources.medical_kits}
                  onChange={(event) =>
                    updateResource(
                      "medical_kits",
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-white outline-none focus:border-[#00D4FF]"
                />

                <span className="font-bold text-slate-400">
                  %
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    resources.medical_kits >= 70
                      ? "bg-[#2ECC71]"
                      : resources.medical_kits >= 40
                      ? "bg-[#FFD43B]"
                      : "bg-[#FF4D4D]"
                  }`}
                  style={{
                    width: `${Math.min(
                      resources.medical_kits,
                      100
                    )}%`,
                  }}
                />
              </div>
            </GlassCard>

            {/* BLOOD */}
            <GlassCard className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
                    <Syringe size={21} />
                  </div>

                  <div>
                    <h2 className="font-bold">
                      Blood Units
                    </h2>

                    <p className="text-xs text-slate-500">
                      Available units
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-bold ${
                    getStatus(
                      resources.blood_units * 2
                    ).className
                  }`}
                >
                  {
                    getStatus(
                      resources.blood_units * 2
                    ).label
                  }
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  value={resources.blood_units}
                  onChange={(event) =>
                    updateResource(
                      "blood_units",
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-white outline-none focus:border-[#00D4FF]"
                />

                <span className="font-bold text-slate-400">
                  units
                </span>
              </div>
            </GlassCard>

          </div>
        </section>

        {/* SAVE */}
        <GlassCard className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="font-semibold">
                Update resource status
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Changes are stored locally in this prototype.
                Final synchronization will occur through the central
                disaster management system.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#00D4FF] bg-[#00D4FF]/10 px-5 py-3 text-sm font-bold text-[#00D4FF] transition hover:bg-[#00D4FF]/20"
            >
              {saved ? (
                <>
                  <ShieldCheck size={18} />
                  Resources Updated
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Resource Update
                </>
              )}
            </button>

          </div>
        </GlassCard>

      </div>
    </AppShell>
  );
}