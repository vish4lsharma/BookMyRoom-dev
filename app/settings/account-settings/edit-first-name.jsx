import EditFieldModal from "../../../components/settings/EditFieldModal";

export default function EditFirstName() {
  return (
    <EditFieldModal
      title="Preferred first name"
      placeholder="Enter preferred name"
      initialValue=""
    />
  );
}
