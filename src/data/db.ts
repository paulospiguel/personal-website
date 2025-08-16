import {
  Project,
  Experience,
  Education,
  Skill,
  Personal,
  SocialContact,
} from "@/types";

const showForm = false;

const contact: SocialContact = {
  github: "https://github.com/paulospiguel",
  linkedIn: "https://linkedin.com/in/paulospiguel",
  twitter: "https://twitter.com/paulospiguel",
  stackOverflow: "https://stackoverflow.com/users/123456/paulospiguel",
  email: "paulo@spiguel.one",
  phone: "+351 *** *** ***",
  facebook: "https://facebook.com/paulospiguel",
  medium: "https://medium.com/@paulospiguel",
};

const personal: Personal = {
  name: "Paulo Spiguel",
  profile: "/profile.jpeg",
  designation: "Senior Full-Stack Developer",
  description:
    "Desenvolvedor experiente com mais de 8 anos na área, especializado em aplicações frontend modernas com sólida experiência em backend, redes e DevOps. Apaixonado por criar soluções escaláveis e performáticas usando as mais recentes tecnologias.",
  socialLinks: contact,
  devUsername: "paulospiguel",
  resume: "/resume.pdf",
  bio: "Desenvolvedor experiente com mais de 8 anos na área, especializado em aplicações frontend modernas com sólida experiência em backend, redes e DevOps. Apaixonado por criar soluções escaláveis e performáticas usando as mais recentes tecnologias.",
  location: "Lisboa, Portugal",
  address: "Lisboa, Portugal",
  email: "paulo@spiguel.one",
  phone: "+351 *** *** ***",
};

const skills: Skill[] = [
  { id: 1, name: "JavaScript", image: "javascript.svg" },
  { id: 2, name: "TypeScript", image: "typescript.svg" },
  { id: 3, name: "React", image: "react.svg" },
  { id: 4, name: "React Native", image: "react-native.svg" },
  { id: 5, name: "Node.js", image: "nodejs.svg" },
  { id: 6, name: "Next.js", image: "nextjs.svg" },
  { id: 7, name: "Docker", image: "docker.svg" },
  { id: 8, name: "HTML5", image: "html.svg" },
  { id: 9, name: "CSS3", image: "css.svg" },
  { id: 10, name: "TailwindCSS", image: "tailwindcss.svg" },
  { id: 11, name: "Git", image: "git.svg" },
  { id: 12, name: "Azure", image: "azure.svg" },
  { id: 13, name: "PostgreSQL", image: "postgres.svg" },
];

const experience: Experience[] = [
  // {
  //   id: 1,
  //   title: "Senior Full-Stack Developer",
  //   company: "Tech Solutions Ltd",
  //   duration: "2021 - Presente",
  // },
  // {
  //   id: 2,
  //   title: "Frontend Developer",
  //   company: "Digital Agency Pro",
  //   duration: "2019 - 2021",
  // },
  // {
  //   id: 3,
  //   title: "Full-Stack Developer",
  //   company: "StartUp Innovations",
  //   duration: "2017 - 2019",
  // },
  // {
  //   id: 4,
  //   title: "Junior Developer",
  //   company: "WebDev Company",
  //   duration: "2016 - 2017",
  // },
];

const educations: Education[] = [
  {
    id: 1,
    title: "Sistemas de Informação",
    institution: "Universidade Castelo Branco (BR)",
    duration: "2009 - 2014",
    description:
      "Licenciatura em Sistemas de Informação com foco em desenvolvimento de software e sistemas distribuídos.",
    type: "degree",
  },
  {
    id: 2,
    title: "Redes de Computadores & Sistemas Distribuídos",
    institution: "Universidade Estadual de Londrina (BR)",
    duration: "2014 - 2018",
    description:
      "Curso de especialização em redes de computadores e sistemas distribuídos.",
    type: "post-graduation",
  },
  {
    id: 3,
    title: "React Native Specialist",
    institution: "Rocketseat Academy",
    duration: "2021",
    description: "Especialização em desenvolvimento mobile com React Native.",
    type: "certification",
  },
  {
    id: 4,
    title: "Full-Stack Web Development",
    institution: "Rocketseat Academy",
    duration: "2018",
    description: "Certificação completa em desenvolvimento web full-stack.",
    type: "certification",
  },
];

const projects: Project[] = [
  // {
  //   id: 1,
  //   name: "E-Commerce Platform",
  //   description:
  //     "Plataforma completa de e-commerce com painel administrativo, sistema de pagamentos e gestão de inventário. Desenvolvida com React, Node.js e PostgreSQL.",
  //   tools: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
  //   role: "Full-Stack Developer",
  //   code: "https://github.com/paulospiguel/ecommerce-platform",
  //   demo: "https://ecommerce-demo.vercel.app",
  //   image: "/projects/ecommerce.jpg",
  // },
  // {
  //   id: 2,
  //   name: "Mobile Banking App",
  //   description:
  //     "Aplicação móvel para gestão bancária com autenticação biométrica, transferências e histórico de transações. Desenvolvida em React Native.",
  //   tools: ["React Native", "TypeScript", "Firebase", "Expo"],
  //   role: "Mobile Developer",
  //   code: "https://github.com/paulospiguel/banking-app",
  //   demo: "https://banking-app-demo.com",
  //   image: "/projects/banking.jpg",
  // },
  // {
  //   id: 3,
  //   name: "DevOps Dashboard",
  //   description:
  //     "Dashboard para monitorização de infraestrutura com métricas em tempo real, alertas e gestão de deployments automatizados.",
  //   tools: ["Next.js", "Docker", "Kubernetes", "Prometheus", "Grafana"],
  //   role: "DevOps Engineer",
  //   code: "https://github.com/paulospiguel/devops-dashboard",
  //   demo: "https://devops-dashboard.vercel.app",
  //   image: "/projects/devops.jpg",
  // },
  // {
  //   id: 4,
  //   name: "Real-Time Chat System",
  //   description:
  //     "Sistema de chat em tempo real com salas privadas, partilha de ficheiros e notificações push. Arquitetura escalável com microserviços.",
  //   tools: ["Socket.io", "Redis", "MongoDB", "Docker", "AWS"],
  //   role: "Backend Developer",
  //   code: "https://github.com/paulospiguel/chat-system",
  //   demo: "https://chat-system-demo.com",
  //   image: "/projects/chat.jpg",
  // },
];

export default {
  contact,
  projects,
  educations,
  skills,
  personal,
  experience,
  showForm,
} as const;
