"use client";

import SellerWizard from "@/components/SellerWizard";
import { useParams } from "next/navigation";

export default function SellerPage() {
  const params = useParams();
  const token = params?.token as string;
  return <SellerWizard token={token} />;
}
