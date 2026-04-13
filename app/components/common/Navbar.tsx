"use client";

import Link from "next/link";
import { Calendar, Stethoscope, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignInModal from "./SignInModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import Image from "next/image";
const Navbar = () => {
  const router = useRouter();
  const [signInOpen, setSignInOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("user_id");
  });

  const handleSignInModalClose = (open: boolean) => {
    setSignInOpen(open);
    if (!open) {
      const userId = localStorage.getItem("user_id");
      setIsLoggedIn(!!userId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    router.push("/"); // ✅ redirect to home after logout
  };

  // ✅ Shared guard — navigates if logged in, shows alert if not
  const handleProtectedClick = (path: string) => {
    if (isLoggedIn) {
      router.push(path);
    } else {
      setAlertOpen(true);
    }
  };

  const handleAlertConfirm = () => {
    setAlertOpen(false);
    setSignInOpen(true);
  };

  return (
    <>
      <header className="w-full border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-14 w-auto object-contain rounded-xl"
            />
          </Link>
          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-base font-bold">
            {/* ✅ Logged in → /find-doctors | Logged out → show sign in alert */}
            <button
              onClick={() => handleProtectedClick("/find-doctors")}
              className="hover:text-blue-600 transition-colors"
            >
              Find Doctors
            </button>
            <a
              href="#services"
              className="hover:text-blue-600 transition-colors"
            >
              Services
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a
              href="#contact"
              className="hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => setSignInOpen(true)}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
            )}

            {/* ✅ Logged in → /find-doctors | Logged out → show sign in alert */}
            <Button
              onClick={() => handleProtectedClick("/find-doctors")}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full px-5"
            >
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* Sign-in prompt alert */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent
          className="border-0 shadow-2xl p-0 overflow-hidden"
          style={{ borderRadius: "20px", maxWidth: "400px" }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 px-8 pt-8 pb-6">
            <div
              className="flex items-center justify-center mx-auto mb-5"
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                background: "linear-gradient(135deg, #42b8f5, #1a8fe3)",
                boxShadow: "0 8px 24px rgba(26,143,227,0.3)",
              }}
            >
              <Stethoscope className="text-white" size={30} />
            </div>

            <AlertDialogHeader className="text-center space-y-2">
              <AlertDialogTitle className="text-[20px] font-bold text-[#1a1a2e] text-center">
                Sign in to Continue 👋
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-500 text-center leading-relaxed">
                To find doctors and book appointments, you need to be signed in.
                It only takes a few seconds!
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>

          <AlertDialogFooter className="!flex !flex-col gap-2 px-8 py-5 bg-white sm:flex-col">
            <AlertDialogAction
              onClick={handleAlertConfirm}
              className="w-full h-[48px] rounded-[12px] text-sm font-semibold text-white border-0 bg-gradient-to-r from-[#42b8f5] to-[#1a8fe3] hover:opacity-90 transition-all"
            >
              Sign In Now
            </AlertDialogAction>
            <AlertDialogCancel className="w-full h-[44px] rounded-[12px] text-sm font-medium text-gray-500 bg-gray-100 border-0 hover:bg-gray-200 transition-all mt-0">
              Maybe Later
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SignInModal open={signInOpen} setOpen={handleSignInModalClose} />
    </>
  );
};

export default Navbar;
