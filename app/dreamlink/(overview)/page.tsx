import { Metadata } from "next";
import DreamLink from "@/app/ui/DreamLink";

export const metadata: Metadata = {
  title: "Dreamlink",
};

export default async function Home() {
  return (
    <main className="flex justify-center py-14">
      <DreamLink />
    </main>
  );
}
