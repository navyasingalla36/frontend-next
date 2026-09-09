"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  UserMinus,
  Bed,
  Clock,
  Save,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";

import hospitals from "@/data/hospitals.json";
import hospitalStatus from "@/data/hospital-status.json";

interface HospitalUpdate {
  patientsAdded: number;
  patientsDischarged: number;
  bedsAvailable: number;
  lastUpdated: string;
}

export default function HospitalUpdatesPage() {
  const [hospitalId, setHospitalId] = useState("hosp-001");

  const [patientsAdded, setPatientsAdded] = useState("");
  const [patientsDischarged, setPatientsDischarged] = useState("");
  const [bedsAvailable, setBedsAvailable] = useState("");

  const [message, setMessage] = useState("");

  const [latestUpdate, setLatestUpdate] =
    useState<HospitalUpdate | null>(null);

  // Get logged-in hospital
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

  // Load previously saved update
  useEffect(() => {
    if (!hospitalId) return;

    const savedUpdate = localStorage.getItem(
      `hospitalUpdate-${hospitalId}`
    );

    if (savedUpdate) {
      try {
        setLatestUpdate(JSON.parse(savedUpdate));
      } catch {
        setLatestUpdate(null);
      }
    }
  }, [hospitalId]);

  // Check hospital data before using it
  if (!hospital || !statusData) {
    return (
      <AppShell
        portal="hospital"
        title="Hospital Updates"
      >
        <GlassCard>
          <p className="text-[#FF4D4D]">
            Hospital information not found.
          </p>
        </GlassCard>
      </AppShell>
    );
  }

  // From here onward TypeScript knows status exists
  const status = statusData;

  function handleSaveUpdate() {
    const added = Number(patientsAdded) || 0;

    const discharged =
      Number(patientsDischarged) || 0;

    const beds =
      bedsAvailable === ""
        ? status.available_beds
        : Number(bedsAvailable);

    // Validate values
    if (added < 0 || discharged < 0 || beds < 0) {
      setMessage(
        "Please enter valid positive values."
      );
      return;
    }

    // Beds cannot exceed total beds
    if (beds > status.total_beds) {
      setMessage(
        `Available beds cannot exceed ${status.total_beds}.`
      );
      return;
    }

    const update: HospitalUpdate = {
      patientsAdded: added,
      patientsDischarged: discharged,
      bedsAvailable: beds,
      lastUpdated: new Date().toLocaleString(
        "en-IN",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      ),
    };

    // Save mock update locally
    localStorage.setItem(
      `hospitalUpdate-${hospitalId}`,
      JSON.stringify(update)
    );

    // Display latest update
    setLatestUpdate(update);

    setMessage(
      "Hospital update saved successfully."
    );

    // Clear form
    setPatientsAdded("");
    setPatientsDischarged("");
    setBedsAvailable("");
  }

  return (
    <AppShell
      portal="hospital"
      title="Hospital Updates"
    >
      <div className="space-y-6">

        {/* =========================
            HEADER
        ========================= */}
        <GlassCard>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#00D4FF]">
            Operational Updates
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {hospital.hospital_name}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Update current emergency hospital conditions.
          </p>
        </GlassCard>

        {/* =========================
            UPDATE FORM
        ========================= */}
        <GlassCard>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
              <Users size={22} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Submit Hospital Update
              </h3>

              <p className="text-sm text-slate-400">
                Enter the latest patient and bed information.
              </p>
            </div>

          </div>

          {/* INPUT FIELDS */}
          <div className="mt-6 grid gap-5 sm:grid-cols-3">

            <InputField
              label="Patients Added"
              icon={<UserPlus size={18} />}
              value={patientsAdded}
              onChange={setPatientsAdded}
              placeholder="0"
            />

            <InputField
              label="Patients Discharged"
              icon={<UserMinus size={18} />}
              value={patientsDischarged}
              onChange={setPatientsDischarged}
              placeholder="0"
            />

            <InputField
              label="Beds Available"
              icon={<Bed size={18} />}
              value={bedsAvailable}
              onChange={setBedsAvailable}
              placeholder={String(status.available_beds)}
            />

          </div>

          {/* CURRENT VALUES */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <CurrentValue
              label="Current Beds"
              value={status.available_beds}
            />

            <CurrentValue
              label="Emergency Capacity"
              value={status.emergency_capacity}
            />

            <CurrentValue
              label="Total Beds"
              value={status.total_beds}
            />

          </div>

          {/* SAVE BUTTON */}
          <div className="mt-6">

            <NeonButton
              onClick={handleSaveUpdate}
              className="w-full sm:w-auto"
            >
              <Save
                size={17}
                className="mr-2"
              />
              Save Update
            </NeonButton>

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mt-4 rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/5 px-4 py-3">

              <p className="text-sm text-[#00D4FF]">
                {message}
              </p>

            </div>
          )}

        </GlassCard>

        {/* =========================
            LATEST UPDATE
        ========================= */}
        <GlassCard>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00B8E6]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                <Clock size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Latest Update
                </h3>

                <p className="text-sm text-slate-400">
                  Most recent information submitted by the hospital.
                </p>
              </div>

            </div>

          </div>

          {latestUpdate ? (

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <UpdateValue
                label="Patients Added"
                value={latestUpdate.patientsAdded}
              />

              <UpdateValue
                label="Patients Discharged"
                value={latestUpdate.patientsDischarged}
              />

              <UpdateValue
                label="Beds Available"
                value={latestUpdate.bedsAvailable}
              />

              {/* LAST UPDATED */}
              <div className="sm:col-span-3">

                <div className="rounded-xl border border-[#00B8E6]/20 bg-[#081321]/60 p-4">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Last Updated
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {latestUpdate.lastUpdated}
                  </p>

                </div>

              </div>

            </div>

          ) : (

            <div className="mt-5 rounded-xl border border-dashed border-[#00B8E6]/20 bg-[#081321]/40 p-6 text-center">

              <p className="text-sm text-slate-400">
                No manual update has been submitted yet.
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Submit an update above to display the latest hospital information.
              </p>

            </div>

          )}

        </GlassCard>

      </div>
    </AppShell>
  );
}

/* =========================
   INPUT FIELD
========================= */

function InputField({
  label,
  icon,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>

      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

        <span className="text-[#00D4FF]">
          {icon}
        </span>

        {label}

      </label>

      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#00B8E6]/30 bg-[#081321] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30"
      />

    </div>
  );
}

/* =========================
   CURRENT VALUE
========================= */

function CurrentValue({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[#00B8E6]/20 bg-[#081321]/50 p-3">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-white">
        {value}
      </p>

    </div>
  );
}

/* =========================
   UPDATE VALUE
========================= */

function UpdateValue({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[#00B8E6]/20 bg-[#081321]/60 p-4">

      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}