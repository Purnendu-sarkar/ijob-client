import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CompanyVerificationUploadForm from "@/components/modules/Employer/CompanyVerificationUploadForm";
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
  const documents = company?.verificationDocuments || [];
  const documentTypes = new Set(documents.map((document) => document.documentType));
  const missingRequiredDocuments = [
    { type: "TRADE_LICENSE", label: "Trade License" },
    { type: "NID", label: "NID / Contact Person ID" },
  ].filter((document) => !documentTypes.has(document.type));
  const isReadyForReview = missingRequiredDocuments.length === 0;

  if (status === "VERIFIED") {
    redirect("/employer/dashboard");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Company verification
        </h1>
        <p className="text-muted-foreground">
          {isReadyForReview
            ? `${company?.name || "Your company"} is waiting for admin review.`
            : "Upload the required documents to start admin review."}
        </p>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base">Verification status</CardTitle>
          <CardDescription>
            Company: <span className="font-medium">{company?.name || "-"}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Current status:</span>
            <Badge variant={status === "REJECTED" ? "destructive" : "secondary"}>
              {status}
            </Badge>
          </div>

          {company?.verificationRejectionReason ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {company.verificationRejectionReason}
            </p>
          ) : null}

          {missingRequiredDocuments.length ? (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              Required before review:{" "}
              {missingRequiredDocuments.map((document) => document.label).join(", ")}.
            </div>
          ) : null}

          {documents.length ? (
            <div className="space-y-2">
              <h2 className="text-sm font-medium">Submitted documents</h2>
              <div className="divide-y rounded-md border">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm"
                  >
                    <span>{document.documentType.replaceAll("_", " ")}</span>
                    <Badge variant="outline">{document.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base">Upload verification documents</CardTitle>
          <CardDescription>
            PDF, JPG, PNG, or WEBP. Maximum 5MB per file.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <CompanyVerificationUploadForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerPendingVerificationPage;
