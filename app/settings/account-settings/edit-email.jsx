import EditFieldModal from "../../../components/settings/EditFieldModal";

export default function EditEmail() {
  return (
    <EditFieldModal
      title="Email address"
      placeholder="Enter new email"
      initialValue="g***8@gmail.com"
    />
  );
}
