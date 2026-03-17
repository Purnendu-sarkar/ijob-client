import PublicFooter from "@/components/shared/PublicFooter";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <PublicFooter />
    </>
  );
};

export default CommonLayout;
