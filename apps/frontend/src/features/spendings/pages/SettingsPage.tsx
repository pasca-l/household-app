import { useParams } from "react-router-dom";

export default function SettingsPage() {
  const { id } = useParams<{ id: string }>();
  return <p className="p-4">Settings {id}</p>;
}
