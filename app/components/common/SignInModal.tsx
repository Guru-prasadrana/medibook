"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ArrowRight,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sendOtpApi, verifyOtpApi } from "@/lib/services/auth.api";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

type Step = "phone" | "sending" | "otp" | "success";

export default function SignInModal({ open, setOpen }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (phone.length < 10) return;
    try {
      setStep("sending");
      await sendOtpApi(phone);
      setStep("otp");
    } catch (error) {
      console.error(error);
      setStep("phone");
      alert("Failed to send OTP");
    }
  };

  const handleVerify = async () => {
    if (otp.length < 4) return;
    try {
      // ✅ Capture returned data { message, user_id }
      const data = await verifyOtpApi(phone, otp);

      // ✅ Persist user_id so Navbar can detect login state
      localStorage.setItem("user_id", String(data.user_id));

      setStep("success");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  const handleContinue = () => {
    handleClose(); // ✅ triggers Navbar's handleSignInModalClose → re-checks localStorage
    router.push("/find-doctors");
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("phone");
      setPhone("");
      setOtp("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="p-0 border-0 shadow-2xl overflow-hidden gap-0"
        style={{
          borderRadius: "20px",
          maxWidth: "420px",
          width: "calc(100% - 32px)",
          background: "#f0f2f5",
        }}
      >
        <div className="flex flex-col items-center text-center px-8 py-10">
          {/* ── PHONE / SENDING STEP ── */}
          {(step === "phone" || step === "sending") && (
            <>
              <div
                className="flex items-center justify-center mb-6"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 22,
                  background: "linear-gradient(135deg, #42b8f5, #1a8fe3)",
                  boxShadow: "0 8px 24px rgba(26,143,227,0.35)",
                }}
              >
                <Phone
                  className="text-white"
                  size={32}
                  fill="white"
                  strokeWidth={0}
                />
              </div>

              <h2 className="text-[22px] font-bold tracking-tight text-[#1a1a2e] mb-2">
                Welcome to MediBook
              </h2>
              <p className="text-sm text-muted-foreground mb-7">
                Enter your phone number to sign in
              </p>

              <div
                className={cn(
                  "flex items-center w-full bg-white rounded-[14px] px-4 mb-4 h-14 gap-3 transition-all",
                  step === "phone"
                    ? "ring-2 ring-[#42b8f5]"
                    : "ring-1 ring-[#e0e0e0]",
                )}
              >
                <span className="text-sm font-semibold text-[#333] shrink-0 pr-3 border-r border-[#e0e0e0]">
                  +91
                </span>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  disabled={step === "sending"}
                  className="border-0 shadow-none p-0 h-auto text-[15px] font-medium text-[#222] placeholder:text-muted-foreground/60 focus-visible:ring-0 bg-transparent"
                />
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={step === "sending" || phone.length < 10}
                className={cn(
                  "w-full h-[52px] rounded-[14px] text-base font-semibold text-white border-0 mb-4 transition-all",
                  step === "sending" || phone.length < 10
                    ? "bg-gradient-to-r from-[#a8d8f5] to-[#7bbde8] cursor-not-allowed opacity-100"
                    : "bg-gradient-to-r from-[#42b8f5] to-[#1a8fe3] hover:opacity-90",
                )}
              >
                {step === "sending" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Send OTP
                  </>
                )}
              </Button>

              <p className="text-xs text-[#aaa]">
                By continuing, you agree to our{" "}
                <span className="text-[#555] underline cursor-pointer">
                  Terms & Privacy Policy
                </span>
              </p>
            </>
          )}

          {/* ── OTP STEP ── */}
          {step === "otp" && (
            <>
              <div
                className="flex items-center justify-center mb-6"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "#eef4ff",
                }}
              >
                <ShieldCheck
                  className="text-[#2d7de8]"
                  size={34}
                  strokeWidth={1.6}
                />
              </div>

              <h2 className="text-[22px] font-bold tracking-tight text-[#1a1a2e] mb-2">
                Verify OTP
              </h2>
              <p className="text-sm text-muted-foreground mb-7">
                We sent a code to{" "}
                <span className="text-[#1a8fe3] font-semibold">
                  +91 {phone}
                </span>
              </p>

              <div className="mb-6">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={setOtp}
                  containerClassName="gap-2.5 justify-center"
                >
                  <InputOTPGroup className="gap-2.5">
                    {[0, 1, 2, 3].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-[52px] rounded-[12px] border-2 border-[#e8e8e8] bg-white text-xl font-bold text-[#1a1a2e] transition-all data-[active=true]:border-[#42b8f5] data-[active=true]:ring-0"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerify}
                disabled={otp.length < 4}
                className={cn(
                  "w-full h-[52px] rounded-[14px] text-base font-semibold text-white border-0 mb-4 transition-all",
                  otp.length < 4
                    ? "bg-gradient-to-r from-[#a8d8f5] to-[#7bbde8] cursor-not-allowed opacity-100"
                    : "bg-gradient-to-r from-[#42b8f5] to-[#1a8fe3] hover:opacity-90",
                )}
              >
                Verify & Sign In
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                }}
                className="text-sm text-muted-foreground hover:text-[#555] hover:bg-transparent p-0 h-auto"
              >
                Change phone number
              </Button>
            </>
          )}

          {/* ── SUCCESS STEP ── */}
          {step === "success" && (
            <>
              <div
                className="flex items-center justify-center mb-6"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "#e8f9ef",
                }}
              >
                <CheckCircle2
                  className="text-[#34c46a]"
                  size={38}
                  strokeWidth={1.8}
                />
              </div>

              <h2 className="text-[22px] font-bold tracking-tight text-[#1a1a2e] mb-2">
                Welcome Back! 🎉
              </h2>
              <p className="text-sm text-muted-foreground mb-7">
                You have been successfully signed in.
              </p>

              <Button
                onClick={handleContinue}
                className="w-full h-[52px] rounded-[14px] text-base font-semibold text-white border-0 bg-gradient-to-r from-[#42b8f5] to-[#1a8fe3] hover:opacity-90 transition-all"
              >
                Continue
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
