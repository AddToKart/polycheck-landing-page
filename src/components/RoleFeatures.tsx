"use client";

import { GraduationCap, Presentation, ShieldCheck, Check } from "lucide-react";
import Reveal from "./Reveal";

interface RoleGroup {
  index: string;
  icon: typeof GraduationCap;
  role: string;
  tag: string;
  features: string[];
}

const roles: RoleGroup[] = [
  {
    index: "01",
    icon: GraduationCap,
    role: "Students",
    tag: "Android app · Web",
    features: [
      "Scan the class QR with an automatic location check",
      "Offline check-ins that sync when you reconnect",
      "Digital student ID — tap the card to flip it",
      "Attendance history, class list and weekly schedule",
      "Submit excuse requests from your attendance history",
      "Notifications and an optional AI assistant that explains your standing",
      "Officer tools: presidents create sessions, QAC members upload proof of class",
    ],
  },
  {
    index: "02",
    icon: Presentation,
    role: "Faculty",
    tag: "Web dashboard · Android app",
    features: [
      "Subjects, sections and enrollment codes",
      "In-person sessions with a map geofence, or online sessions with check-in and check-out checkpoints and an optional PIN",
      "Live session cockpit and a projector-friendly kiosk view",
      "Dispute review with accept, reject and manual override",
      "Excuse approvals and an at-risk students dashboard",
      "Schedules, reports and CSV export",
      "Optional AI assistant for master lists and attendance extracts",
    ],
  },
  {
    index: "03",
    icon: ShieldCheck,
    role: "Administrators",
    tag: "Super admins · Designated faculty",
    features: [
      "Account creation, password resets and roster imports",
      "Reports, excuses and at-risk oversight, limited to what each role may see",
      "Server status, maintenance controls and issue triage",
      "Global search across subjects, sections and sessions",
      "Audit logs and institution-wide settings",
      "Designations — IT Coordinator, Course Head and Registrar — give faculty only the admin tools they need",
    ],
  },
];

export default function RoleFeatures() {
  return (
    <section id="roles" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/40 px-6 md:px-8 border-y border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="kicker kicker--center mb-5">The Whole System</span>
            <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4 leading-tight">
              One system, every role.
            </h2>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-dmSans">
              Students, faculty and administrators each get the tools they need, on the web and on Android.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((group, idx) => (
            <Reveal key={group.role} delay={idx * 100}>
              <div className="bento-card p-8 h-full relative overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 left-0 h-[3px] w-12 bg-golden" />
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-maroon/5 dark:bg-golden/10 flex items-center justify-center text-maroon dark:text-golden border border-maroon/10 dark:border-golden/20">
                    <group.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                    {group.index}
                  </span>
                </div>
                <h3 className="font-lora font-bold text-2xl text-zinc-900 dark:text-white mb-1">
                  {group.role}
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-maroon dark:text-golden mb-6">
                  {group.tag}
                </p>
                <ul className="space-y-3">
                  {group.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 font-dmSans leading-relaxed">
                      <Check className="w-4 h-4 text-golden flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
