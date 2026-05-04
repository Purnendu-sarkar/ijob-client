import CreateJobForm from "@/components/modules/Employer/Jobs/CreateJobForm";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const EmployerPostJobPage = async () => {
  const user = await getUserInfo();

  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const verificationStatus = user.employerProfile?.company?.verificationStatus;
  if (verificationStatus !== "VERIFIED") {
    redirect("/employer/dashboard/pending-verification");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Post a Job</h1>
        <p className="text-muted-foreground">
          Create a new job post for candidates in Bangladesh.
        </p>
      </div>
      <CreateJobForm />
    </div>
  );
};

export default EmployerPostJobPage;

