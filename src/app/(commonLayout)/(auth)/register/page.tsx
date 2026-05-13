"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SeekerRegisterForm from "@/components/register/seeker-register-form";
import EmployerRegisterForm from "@/components/register/employer-register-form";
import { UserCircle, Building2 } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="relative min-h-svh w-full flex items-center justify-center p-6 md:p-10 overflow-hidden bg-slate-50">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl z-10"
      >
        <Card className="border-white/20 bg-white/70 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <CardHeader className="space-y-2 text-center pb-2">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2"
            >
              <UserCircle className="w-10 h-10 text-primary" />
            </motion.div>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900">
              Join iJob Bangladesh
            </CardTitle>
            <CardDescription className="text-base text-slate-500">
              Create your account in seconds and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs defaultValue="seeker" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-slate-100/50 rounded-xl h-14">
                <TabsTrigger 
                  value="seeker" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all flex items-center gap-2 text-base font-medium"
                >
                  <UserCircle className="w-5 h-5" />
                  Job Seeker
                </TabsTrigger>
                <TabsTrigger 
                  value="employer" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all flex items-center gap-2 text-base font-medium"
                >
                  <Building2 className="w-5 h-5" />
                  Employer
                </TabsTrigger>
              </TabsList>

              <motion.div
                key="forms"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="seeker" className="mt-0">
                  <SeekerRegisterForm />
                </TabsContent>

                <TabsContent value="employer" className="mt-0">
                  <EmployerRegisterForm />
                </TabsContent>
              </motion.div>
            </Tabs>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary hover:underline font-semibold"
              >
                Sign in now
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
