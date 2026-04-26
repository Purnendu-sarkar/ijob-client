import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const EmployersManagementLoading = () => {
  return (
    <ManagementPageLoading
      columns={8}
      hasActionButton={false}
      filterCount={5}
      filterWidths={["w-64", "w-40", "w-32", "w-44", "w-44"]}
    />
  );
};

export default EmployersManagementLoading;
