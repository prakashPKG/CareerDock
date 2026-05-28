import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form className="glass w-full max-w-md rounded-lg p-6">
        <MailCheck className="mb-4 h-8 w-8 text-cyan" />
        <h1 className="text-3xl font-black">Reset password</h1>
        <p className="mt-2 text-sm text-white/60">Enter your email to receive a reset link.</p>
        <input type="email" required placeholder="you@company.com" className="mt-6 h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
        <Button className="mt-4 w-full">Send reset link</Button>
        <Link href="/login" className="mt-5 block text-center text-sm text-cyan">Back to login</Link>
      </form>
    </main>
  );
}
