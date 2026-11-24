"use client";

import { useState } from "react";
import { ChevronRight, QrCode, Smartphone, MapPin, CloudUpload, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Session QR Created",
    shortText: "Teacher generates a signed QR code for the session.",
    detailTitle: "Ed25519 Cryptographic QR Generation",
    detailBody: "The teacher or class president initializes a class session on the web console or app. Polycheck generates a dynamic QR token containing session ID, timestamp, and a cryptographic signature. Expiry is set to 1-15 minutes to eliminate forwarding.",
    techBadge: "Ed25519 Signed",
    icon: QrCode,
  },
  {
    number: "02",
    title: "Mobile QR Scanning",
    shortText: "Student opens Polycheck & scans the QR in class.",
    detailTitle: "Hardware-Protected Camera Scanner",
    detailBody: "Students open the Polycheck native Android app. The camera captures the session token, decrypts the payload, and binds the request to the student's authenticated hardware device ID.",
    techBadge: "Native Camera",
    icon: Smartphone,
  },
  {
    number: "03",
    title: "Local GPS Validation",
    shortText: "Haversine checks GPS geofence locally on device.",
    detailTitle: "Zero-Latency Local Geofencing",
    detailBody: "Before sending any network request, Polycheck executes the Haversine formula locally using the device GPS coordinates to verify student proximity to the classroom geofence (30-50m radius).",
    techBadge: "Haversine Math",
    icon: MapPin,
  },
  {
    number: "04",
    title: "Real-Time Cloud Sync",
    shortText: "Attendance recorded and synced to cloud in real-time.",
    detailTitle: "WebSocket & Redis Cloud Journaling",
    detailBody: "The verified check-in payload is transmitted over a secure WebSocket channel to the NestJS backend and cached in Redis. The teacher's live dashboard updates instantly with green attendance checkmarks.",
    techBadge: "WebSocket + Redis",
    icon: CloudUpload,
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-maroon dark:bg-maroon-dark px-6 md:px-8 relative overflow-hidden"
    >
      {/* Background ambient grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" data-animate>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-golden mb-4">
            How It Works
          </p>
          <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            The attendance flow.
          </h2>
          <p className="text-sm md:text-base text-white/70">
            Click any step below to simulate the end-to-end cryptographic check-in pipeline.
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? "bg-white dark:bg-zinc-900 border-golden shadow-xl text-zinc-900 dark:text-white scale-[1.02]"
                    : "bg-maroon-dark/60 dark:bg-black/40 border-golden/20 hover:border-golden/40 text-white/80"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-lora font-bold text-xl ${isActive ? "text-maroon dark:text-golden" : "text-golden/60"}`}>
                    {step.number}
                  </span>
                  <step.icon className={`w-5 h-5 ${isActive ? "text-maroon dark:text-golden" : "text-white/40"}`} />
                </div>
                <div>
                  <h3 className={`font-dmSans font-bold text-sm mb-1 ${isActive ? "text-zinc-900 dark:text-white" : "text-white"}`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isActive ? "text-zinc-600 dark:text-zinc-400" : "text-white/60"}`}>
                    {step.shortText}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Simulation Box */}
        <div className="glass-card-maroon p-8 rounded-3xl border border-golden/30 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-golden text-maroon-dark rounded-full">
                Step {steps[activeStep].number} Demo
              </span>
              <span className="px-3 py-1 text-xs font-mono font-semibold bg-white/10 text-golden rounded-full border border-golden/20">
                {steps[activeStep].techBadge}
              </span>
            </div>

            <h3 className="font-lora font-bold text-2xl md:text-3xl text-golden">
              {steps[activeStep].detailTitle}
            </h3>

            <p className="text-sm md:text-base text-white/85 leading-relaxed font-dmSans">
              {steps[activeStep].detailBody}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Automated verification active · Zero manual entry</span>
            </div>
          </div>

          {/* Right Visual Console Display */}
          <div className="lg:col-span-5 bg-black/60 border border-golden/30 rounded-2xl p-5 font-mono text-xs text-golden/90 space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-white/40 border-b border-white/10 pb-2">
              <span>SIMULATOR CONSOLE</span>
              <span className="text-emerald-400">STATUS: OK</span>
            </div>
            <p className="text-white/60">&gt; Initializing Step {steps[activeStep].number}...</p>
            <p>&gt; Protocol: {steps[activeStep].techBadge}</p>
            <p className="text-emerald-400">&gt; [VERIFIED] Session Hash signed by Ed25519 private key.</p>
            <p className="text-white/40">&gt; Latency: 14ms</p>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-white/60 italic mt-10">
          * Works 100% offline inside classrooms. Automatically syncs when internet connectivity returns.
        </p>
      </div>
    </section>
  );
}
