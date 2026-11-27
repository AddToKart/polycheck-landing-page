import { GraduationCap, Presentation, ShieldCheck, Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const roles = [
  {
    icon: GraduationCap,
    role: "Students",
    where: "Android app and website",
    features: [
      "Scan to check in, even with no signal",
      "See your attendance history, classes and weekly schedule",
      "Carry a digital student ID that flips like a real card",
      "Send an excuse, or ask for a record to be reviewed",
      "Get notifications, and ask the optional AI helper how you're doing",
    ],
  },
  {
    icon: Presentation,
    role: "Teachers",
    where: "Website and Android app",
    features: [
      "Set up subjects and classes, and share a code so students can join",
      "Run face-to-face or online classes, with an optional PIN for online ones",
      "Watch the class check in live",
      "Decide on excuses and records that need a second look",
      "See which students may be falling behind",
      "Download attendance reports and class records",
    ],
  },
  {
    icon: ShieldCheck,
    role: "School admins",
    where: "Administrators and chosen teachers",
    features: [
      "Create accounts, reset passwords and upload class lists",
      "See reports, limited to what each person is allowed to see",
      "Check that the system is running and pause it for repairs",
      "Search for subjects, classes and sessions",
      "Look back at a history of important changes",
      "Give selected teachers only the admin tools they need",
    ],
  },
];

export default function RoleFeatures() {
  return (
    <section id="roles" className="bg-soft border-y px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Who it's for" title="One system, three kinds of users." />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {roles.map((group, i) => (
            <Reveal key={group.role} delay={i * 90}>
              <div className="card h-full">
                {/* The dashboard's sidebar header: maroon in light mode, golden in dark mode. */}
                <div className="panel flex items-center gap-4 p-5 lg:p-6">
                  <group.icon aria-hidden="true" className="panel-head w-8 h-8 shrink-0" />
                  <div>
                    <h3 className="panel-head font-lora font-bold text-2xl leading-tight">{group.role}</h3>
                    <p className="text-sm">{group.where}</p>
                  </div>
                </div>
                <ul className="p-5 lg:p-6 space-y-3.5">
                  {group.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                      <Check aria-hidden="true" className="mt-1 w-4 h-4 shrink-0 text-accent" strokeWidth={3} />
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
