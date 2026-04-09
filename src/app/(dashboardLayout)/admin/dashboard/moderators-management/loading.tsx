import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const ModeratorsManagementLoading = () => {
  return (
    <ManagementPageLoading
      columns={10}
      hasActionButton
      filterCount={5}
      filterWidths={["w-48", "w-40", "w-32", "w-28", "w-36"]}
    />
  );
};

export default ModeratorsManagementLoading;
