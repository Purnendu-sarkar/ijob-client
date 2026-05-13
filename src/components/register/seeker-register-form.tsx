/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ChevronRight, Mail, Phone, Lock, User, Briefcase, GraduationCap } from "lucide-react";
import InputFieldError from "@/components/shared/InputFieldError";
import { registerJobSeeker } from "@/services/auth/registerJobSeeker";
import { confirmContactVerification, updateMyProfile } from "@/services/auth/auth.service";
import OTPInput from "@/components/shared/otp-input";

const SeekerRegisterForm = () => {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>(null);

  // Step 1: Account Creation
  const handleStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await registerJobSeeker(null, fData);
      if (result.success) {
        setFormData({
          fullName: fData.get("fullName"),
          email: fData.get("email"),
          phone: fData.get("phone"),
        });
        setStep(2);
        toast.success("Account created! Please verify your email.");
      } else {
        setErrors(result.errors);
        toast.error(result.message || "Signup failed");
        console.log("Signup failed", result.errors)
      }
    });
  };

  // Step 2: Verification
  const handleStep2 = async (otp: string) => {
    const vData = new FormData();
    vData.append("identifier", formData.email || formData.phone);
    vData.append("code", otp);
    vData.append("channel", formData.email ? "EMAIL" : "SMS");

    startTransition(async () => {
      const result = await confirmContactVerification(null, vData);
      if (result.success) {
        setStep(3);
        toast.success("Verification successful!");
      } else {
        toast.error(result.message || "Invalid code");
      }
    });
  };

  // Step 3: Profile Setup
  const handleStep3 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await updateMyProfile(fData);
      if (result.success) {
        toast.success("Profile updated! Welcome to iJob.");
        window.location.href = "/dashboard";
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    });
  };

  return (
    <div className="relative">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 max-w-md mx-auto relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
        <div className={`absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 transition-all duration-500`} style={{ width: `${((step - 1) / 2) * 100}%` }} />
        
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              step >= s ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : "bg-slate-200 text-slate-500"
            }`}>
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{s}</span>}
            </div>
            <span className={`text-xs font-medium ${step >= s ? "text-primary" : "text-slate-400"}`}>
              {s === 1 ? "Account" : s === 2 ? "Verify" : "Setup"}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleStep1}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" /> Full Name *
                </Label>
                <Input id="fullName" name="fullName" placeholder="Md. Rahim Khan" required className="h-12 bg-white/50" />
                <InputFieldError field="fullName" state={{ success: false, errors }} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> Phone Number
                </Label>
                <Input id="phone" name="phone" placeholder="01XXXXXXXXX" className="h-12 bg-white/50" />
                <InputFieldError field="phone" state={{ success: false, errors }} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" /> Email *
                </Label>
                <Input id="email" name="email" type="email" placeholder="rahim@example.com" required className="h-12 bg-white/50" />
                <InputFieldError field="email" state={{ success: false, errors }} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> Password *
                </Label>
                <Input id="password" name="password" type="password" required className="h-12 bg-white/50" />
                <InputFieldError field="password" state={{ success: false, errors }} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> Confirm Password *
                </Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required className="h-12 bg-white/50" />
                <InputFieldError field="confirmPassword" state={{ success: false, errors }} />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-bold group" disabled={isPending}>
              {isPending ? "Creating account..." : (
                <>
                  Create Account
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-8 py-4"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Verify your Email</h3>
              <p className="text-slate-500">
                We&apos;ve sent a 6-digit code to <span className="font-bold text-primary">{formData.email}</span>
              </p>
            </div>

            <OTPInput length={6} onComplete={handleStep2} disabled={isPending} />

            <div className="pt-4">
              <p className="text-sm text-slate-400">
                Didn&apos;t receive the code?{" "}
                <button type="button" className="text-primary font-bold hover:underline" disabled={isPending}>
                  Resend Code
                </button>
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setStep(1)} 
              className="mt-4"
              disabled={isPending}
            >
              Change Email / Phone
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.form
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleStep3}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Complete Your Profile</h3>
              <p className="text-slate-500">Add some details to stand out to employers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="experienceYears" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" /> Experience (Years)
                </Label>
                <Input id="experienceYears" name="experienceYears" type="number" placeholder="0" className="h-12 bg-white/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> Skills (Comma separated)
                </Label>
                <Input id="skills" name="skills" placeholder="Sales, Marketing, React" className="h-12 bg-white/50" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="education" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-400" /> Education
                </Label>
                <Textarea id="education" name="education" placeholder="Describe your educational background" className="bg-white/50" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="resumeFile" className="flex items-center gap-2 text-primary font-bold">
                  <Mail className="w-4 h-4" /> Upload CV / Resume (Optional)
                </Label>
                <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer">
                  <input type="file" id="resumeFile" name="resumeFile" className="hidden" />
                  <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG (Max 5MB)</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="ghost" className="flex-1 h-12" onClick={() => window.location.href = "/dashboard"}>
                Skip for now
              </Button>
              <Button type="submit" className="flex-2 h-12 text-lg font-bold" disabled={isPending}>
                {isPending ? "Saving..." : "Complete Setup"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeekerRegisterForm;
