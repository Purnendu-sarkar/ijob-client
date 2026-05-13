/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, Mail, Phone, Lock, User, Building2, Briefcase, FileText, Upload } from "lucide-react";
import InputFieldError from "@/components/shared/InputFieldError";
import { registerEmployer } from "@/services/auth/registerEmployer";
import { confirmContactVerification } from "@/services/auth/auth.service";
import OTPInput from "@/components/shared/otp-input";

const EmployerRegisterForm = () => {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>(null);

  // Step 1: Account Creation
  const handleStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await registerEmployer(null, fData);
      if (result.success) {
        setFormData({
          fullName: fData.get("fullName"),
          email: fData.get("email"),
          phone: fData.get("phone"),
          companyName: fData.get("companyName"),
        });
        setStep(2);
        toast.success("Account created! Verification code sent.");
      } else {
        setErrors(result.errors);
        toast.error(result.message || "Registration failed");
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
        toast.success("Identity verified!");
      } else {
        toast.error(result.message || "Invalid verification code");
      }
    });
  };

  // Step 3: Company Setup (Can be completed later)
  const handleStep3 = () => {
    toast.success("Registration complete! Welcome to iJob.");
    window.location.href = "/dashboard";
  };

  return (
    <div className="relative">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10 max-w-md mx-auto relative px-4">
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
              {s === 1 ? "Company" : s === 2 ? "Verify" : "KYC"}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1-emp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleStep1}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="companyName" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" /> Company Name *
                </Label>
                <Input id="companyName" name="companyName" placeholder="ABC Solutions Ltd." required className="h-12 bg-white/50" />
                <InputFieldError field="companyName" state={{ success: false, errors }} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" /> Your Full Name *
                </Label>
                <Input id="fullName" name="fullName" placeholder="Karim Ahmed" required className="h-12 bg-white/50" />
                <InputFieldError field="fullName" state={{ success: false, errors }} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" /> Designation
                </Label>
                <Input id="designation" name="designation" placeholder="HR Manager" className="h-12 bg-white/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" /> Business Email *
                </Label>
                <Input id="email" name="email" type="email" placeholder="hr@company.com" required className="h-12 bg-white/50" />
                <InputFieldError field="email" state={{ success: false, errors }} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> Phone Number
                </Label>
                <Input id="phone" name="phone" placeholder="01XXXXXXXXX" className="h-12 bg-white/50" />
                <InputFieldError field="phone" state={{ success: false, errors }} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> Password *
                </Label>
                <Input id="password" name="password" type="password" required className="h-12 bg-white/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> Confirm Password *
                </Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required className="h-12 bg-white/50" />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-bold group" disabled={isPending}>
              {isPending ? "Creating account..." : (
                <>
                  Register Company
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.div
            key="step2-emp"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-8 py-4"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Employer Verification</h3>
              <p className="text-slate-500">
                A 6-digit code has been sent to <span className="font-bold text-primary">{formData.email}</span>
              </p>
            </div>

            <OTPInput length={6} onComplete={handleStep2} disabled={isPending} />

            <div className="pt-4 text-sm text-slate-400">
              <p>Didn&apos;t receive the code? <button type="button" className="text-primary font-bold hover:underline">Resend</button></p>
            </div>
            
            <Button variant="outline" onClick={() => setStep(1)} disabled={isPending}>
              Back to info
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3-emp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Account Created Successfully!</h3>
              <p className="text-slate-500">Your company <span className="font-bold">{formData.companyName}</span> is now registered.</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-4">
              <h4 className="font-bold text-slate-700 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Verification (KYC)
              </h4>
              <p className="text-sm text-slate-600">
                To start posting jobs, please upload your <span className="font-bold">Trade License</span> and <span className="font-bold">NID</span> from your dashboard.
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <Upload className="w-4 h-4 shrink-0" />
                Verification typically takes 24-48 business hours.
              </div>
            </div>

            <Button onClick={handleStep3} className="w-full h-14 text-lg font-bold">
              Go to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployerRegisterForm;
