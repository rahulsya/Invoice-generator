import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Invoice generator</div>
      <a download href="/api/pages.pdf">
        Download PDF from pages directory
      </a>
    </main>
  );
}
