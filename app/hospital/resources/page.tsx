"use client";

import { useEffect, useState } from "react";
import {
  Droplets,
  Wind,
  Stethoscope,
  Activity,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";
import StatusBadge from "@/components/StatusBadge";

import hospitals from "@/data/hospitals.json";
import hospitalResources from "@/data/hospital-resources.json";

export default function HospitalResourcesPage() {
  const [hospitalId, setHospitalId] = useState("hosp-001");

  useEffect(() => {
    const savedId = localStorage.getItem("hospitalId");

    if (savedId) {
      setHospitalId(savedId);
    }
  }, []);

  const hospital = hospitals.find(
    (item) => item.id === hospitalId
  );

  const resourceData = hospitalResources.find(
    (item) => item.hospital_id === hospitalId
  );

  if (!hospital || !resourceData) {
    return (
      <AppShell
        portal="hospital"
        title="Hospital Resources"
      >
        <GlassCard>
          <p className="text-[#FF4D4D]">
            Hospital resource information not found.
          </p>
        </GlassCard>
      </AppShell>
    );
  }

  const resources = [
    {
      name: "Oxygen",
      value: resourceData.resources.oxygen,
      icon: <Wind size={24} />,
      unit: "Availability",
    },
    {
      name: "Ventilators",
      value: resourceData.resources.ventilators,
      icon: <Activity size={24} />,
      unit: "Available Units",
    },
    {
      name: "Medical Kits",
      value: resourceData.resources.medical_kits,
      icon: <Stethoscope size={24} />,
      unit: "Availability",
    },
    {
      name: "Blood Units",
      value: resourceData.resources.blood_units,
      icon: <Droplets size={24} />,
      unit: "Available Units",
    },
  ];

  return (
    <AppShell
      portal="hospital"
      title="Hospital Resources"
    >
      <div className="space-y-6">

        {/* Header */}
        <GlassCard>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#00D4FF]">
            Resource Monitoring
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {hospital.hospital_name}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {hospital.district} District
          </p>
        </GlassCard>

        {/* Resource Cards */}
        <div className="grid gap-4 sm:grid-cols-2">

          {resources.map((resource) => (
            <ResourceCard
              key={resource.name}
              name={resource.name}
              value={resource.value}
              icon={resource.icon}
              unit={resource.unit}
            />
          ))}

        </div>

        {/* Emergency Resource Status */}
        <GlassCard>

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-lg font-semibold text-white">
                Emergency Resource Status
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Current availability of critical hospital resources.
              </p>
            </div>

            <StatusBadge status="Ready" />

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            {resources.map((resource) => (
              <div
                key={resource.name}
                className="rounded-xl border border-[#00B8E6]/20 bg-[#081321]/60 p-4"
              >
                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-300">
                    {resource.name}
                  </span>

                  <span className="font-semibold text-white">
                    {resource.value}
                  </span>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-[#00D4FF]"
                    style={{
                      width: `${Math.min(
                        100,
                        resource.value
                      )}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </GlassCard>

      </div>
    </AppShell>
  );
}

function ResourceCard({
  name,
  value,
  icon,
  unit,
}: {
  name: string;
  value: number;
  icon: React.ReactNode;
  unit: string;
}) {
  const isLow = value < 30;

  return (
    <GlassCard>

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {name}
            </h3>

            <p className="text-xs text-slate-500">
              {unit}
            </p>
          </div>

        </div>

        <span
          className={
            isLow
              ? "text-sm font-semibold text-[#FF4D4D]"
              : "text-sm font-semibold text-[#2ECC71]"
          }
        >
          {isLow ? "Low" : "Available"}
        </span>

      </div>

      <div className="mt-5">

        <div className="flex items-end justify-between">

          <p className="text-3xl font-bold text-white">
            {value}
          </p>

          <p className="text-xs text-slate-500">
            {name === "Ventilators" ||
            name === "Blood Units"
              ? "units"
              : "%"}
          </p>

        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-[#00D4FF] transition-all"
            style={{
              width: `${Math.min(100, value)}%`,
            }}
          />

        </div>

      </div>

    </GlassCard>
  );
}