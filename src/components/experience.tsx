import { BsBriefcase } from "react-icons/bs";
import db from "@/data/db";
import Image from "next/image";
import { Code2, Briefcase, Laptop } from "lucide-react";

export default function ExperienceSection() {
  const { experience } = db;

  return (
    <section
      id="experience"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      {/* <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      /> */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            EXPERIÊNCIA
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full flex justify-center items-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full opacity-20 animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <Code2 size={80} className="text-[#16f2b3]" />
                  <div className="flex gap-4">
                    <Briefcase size={40} className="text-[#6366f1]" />
                    <Laptop size={40} className="text-[#8b5cf6]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full"
                >
                  <div className="flex flex-row">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
                    <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
                  </div>
                  <div className="px-4 lg:px-8 py-3 lg:py-5 relative text-white">
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {exp.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-8 px-3 py-5">
                      <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                        <BsBriefcase size={36} />
                      </div>
                      <div>
                        <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                          {exp.title}
                        </p>
                        <p className="text-sm sm:text-base">{exp.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
