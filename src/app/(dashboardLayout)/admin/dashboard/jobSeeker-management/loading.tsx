import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const JobSeekersManagementLoading = () => {
  return (
    <ManagementPageLoading
      columns={9}
      hasActionButton={false} // No create button
      filterCount={4}
      filterWidths={["w-64", "w-40", "w-32", "w-36"]}
    />
  );
};

export default JobSeekersManagementLoading;
