"use client";

import { useState } from "react";
import {
  QrCode,
  MapPin,
  WifiOff,
  Shield,
  Smartphone,
  Calendar,
  BarChart3,
  Users,
  Camera,
  AlertTriangle,
  RefreshCw,
  Lock,
  Grid,
} from "lucide-react";

interface Feature {
  icon: any;
  title: string;
  description: string;
  category: "security" | "mobile" | "faculty";
  tag: string;
}

const features: Feature[] = [
  {
    icon: QrCode,
    title: "Cryptographic QR Codes",
    description:
      "Every QR token is Ed25519-signed, unique per session, and expires in 1–15 minutes. No screenshots, no replays.",
    category: "security",
    tag: "Ed25519 Signed",
  },
  {
    icon: MapPin,
    title: "GPS Geofencing",
    description:
      "Circular geofence (30–50m radius) verified locally on the student's device and re-validated server-side. No GPS spoofing.",
    category: "security",
    tag: "Haversine Engine",
  },
  {
    icon: WifiOff,
    title: "Offline-First",
    description:
      "Every critical in-class action works without internet. Attendance syncs when connectivity returns. No classroom left behind.",
    category: "mobile",
    tag: "Local SQLite",
  },
  {
    icon: Shield,
    title: "Anti-Cheat System",
    description:
      "Multi-layer defense: signed tokens, geolocation check, single active session, duplicate rejection, clock-drift prevention.",
    category: "security",
    tag: "Zero Proxy",
  },
  {
    icon: Smartphone,
    title: "Digital Student ID",
    description:
      "Flippable PUP ID card with photo, student number, program, and QR. Bound to device. Cannot be screenshotted for proxy use.",
    category: "mobile",
    tag: "Device Bound",
  },
  {
    icon: Calendar,
    title: "Schedule Management",
    description:
      "Full calendar views (month/week) for both faculty and students. Recurring session creation with bulk scheduling.",
    category: "faculty",
    tag: "Bulk Planner",
  },
  {
    icon: BarChart3,
    title: "Attendance Analytics",
    description:
      "Real-time dashboards with donut charts, attendance rates, per-student and per-session breakdowns. CSV export.",
    category: "faculty",
    tag: "Live Export",
  },
  {
    icon: Users,
    title: "Student Officers",
    description:
      "Presidents create sessions. QAC members upload proof-of-class photos. Peer-led session management with granular permissions.",
    category: "faculty",
    tag: "Role RBAC",
  },
  {
    icon: Camera,
    title: "Proof of Class",
    description:
      "Timestamped classroom photos uploaded during sessions. Serves as audit verification that a class meeting occurred.",
    category: "faculty",
    tag: "Audit Verification",
  },
  {
    icon: AlertTriangle,
    title: "Dispute System",
    description:
      "Students flag issues. Teachers review with Accept, Reject, or Override. Full audit trail with dispute reasons and resolution history.",
    category: "faculty",
    tag: "Audit Trail",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Sync",
    description:
      "WebSocket-powered live updates. Teachers see check-ins instantly. Redis-backed caching for microsecond validation.",
    category: "security",
    tag: "WebSocket + Redis",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description:
      "Better Auth with HttpOnly cookies (web) and signed bearer tokens (mobile). Single active session per account.",
    category: "security",
    tag: "Better Auth",
  },
];

export default function FeaturesGrid() {
  const [activeCategory, setActiveCategory] = useState<"all" | "security" | "mobile" | "faculty">("all");

  const filteredFeatures = features.filter((f) =>
    activeCategory === "all" ? true : f.category === activeCategory
  );

  return (
    <section id="features" className="py-24 md:py-32 bg-white dark:bg-[#0A0A0A] px-6 md:px-8">
      <div className="max-w-6xl mx-auto" data-animate>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-maroon dark:text-golden mb-4">
            Built for the Classroom
          </p>
          <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-6">
            Features that matter.
          </h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
            A comprehensive suite engineered for students, class presidents, and PUP faculty.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === "all"
                ? "bg-maroon dark:bg-golden text-golden dark:text-maroon-dark shadow-md"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            All Features (12)
          </button>
          <button
            onClick={() => setActiveCategory("security")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === "security"
                ? "bg-maroon dark:bg-golden text-golden dark:text-maroon-dark shadow-md"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Security &amp; Geofence
          </button>
          <button
            onClick={() => setActiveCategory("mobile")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === "mobile"
                ? "bg-maroon dark:bg-golden text-golden dark:text-maroon-dark shadow-md"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Student &amp; Mobile
          </button>
          <button
            onClick={() => setActiveCategory("faculty")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === "faculty"
                ? "bg-maroon dark:bg-golden text-golden dark:text-maroon-dark shadow-md"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Faculty &amp; Analytics
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-8 hover:-translate-y-1.5 hover:border-maroon/40 dark:hover:border-golden/40 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-maroon/5 dark:bg-golden/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-maroon dark:text-golden" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="font-dmSans font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-maroon dark:group-hover:text-golden transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-dmSans">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
