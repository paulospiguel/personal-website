import Link from "next/link";
import { FaGithub, FaLinkedin, FaDownload, FaEnvelope } from "react-icons/fa";
import db from "@/data/db";

export default function HeroSection() {
  const { personal } = db;

  return (
    <section
      id="hero"
      className="relative flex flex-col-reverse py-8 md:py-12 lg:py-20 lg:flex-row items-center justify-between"
    >
      {/* Conteúdo Principal */}
      <div className="flex flex-col items-start justify-center p-2 pb-20 md:p-2 lg:w-1/2">
        <div className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
          <h1 className="text-pink-500">Olá,</h1>
          <h1 className="my-1">Sou o {personal.name}</h1>
          <h1 className="text-[#16f2b3]">{personal.designation}</h1>
        </div>

        <p className="my-5 text-gray-200 text-sm lg:text-lg leading-6">
          {personal.description}
        </p>

        {/* Redes Sociais */}
        <div className="flex items-center gap-3 my-4">
          <Link
            href={personal.socialLinks.github}
            target="_blank"
            className="transition-all text-pink-500 hover:scale-125 duration-300"
          >
            <FaGithub size={30} />
          </Link>
          <Link
            href={personal.socialLinks.linkedIn}
            target="_blank"
            className="transition-all text-pink-500 hover:scale-125 duration-300"
          >
            <FaLinkedin size={30} />
          </Link>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-3 mt-6">
          <Link
            href={`mailto:${personal.email}`}
            className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
          >
            <div className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3">
              <span>Contactar</span>
              <FaEnvelope size={16} />
            </div>
          </Link>

          <Link
            href={personal.resume}
            target="_blank"
            className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white"
          >
            <span>Download CV</span>
            <FaDownload size={16} />
          </Link>
        </div>
      </div>

      {/* Imagem de Perfil */}
      <div className="order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] lg:w-1/2">
        <div className="flex flex-row">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
          <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
        </div>
        <div className="px-4 lg:px-8 py-5">
          <div className="flex flex-row space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-orange-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-200"></div>
          </div>
        </div>
        <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
          <code className="font-mono text-xs md:text-sm lg:text-base">
            <div className="blink">
              <span className="mr-2 text-pink-500">const</span>
              <span className="mr-2 text-white">developer</span>
              <span className="mr-2 text-pink-500">=</span>
              <span className="text-gray-400">{"{"}</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
              <span className="text-gray-400">{'"'}</span>
              <span className="text-amber-300">{personal.name}</span>
              <span className="text-gray-400">{'",'}</span>
            </div>
            <div className="ml-4 lg:ml-8 mr-2">
              <span className="text-white">skills:</span>
              <span className="text-gray-400">{"&apos;"}</span>
              <span className="text-amber-300">React</span>
              <span className="text-gray-400">&apos;, &apos;</span>
              <span className="text-amber-300">TypeScript</span>
              <span className="text-gray-400">&apos;, &apos;</span>
              <span className="text-amber-300">Node.js</span>
              <span className="text-gray-400">&apos;, &apos;</span>
              <span className="text-amber-300">Docker</span>
              <span className="text-gray-400">&apos;, &apos;</span>
              <span className="text-amber-300">AWS</span>
              <span className="text-gray-400">&apos;],</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-white">experience:</span>
              <span className="text-orange-400">8</span>
              <span className="text-gray-400">,</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-green-400">
                hireable:
              </span>
              <span className="text-orange-400">true</span>
            </div>
            <div>
              <span className="text-gray-400">{"}"}</span>
            </div>
          </code>
        </div>
      </div>
    </section>
  );
}
