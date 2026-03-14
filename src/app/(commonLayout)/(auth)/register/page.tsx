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

export const metadata = {
  title: "Register - iJob Bangladesh",
  description: "Create your account as Job Seeker or Employer",
};

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Choose your role and enter your information to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="seeker" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="seeker">Job Seeker</TabsTrigger>
                <TabsTrigger value="employer">Employer</TabsTrigger>
              </TabsList>

              <TabsContent value="seeker">
                <SeekerRegisterForm />
              </TabsContent>

              <TabsContent value="employer">
                <EmployerRegisterForm />
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
