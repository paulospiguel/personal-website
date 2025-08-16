"use client";

import { useState } from "react";
import { Play, Video } from "lucide-react";
import VideoModal from "@/components/ui/video-modal";

export default function VideoIntroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL do teu vídeo (YouTube, Vimeo, ou hospedado)
  const videoUrl = "https://www.youtube.com/embed/SEU_VIDEO_ID"; // Substitui pelo teu vídeo

  return (
    <>
      <section
        id="about"
        className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
      >
        <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

        <div className="flex justify-center -translate-y-[1px]">
          <div className="w-3/4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
          </div>
        </div>

        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center">
            <span className="w-24 h-[2px] bg-[#1a1443]"></span>
            <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
              CONHEÇA-ME MELHOR
            </span>
            <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Texto de introdução */}
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Olá! Sou o Paulo Spiguel 👋
              </h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Desenvolvedor Full-Stack apaixonado por tecnologia e inovação.
                Quer saber mais sobre a minha jornada e experiência? Assiste ao
                meu vídeo de apresentação!
              </p>
            </div>

            {/* Botão de vídeo */}
            <div className="relative inline-block">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Play
                      size={24}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping group-hover:animate-none"></div>
                  </div>
                  <span className="text-lg">Assistir Apresentação</span>
                </div>

                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>

              {/* Indicador visual */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>

            {/* Informações adicionais */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-[#0d1224] rounded-lg border border-[#1f223c] hover:border-violet-500/50 transition-colors">
                <Video className="w-8 h-8 text-violet-500 mx-auto mb-2" />
                <h4 className="text-white font-semibold mb-1">
                  Apresentação Pessoal
                </h4>
                <p className="text-gray-400 text-sm">
                  Conheça a minha história e motivações
                </p>
              </div>

              <div className="p-4 bg-[#0d1224] rounded-lg border border-[#1f223c] hover:border-violet-500/50 transition-colors">
                <div className="w-8 h-8 text-violet-500 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold">💼</span>
                </div>
                <h4 className="text-white font-semibold mb-1">Experiência</h4>
                <p className="text-gray-400 text-sm">
                  8+ anos desenvolvendo soluções
                </p>
              </div>

              <div className="p-4 bg-[#0d1224] rounded-lg border border-[#1f223c] hover:border-violet-500/50 transition-colors">
                <div className="w-8 h-8 text-violet-500 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold">🚀</span>
                </div>
                <h4 className="text-white font-semibold mb-1">Visão</h4>
                <p className="text-gray-400 text-sm">
                  Inovação e excelência técnica
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de vídeo */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={videoUrl}
        title="Apresentação - Paulo Spiguel"
        description="Desenvolvedor Full-Stack | 8+ anos de experiência"
      />
    </>
  );
}
