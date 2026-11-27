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
      <main id="main-content" className="min-h-screen bg-[#F8F4ED] dark:bg-[#070709] px-4 sm:px-6 pt-28 pb-16">
        <div className="mx-auto w-full max-w-lg">
          <span className="kicker mb-4">Temporary sign-up</span>
          <h1 className="font-lora font-bold text-4xl text-zinc-900 dark:text-white mb-3">
            Request an account<span className="text-maroon dark:text-golden">.</span>
          </h1>
          <p className="mb-8 text-zinc-600 dark:text-zinc-300 leading-relaxed">
            For students and teachers while PolyCheck is being evaluated. An administrator reviews every request before
            the account is created.
          </p>
          <SignUpForm />
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
