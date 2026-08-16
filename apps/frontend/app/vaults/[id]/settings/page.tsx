"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <p className="p-4">Settings {id}</p>;
}
