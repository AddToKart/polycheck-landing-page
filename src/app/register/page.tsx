import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import LandingFooter from "@/components/LandingFooter";
import SignUpForm from "@/components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign up — PolyCheck",
  description: "Request a PolyCheck account as a student or teacher.",
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-page pt-16 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch content-start">
        <div className="panel px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
          <div className="mx-auto w-full max-w-lg lg:max-w-sm lg:sticky lg:top-32">
            <span className="label mb-5">Temporary sign-up</span>
            <h1 className="panel-head font-lora font-bold text-4xl lg:text-5xl leading-[1.1] mb-4">
              Request an account.
            </h1>
            <p className="text-base leading-relaxed">
              For students and teachers while PolyCheck is being evaluated. An administrator reviews every request
              before the account is created.
            </p>
          </div>
        </div>
        <div className="px-4 sm:px-6 py-8 lg:py-16">
          <div className="mx-auto w-full max-w-lg">
            <SignUpForm />
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
