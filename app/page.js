import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-amber-700">Explore the Todo App</h1>
      <Link href={'/login'}>
      <button className="inline-flex cursor-pointer items-center justify-center px-12  font-sans font-semibold tracking-wide text-white bg-purple-950 rounded-lg h-[55px]">
        Login
      </button>
      </Link>
       
    </div>
  );
}
