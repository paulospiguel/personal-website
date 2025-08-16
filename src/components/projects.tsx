import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import db from "@/data/db";

export default function ProjectsSection() {
  const { projects } = db;

  return (
    <section id="projects" className="relative z-50 my-12 lg:my-24">
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJETOS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="pt-24">
        <div className="flex flex-col gap-6">
          {projects.slice(0, 4).map((project, index) => (
            <div
              id={`sticky-card-${index + 1}`}
              key={project.id}
              className="sticky-card  w-full mx-auto max-w-2xl sticky"
            >
              <div className="box-border   flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                <div className="w-full relative rounded-2xl border border-[#1d293a] bg-gradient-to-r from-[#0d1224] to-[#0a0d37]">
                  <div className="flex flex-row">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
                    <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
                  </div>
                  <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                      <div className="md:w-1/2">
                        <Image
                          src={project.image}
                          alt={project.name}
                          width={400}
                          height={250}
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 flex flex-col justify-between">
                        <div>
                          <h3 className="text-white text-xl font-semibold mb-3">
                            {project.name}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tools.map((tool, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs bg-[#16f2b3] text-black rounded"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Link
                            href={project.code}
                            target="_blank"
                            className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors"
                          >
                            <FaGithub size={20} />
                            <span>Código</span>
                          </Link>
                          <Link
                            href={project.demo}
                            target="_blank"
                            className="flex items-center gap-2 text-violet-500 hover:text-violet-400 transition-colors"
                          >
                            <FaExternalLinkAlt size={16} />
                            <span>Demo</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
