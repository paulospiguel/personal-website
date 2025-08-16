"use client";

import { useState } from "react";
import { useUserPersonal } from "@/hooks/useUser";
import { ContactFormData, ContactFormError } from "@/types";
import {
  Check,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import db from "@/data/db";

const Icons = {
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin,
  Github: Github,
  Linkedin: Linkedin,
  Send: Send,
  Twitter: Twitter,
  Check: Check,
};

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

export default function ContactSection() {
  // ✅ Mover todos os hooks para o topo, antes de qualquer return
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormError>({
    email: false,
    required: false,
  });

  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  // Hooks personalizados também devem vir antes
  const { personal, loading: userLoading } = useUserPersonal();
  const { showForm } = db;

  // ✅ Early return agora vem DEPOIS de todos os hooks
  if (!showForm || userLoading) {
    return null;
  }

  // Validação de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: ContactFormError = {
      email: !validateEmail(formData.email),
      required:
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim(),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.required;
  };

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus({
        type: "error",
        message: "Por favor, corrige os erros no formulário.",
      });
      return;
    }

    setStatus({ type: "loading" });

    try {
      // Simular envio (substitui pela tua lógica de envio)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aqui podes integrar com:
      // - EmailJS
      // - Netlify Forms
      // - API própria
      // - Webhook

      console.log("📧 Formulário enviado:", formData);

      setStatus({
        type: "success",
        message: "Mensagem enviada com sucesso! Respondo em breve.",
      });

      // Limpar formulário
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Tenta novamente.",
      });
    }
  };

  // Informações de contacto
  const contactInfo = [
    {
      icon: Icons.Mail,
      label: "Email",
      value: personal?.email,
      href: `mailto:${personal?.email}`,
    },
    {
      icon: Icons.Phone,
      label: "Telefone",
      value: personal?.phone,
      href: `tel:${personal?.phone}`,
    },
    {
      icon: Icons.MapPin,
      label: "Localização",
      value: personal?.address,
      href: "#",
    },
  ];

  // Links sociais
  const socialLinks = [
    {
      icon: Icons.Github,
      label: "GitHub",
      href: personal?.socialLinks.github,
    },
    {
      icon: Icons.Linkedin,
      label: "LinkedIn",
      href: personal?.socialLinks.linkedIn,
    },
    {
      icon: Icons.Twitter,
      label: "Twitter",
      href: personal?.socialLinks.twitter,
    },
  ];

  if (userLoading) {
    return (
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
              <div className="h-96 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-20 rounded-2xl bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vamos Trabalhar Juntos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tens um projeto em mente? Vamos conversar sobre como posso ajudar a
            torná-lo realidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informações de Contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Informações de Contacto
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <Icon />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {info.label}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sociais */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Segue-me nas Redes
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-110 text-gray-600 dark:text-gray-400`}
                      title={social.label}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Disponível para novos projetos
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Respondo normalmente em 24 horas
              </p>
            </div>
          </div>

          {/* Formulário de Contacto */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Envia uma Mensagem
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.required && !formData.name.trim()
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="O teu nome"
                  disabled={status.type === "loading"}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.email || (errors.required && !formData.email.trim())
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="o.teu@email.com"
                  disabled={status.type === "loading"}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    Por favor, insere um email válido
                  </p>
                )}
              </div>

              {/* Mensagem */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.required && !formData.message.trim()
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Conta-me sobre o teu projeto..."
                  disabled={status.type === "loading"}
                />
              </div>

              {/* Status Messages */}
              {status.message && (
                <div
                  className={`p-4 rounded-lg ${
                    status.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-center">
                    {status.type === "success" && <Icons.Check />}
                    <span className="ml-2">{status.message}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {status.type === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>A enviar...</span>
                  </>
                ) : (
                  <>
                    <Icons.Send />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
