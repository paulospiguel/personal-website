export interface Personal {
  name: string;
  profile: string;
  designation: string;
  description: string;
  address: string;
  devUsername: string;
  resume: string;
  bio: string;
  location: string;
  socialLinks: SocialContact;
  email: string;
  phone: string;
}

export interface Skill {
  id: number;
  name: string;
  image: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
}

export interface Education {
  id: number;
  title: string;
  institution: string;
  duration: string;
  description?: string;
  type?: "degree" | "certification" | "course" | "post-graduation";
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tools: string[];
  role: string;
  code: string;
  demo: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  url: string;
  published_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SocialContact {
  github: string;
  facebook: string;
  linkedIn: string;
  twitter: string;
  stackOverflow: string;
  medium: string;
  email: string;
  phone: string;
}

export interface ContactFormError {
  email: boolean;
  required: boolean;
}

export interface User {
  name: string;
  avatar_url: string;
}

// Tipos para SVG Logos
export type tCategory = string;
export type ThemeOptions = "light" | "dark" | "auto";

export interface iSVG {
  id?: number;
  title: string;
  category: tCategory | tCategory[];
  route: string | ThemeOptions;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
  url: string;
}

// Tipos auxiliares para o sistema de cache de SVGs
export interface SvgCacheItem {
  svg: string;
  size: number;
  fetchedAt: string;
  url: string;
  metadata?: Partial<iSVG>;
}

export interface SvgFetchOptions {
  forceRefresh?: boolean;
  timeout?: number;
  fallback?: string;
  theme?: ThemeOptions;
}

export interface SvgCacheStats {
  memoryCache: { size: number; items: string[] };
  persistentCache: { total: number; expired: number };
  totalSize: number;
}
