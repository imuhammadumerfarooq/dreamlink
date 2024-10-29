// import Image from "next/image";
// import LinkGenerator from "./ui/LinkGenerator";

import { SecretKeyForm } from "./ui/SecretKeyForm";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <SecretKeyForm />
    </main>
  );
}
