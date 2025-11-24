// app/page.tsx
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Lock,
  Globe,
  Zap,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              ApexBank
            </h1>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
              <Link href="#" className="hover:text-zinc-900 transition">
                Personal
              </Link>
              <Link href="#" className="hover:text-zinc-900 transition">
                Business
              </Link>
              <Link href="#" className="hover:text-zinc-900 transition">
                Investments
              </Link>
              <Link href="#" className="hover:text-zinc-900 transition">
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SignedIn>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="ml-3 inline-flex items-center px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition shadow-sm"
              >
                Open Account
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 px-4 py-2 rounded-full text-xs font-medium mb-8">
            <Shield className="w-4 h-4" />
            FDIC Insured up to $250,000 · 256-bit encryption
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 max-w-5xl mx-auto leading-tight">
            Banking that moves at the
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
              {" "}
              speed of you
            </span>
          </h1>

          <p className="mt-6 text-xl text-zinc-600 max-w-2xl mx-auto">
            Zero fees. Instant transfers. Award-winning security. Join 2M+
            customers who switched to smarter banking.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-zinc-900 text-white font-medium text-lg hover:bg-zinc-800 transition shadow-lg"
            >
              Open Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border-2 border-zinc-900 text-zinc-900 font-medium text-lg hover:bg-zinc-900 hover:text-white transition"
            >
              Download App
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-12 text-sm text-zinc-600">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              No hidden fees
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              4.9★ on App Store
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              24/7 human support
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center opacity-60">
            <div className="text-center">
              <Lock className="w-10 h-10 mx-auto text-zinc-700" />
              <p className="mt-3 text-sm font-medium">Bank-Level Encryption</p>
            </div>
            <div className="text-center">
              <Shield className="w-10 h-10 mx-auto text-zinc-700" />
              <p className="mt-3 text-sm font-medium">FDIC Insured</p>
            </div>
            <div className="text-center">
              <Zap className="w-10 h-10 mx-auto text-zinc-700" />
              <p className="mt-3 text-sm font-medium">Instant Transfers</p>
            </div>
            <div className="text-center">
              <Globe className="w-10 h-10 mx-auto text-zinc-700" />
              <p className="mt-3 text-sm font-medium">Global Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-zinc-600">
          © 2025 ApexBank. All rights reserved. · Member FDIC · Equal Housing
          Lender
        </div>
      </footer>
    </>
  );
}
