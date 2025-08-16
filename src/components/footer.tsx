"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Heart, Code, Coffee } from "lucide-react";
import { Logo } from "./logo";
import { useUser } from "@/hooks/useUser";
import {
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsMedium,
  BsTwitterX,
} from "react-icons/bs";
import { Personal, SocialContact } from "@/types";
const SOCIAL_LINKS = {
  github: {
    icon: BsGithub,
    label: "GitHub",
  },
  linkedIn: {
    icon: BsLinkedin,
    label: "LinkedIn",
  },
  twitter: {
    icon: BsTwitterX,
    label: "X",
  },
  medium: {
    icon: BsMedium,
    label: "Medium",
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const data = useUser().data;
  const personal = data?.personal || ({} as Personal);
  const socialLinks = personal?.socialLinks || ({} as SocialContact);
  const techStack = data?.skills || [];
  const quickLinks = [
    { name: "Sobre", href: "#about" },
    { name: "Experiência", href: "#experience" },
    { name: "Projetos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Desenvolvedor experiente com mais de 8 anos na área, especializado
              em aplicações frontend modernas com sólida experiência em backend,
              redes e DevOps.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>{personal?.socialLinks?.email || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>{personal?.socialLinks?.phone || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{personal?.location || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(techStack).map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700 hover:border-blue-500 transition-colors"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              {Object.entries(socialLinks)
                .map(([social, url]) => {
                  const { icon: Icon, label } =
                    SOCIAL_LINKS[social as keyof typeof SOCIAL_LINKS] || {};

                  if (!Icon || !label) {
                    return null;
                  }

                  return (
                    <Link
                      key={social}
                      href={url}
                      target="_blank"
                      aria-label={label}
                      rel="noopener noreferrer"
                      className="text-gray-400  hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <Icon size={24} />
                      <span className="sr-only">{label}</span>
                    </Link>
                  );
                })
                .filter(Boolean)}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>e</span>
              <Coffee size={16} className="text-yellow-600" />
              <span>usando</span>
              <Code size={16} className="text-blue-400" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              © {currentYear} {personal?.name}. Todos os direitos reservados.
            </p>
            <p className="mt-2 sm:mt-0">
              Desenvolvido por{" "}
              <Link
                href={personal?.socialLinks?.github || "#"}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                {personal?.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
