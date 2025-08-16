import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import db from "@/data/db";

export default function EducationSection() {
  const { educations } = db;

  const getIcon = (
    type: "degree" | "certification" | "course" | "post-graduation"
  ) => {
    switch (type) {
      case "degree":
        return <GraduationCap className="w-6 h-6" />;
      case "certification":
        return <Award className="w-6 h-6" />;
      case "course":
        return <Calendar className="w-6 h-6" />;
      case "post-graduation":
        return <MapPin className="w-6 h-6" />;
      default:
        return <GraduationCap className="w-6 h-6" />;
    }
  };

  const getIconColor = (
    type: "degree" | "certification" | "course" | "post-graduation"
  ) => {
    switch (type) {
      case "degree":
        return "text-blue-400";
      case "certification":
        return "text-green-400";
      case "course":
        return "text-yellow-400";
      case "post-graduation":
        return "text-pink-400";
      default:
        return "text-violet-400";
    }
  };

  return (
    <section
      id="education"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      {/* Título da Secção */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            EDUCAÇÃO
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Grid de Educação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {educations?.map((edu, index) => (
              <div
                key={edu.id}
                className="group relative bg-gradient-to-br from-[#0d1224] to-[#1a1f3a] border border-[#25213b] rounded-xl p-6 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1"
              >
                {/* Ícone e Tipo */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${
                      edu.type === "degree" || edu.type === "post-graduation"
                        ? "from-blue-500/20 to-blue-600/20 border border-blue-500/30"
                        : "from-green-500/20 to-green-600/20 border border-green-500/30"
                    }`}
                  >
                    <div className={getIconColor(edu.type!)}>
                      {getIcon(edu.type!)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        edu.type === "degree" || edu.type === "post-graduation"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : edu.type === "certification"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : edu.type === "course"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                      }`}
                    >
                      {edu.type === "degree"
                        ? "Licenciatura"
                        : edu.type === "certification"
                        ? "Certificação"
                        : edu.type === "course"
                        ? "Curso"
                        : "Pós-Graduação"}
                    </span>
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors duration-300">
                  {edu.title}
                </h3>

                {/* Instituição */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-[#16f2b3] font-medium">
                    {edu.institution}
                  </p>
                </div>

                {/* Duração */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-300 text-sm">{edu.duration}</p>
                </div>

                {/* Descrição */}
                {edu.description && (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                )}

                {/* Efeito de hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Estatísticas de Educação */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-4">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">
                {educations?.filter((edu) => edu.type === "degree").length +
                  educations?.filter((edu) => edu.type === "post-graduation")
                    .length +
                  educations?.filter((edu) => edu.type === "course").length}
              </h4>
              <p className="text-gray-400 text-sm">Licenciaturas</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-4">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">
                {
                  educations?.filter((edu) => edu.type === "certification")
                    .length
                }
              </h4>
              <p className="text-gray-400 text-sm">Certificações</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-violet-500/10 to-violet-600/10 border border-violet-500/20 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-500/20 rounded-lg mb-4">
                <Calendar className="w-6 h-6 text-violet-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">8+</h4>
              <p className="text-gray-400 text-sm">Anos de Estudo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
