import { Metadata } from "next";
import DreamLink from "./ui/DreamLink";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <main className="flex justify-center py-14 ">
      <DreamLink />
    </main>
  );
}
