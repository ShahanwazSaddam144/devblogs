import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Welcome = ({ name }) => {
  const { data: session } = useSession();

  return (
    <section className="mt-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className=" rounded-2xl 
         p-6 sm:p-10 w-full max-w-3xl text-center">

        {/* Heading */}
        <div className="block sm:inline-flex">
          <h1 className="text-[35px] mb-2 font-extrabold text-gray-900">
            Welcome back,</h1> &nbsp;
          <span className="text-indigo-600 text-[35px] font-bold ">
            {session?.user?.name || name || 'Guest'}
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600">
          Ready to share your thoughts with the world? Start your journey today ✍️
        </p>

        {/* Button */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Link href="/your_blogs">
            <button className="px-6 sm:px-8 py-3 rounded-xl font-semibold text-white 
              bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base">
              Create Your First Blog
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
