import { QrCode, MapPin, WifiOff, MonitorCheck, Users, MessageSquareWarning } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: QrCode,
    title: "A QR code that expires",
    body: "Every class gets its own code. In face-to-face classes your teacher keeps it open for up to 15 minutes. Codes that have been edited are refused.",
    highlight: true,
  },
  {
    icon: MapPin,
    title: "A location check, only when needed",
    body: "Face-to-face classes check that you're in the classroom. Online classes ask you to check in at the start and end instead, and never use your location.",
  },
  {
    icon: WifiOff,
    title: "Works without signal",
    body: "You can still scan when the connection drops. Your check-in waits on your phone and is sent when you reconnect or reopen the app.",
  },
  {
    icon: MonitorCheck,
    title: "Live class list",
    body: "Teachers watch check-ins come in, can put a large view on the projector, and can download attendance as a spreadsheet file.",
  },
  {
    icon: Users,
    title: "Help from class officers",
    body: "A class president can create, start and end the face-to-face sessions their professor allows. Quality officers (QAC) can upload photos showing the class took place.",
  },
  {
    icon: MessageSquareWarning,
    title: "Fix a wrong record",
    body: "Think a record is wrong? Send your teacher a reason and ask for a review. You can also send an excuse for being absent or late.",
  },
];

export default function BentoFeatures() {
  return (
    <section id="features" className="bg-soft border-y px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Features" title="What you can do with PolyCheck." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 90}>
              <div className={`h-full p-6 lg:p-8 ${feature.highlight ? "panel" : "card card-edge"}`}>
                <div
                  className={
                    feature.highlight
                      ? "panel-line panel-head panel-wash mb-5 flex h-12 w-12 items-center justify-center border"
                      : "icon-box mb-5"
                  }
                >
                  <feature.icon aria-hidden="true" className="w-6 h-6" />
                </div>
                <h3 className={`font-lora font-bold text-xl mb-2 ${feature.highlight ? "panel-head" : "text-ink"}`}>
                  {feature.title}
                </h3>
                <p className={`text-[15px] leading-relaxed ${feature.highlight ? "" : "text-muted"}`}>{feature.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
