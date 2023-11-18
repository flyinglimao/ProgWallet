import Link from "next/link";

export function Nav() {
  return (
    <nav className="w-full bg-green p-8 shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-white">
        <Link href="/" className="text-2xl">
          🐸 FrogWallet
        </Link>
        <div className="flex gap-4">
          <Link href="/wallets">Wallets</Link>
        </div>
      </div>
    </nav>
  );
}
