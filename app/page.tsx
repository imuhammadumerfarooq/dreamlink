import { Metadata } from "next";
import DreamLink from "./ui/DreamLink";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="flex justify-center pt-14 ">
      <DreamLink />
    </main>
  );
}
