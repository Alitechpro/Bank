import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Navbar */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            My App
          </h1>

          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-black dark:text-white hover:underline"
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <h2 className="text-5xl font-bold text-black dark:text-white mb-6">
          Welcome to Your App
        </h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Clerk authentication is now working! Try signing up or logging in.
        </p>

        <SignedIn>
          <p className="mt-8 text-green-600 dark:text-green-400 text-lg">
            You are signed in!
          </p>
        </SignedIn>
      </main>
    </div>
  );
}
