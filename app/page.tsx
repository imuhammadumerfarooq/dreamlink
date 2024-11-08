import { Metadata } from "next";
import LinkGenerator from "./ui/LinkGenerator";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="flex justify-center pt-14 ">
      <LinkGenerator />
    </main>
  );
}
