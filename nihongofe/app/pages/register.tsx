import type { NextPage } from "next";
import Link from "next/link";
import { LanguageHeader } from "../components/LanguageHeader";
import jlpt from "../utils/jlpt";

const Register: NextPage = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-..ter bg-white text-black"
    >
      <LanguageHeader />
      <div className="container flex grow flex-col items-center justify-center gap-20 px-4 py-16">
        <h1 className="mt-20 text-center text-3xl font-extrabold tracking-tight text-[#58CC03]"> {/* Changed text color to #58CC03 */}
          Tôi muốn học
        </h1>
        <section className="mx-auto grid w-full max-w-5xl grow grid-cols-1 flex-col gap-x-2 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {jlpt.map((jlpts) => (
            <Link
              key={jlpts.name}
              href="/learn"
              className="flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-gray-400 px-5 py-8 text-xl font-bold text-green-600 hover:bg-gray-300 hover:bg-opacity-20"
            >
              <span>{jlpts.name}</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Register;
