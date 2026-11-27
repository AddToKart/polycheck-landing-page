import { QrCode, ScanLine, CircleCheck, WifiOff } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: QrCode,
    title: "Your teacher shows a QR code",
    body: "It can be on their phone, laptop or the projector. Each class has its own code, and it only works for a short time.",
  },
  {
    icon: ScanLine,
    title: "You scan it",
    body: "Open PolyCheck and point your camera at the code. For face-to-face classes, it also checks that you're in the classroom.",
  },
  {
    icon: CircleCheck,
    title: "You're marked present",
    body: "Your teacher sees your name appear on the class list. Scan a little after the deadline and you may be marked late instead.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-page px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="How it works" title="Checking in takes three steps." />

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 90} className="h-full">
                <div className="card card-edge h-full p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="icon-box">
                      <step.icon aria-hidden="true" className="w-6 h-6" />
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center bg-golden font-lora font-bold text-lg text-maroon-dark">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-lora font-bold text-xl text-ink mb-2">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-4 lg:mt-6">
          <div className="panel flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 lg:px-8">
            <WifiOff aria-hidden="true" className="panel-head w-9 h-9 shrink-0" />
            <div>
              <h3 className="panel-head font-lora font-bold text-xl mb-1">No signal in the classroom?</h3>
              <p className="text-[15px] leading-relaxed">
                Your check-in is saved on your phone and sent when you&apos;re back online. Just open PolyCheck
                while you have internet before class, so it can get ready.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
