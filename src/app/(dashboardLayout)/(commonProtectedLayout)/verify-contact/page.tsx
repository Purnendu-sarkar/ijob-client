import ContactVerificationPanel from "@/components/modules/Auth/ContactVerificationPanel";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const VerifyContactPage = async () => {
  const user = await getUserInfo();

  if (!user) {
    redirect("/login");
  }

  if (user.emailVerifiedAt || user.phoneVerifiedAt) {
    redirect(getDefaultDashboardRoute(user.role));
  }

  return (
    <div className="mx-auto flex min-h-[calc(100svh-8rem)] max-w-5xl items-center justify-center">
      <ContactVerificationPanel
        email={user.email}
        phone={user.phone}
        emailVerifiedAt={user.emailVerifiedAt}
        phoneVerifiedAt={user.phoneVerifiedAt}
      />
    </div>
  );
};

export default VerifyContactPage;
