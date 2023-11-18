import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex items-center justify-between w-full p-8 bg-[#76F0A0] shadow">
      <Link href="/" className="text-2xl">
        🐸 FrogWallet
      </Link>
    </nav>
  );
}
