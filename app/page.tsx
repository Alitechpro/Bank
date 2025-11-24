// app/page.tsx
"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import {
  ArrowRight,
  Shield,
  Building2,
  HandCoins,
  Users,
  Sparkles,
  Phone,
} from "lucide-react";

export default function HomePage() {
  const { openSignIn } = useClerk(); // This opens Clerk's official sign-in

  const handleEmployeeLogin = () => {
    openSignIn({
      // Optional: customize redirect after login
      afterSignInUrl: "/dashboard",
      afterSignUpUrl: "/dashboard",
    });
  };

  return (
    <>
      {/* Main Site - Premium Theme */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-3xl">A</span>
              </div>
              <span className="text-3xl font-black text-indigo-900">
                Apna Bank
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-12 font-semibold text-gray-700">
              <Link href="#" className="hover:text-emerald-600 transition">
                Personal
              </Link>
              <Link href="#" className="hover:text-emerald-600 transition">
                Business
              </Link>
              <Link href="#" className="hover:text-emerald-600 transition">
                About
              </Link>
              <Link href="#" className="hover:text-emerald-600 transition">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="font-bold text-indigo-700 hover:text-emerald-600"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <button
                  onClick={handleEmployeeLogin}
                  className="bg-gradient-to-r from-indigo-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                >
                  Employee Login
                </button>
              </SignedOut>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-40 pb-32 px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-tight">
              Banking That
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Feels Like Home
              </span>
            </h1>
            <p className="mt-8 text-2xl text-gray-600 font-light max-w-3xl mx-auto">
              Trusted microfinance banking for every Pakistani family. Simple.
              Fast. Apna.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="#"
                className="group px-12 py-6 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-3"
              >
                Open Free Account
                <ArrowRight className="group-hover:translate-x-2 transition" />
              </Link>
              <button
                onClick={handleEmployeeLogin}
                className="px-12 py-6 border-4 border-indigo-600 text-indigo-600 text-xl font-bold rounded-3xl hover:bg-indigo-600 hover:text-white transition shadow-xl"
              >
                Employee Portal
              </button>
            </div>

            <div className="mt-20 flex items-center justify-center gap-12 text-gray-600">
              <div className="text-center">
                <Sparkles className="w-10 h-10 mx-auto text-emerald-600 mb-2" />
                <p className="font-semibold">SBP Licensed</p>
              </div>
              <div className="text-center">
                <Users className="w-10 h-10 mx-auto text-indigo-600 mb-2" />
                <p className="font-semibold">1M+ Families</p>
              </div>
              <div className="text-center">
                <Building2 className="w-10 h-10 mx-auto text-emerald-600 mb-2" />
                <p className="font-semibold">300+ Branches</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-32 px-6 bg-white/50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Building2,
                title: "Home Financing",
                desc: "Build your dream home with easy monthly plans",
              },
              {
                icon: HandCoins,
                title: "Business Loans",
                desc: "Grow your small business with instant funding",
              },
              {
                icon: Users,
                title: "Women Programs",
                desc: "Special savings & loans for women entrepreneurs",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 transition transform hover:-translate-y-3"
              >
                <f.icon className="w-16 h-16 text-emerald-600 mb-6 group-hover:scale-110 transition" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-lg">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-t from-indigo-950 to-indigo-900 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Phone className="w-8 h-8" />
              <span className="text-3xl font-bold">111-APNA-BANK</span>
            </div>
            <p className="text-indigo-200 text-lg">
              © 2025 Apna Bank • Licensed by State Bank of Pakistan
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
