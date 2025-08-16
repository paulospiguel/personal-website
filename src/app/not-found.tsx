import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1224] via-[#1a1f3a] to-[#0d1224] flex items-center justify-center px-4">
      <div className="w-full mx-auto text-center">
        {/* Número 404 animado */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-red-400 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-violet-400/20 blur-sm">
            404
          </div>
        </div>

        {/* Mensagem principal */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Página não encontrada
          </h2>
          <p className="text-lg text-gray-300 mb-2">
            Oops! A página que procuras não existe ou foi movida.
          </p>
          <p className="text-gray-400">
            Mas não te preocupes, há muito mais para explorar!
          </p>
        </div>

        {/* Ícone decorativo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30">
            <Search className="w-10 h-10 text-violet-400" />
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>

        {/* Links úteis */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <p className="text-gray-400 mb-4">Talvez estejas à procura de:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#about"
              className="text-violet-400 hover:text-violet-300 transition-colors duration-200 hover:underline"
            >
              Sobre Mim
            </Link>
            <Link
              href="/#projects"
              className="text-violet-400 hover:text-violet-300 transition-colors duration-200 hover:underline"
            >
              Projetos
            </Link>
            <Link
              href="/#skills"
              className="text-violet-400 hover:text-violet-300 transition-colors duration-200 hover:underline"
            >
              Competências
            </Link>
            <Link
              href="/#contact"
              className="text-violet-400 hover:text-violet-300 transition-colors duration-200 hover:underline"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
