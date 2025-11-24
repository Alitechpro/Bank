// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4">
      <SignIn
        afterSignInUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: "cl-formButtonPrimary",
            formFieldInput: "cl-formFieldInput",
            card: "cl-card",
            headerTitle: "cl-headerTitle",
            headerSubtitle: "cl-headerSubtitle",
            socialButtonsBlockButton: "cl-socialButtonsBlockButton",
          },
        }}
      />
    </div>
  );
}
