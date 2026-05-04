import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const EmployerPendingVerificationPage = async () => {
  const user = await getUserInfo();

  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const company = user.employerProfile?.company;
  const status = company?.verificationStatus || "PENDING";

  if (status === "VERIFIED") {
    redirect("/employer/dashboard");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Company verification required
        </h1>
        <p className="text-muted-foreground">
          Your employer account is created, but your company needs to be verified by an
          Admin before you can post jobs or manage hiring.
        </p>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base">Verification status</CardTitle>
          <CardDescription>
            Company: <span className="font-medium">{company?.name || "—"}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Current status:{" "}
            <Badge variant="secondary" className="ml-1">
              {status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            If this takes longer than expected, please contact support and share your
            company name.
          </p>
        </CardContent>
      </Card>

      <div className="bg-red-500 p-4 text-white text-center font-medium rounded">
        TODO: In the future, there will be a way or some mechanism to contact the admin/moderator here.
      </div>
    </div>
  );
};

export default EmployerPendingVerificationPage;

