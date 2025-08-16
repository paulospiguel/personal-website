"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Personal, Project, Experience, Education, Skill } from "@/types";
import { cacheService } from "@/lib/cache";
import db from "@/data/db";

// Tipos estendidos para dados agregados
interface GitHubUserExtended {
  name: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  company?: string;
  blog?: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

interface AggregatedUserData {
  // Dados pessoais (local + GitHub)
  personal: Personal & {
    githubStats: {
      repos: number;
      followers: number;
      following: number;
      joinedAt: string;
    };
    realAvatar: string;
    githubBio?: string;
  };

  // Dados locais
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  localProjects: Project[];

  // Dados do GitHub
  githubRepos: GitHubRepo[];

  // Metadados
  lastUpdated: Date;
  isOnline: boolean;
}

interface UseUserReturn {
  data: AggregatedUserData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
  cacheStats: { total: number; expired: number };
}

const GITHUB_USERNAME = "paulospiguel";
const CACHE_KEYS = {
  USER: "github_user",
  REPOS: "github_repos",
  AGGREGATED: "aggregated_user_data",
} as const;

const TTL = {
  USER: 10 * 60 * 1000, // 10 minutos
  REPOS: 5 * 60 * 1000, // 5 minutos
  AGGREGATED: 15 * 60 * 1000, // 15 minutos
} as const;

export const useUser = (): UseUserReturn => {
  const [data, setData] = useState<AggregatedUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheStats, setCacheStats] = useState({ total: 0, expired: 0 });

  // Função para buscar dados do GitHub
  const fetchGitHubUser = async (): Promise<GitHubUserExtended> => {
    const cached = cacheService.get<GitHubUserExtended>(CACHE_KEYS.USER);
    if (cached) {
      console.log("📦 Cache hit: GitHub User");
      return cached;
    }

    console.log("🌐 Fetching GitHub User...");
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const userData = await response.json();
    cacheService.set(CACHE_KEYS.USER, userData, TTL.USER);

    return userData;
  };

  // Função para buscar repositórios do GitHub
  const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
    const cached = cacheService.get<GitHubRepo[]>(CACHE_KEYS.REPOS);
    if (cached) {
      console.log("📦 Cache hit: GitHub Repos");
      return cached;
    }

    console.log("🌐 Fetching GitHub Repos...");
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    // Filtrar repos que não são forks e têm descrição
    const filteredRepos = repos
      .filter((repo: any) => !repo.fork && repo.description)
      .slice(0, 6);

    cacheService.set(CACHE_KEYS.REPOS, filteredRepos, TTL.REPOS);

    return filteredRepos;
  };

  // Função principal para agregar todos os dados
  const aggregateData = async (): Promise<AggregatedUserData> => {
    // Verificar se temos dados agregados em cache
    const cachedAggregated = cacheService.get<AggregatedUserData>(
      CACHE_KEYS.AGGREGATED
    );
    if (cachedAggregated) {
      console.log("📦 Cache hit: Aggregated Data");
      return cachedAggregated;
    }

    console.log("🔄 Aggregating fresh data...");

    // Buscar dados do GitHub em paralelo
    const [githubUser, githubRepos] = await Promise.all([
      fetchGitHubUser(),
      fetchGitHubRepos(),
    ]);

    // Agregar dados pessoais
    const aggregatedPersonal: AggregatedUserData["personal"] = {
      ...db.personal,
      githubStats: {
        repos: githubUser.public_repos,
        followers: githubUser.followers,
        following: githubUser.following,
        joinedAt: githubUser.created_at,
      },
      realAvatar: githubUser.avatar_url,
      githubBio: githubUser.bio || undefined,
    };

    // Criar objeto agregado
    const aggregatedData: AggregatedUserData = {
      personal: aggregatedPersonal,
      skills: db.skills,
      experience: db.experience,
      education: db.educations,
      localProjects: db.projects,
      githubRepos,
      lastUpdated: new Date(),
      isOnline: navigator.onLine,
    };

    // Guardar no cache
    cacheService.set(CACHE_KEYS.AGGREGATED, aggregatedData, TTL.AGGREGATED);

    return aggregatedData;
  };

  // Função para buscar dados (com fallback para dados locais)
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const aggregatedData = await aggregateData();
      setData(aggregatedData);
    } catch (err) {
      console.error("❌ Erro ao buscar dados:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");

      // Fallback: usar apenas dados locais
      const fallbackData: AggregatedUserData = {
        personal: {
          ...db.personal,
          githubStats: {
            repos: 0,
            followers: 0,
            following: 0,
            joinedAt: new Date().toISOString(),
          },
          realAvatar: db.personal.profile,
        },
        skills: db.skills,
        experience: db.experience,
        education: db.educations,
        localProjects: db.projects,
        githubRepos: [],
        lastUpdated: new Date(),
        isOnline: false,
      };

      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para limpar cache
  const clearCache = useCallback(() => {
    Object.values(CACHE_KEYS).forEach((key) => {
      cacheService.invalidate(key);
    });
    setCacheStats(cacheService.getStats());
    // Se aggregateData for usado dentro desta função, adicionar às dependências
  }, [aggregateData]); // ✅ Adicionar dependência em falta

  // Função para refetch (força busca nova)
  const refetch = useCallback(async () => {
    clearCache();
    await fetchData();
  }, [fetchData, clearCache]);

  // Atualizar stats do cache periodicamente
  useEffect(() => {
    const updateStats = () => setCacheStats(cacheService.getStats());
    updateStats();

    const interval = setInterval(updateStats, 30000); // A cada 30s
    return () => clearInterval(interval);
  }, []);

  // Buscar dados na inicialização
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Listener para mudanças de conectividade
  useEffect(() => {
    const handleOnline = () => {
      console.log("🌐 Voltou online - refetching data...");
      refetch();
    };

    const handleOffline = () => {
      console.log("📴 Ficou offline - usando dados em cache");
      if (data) {
        setData((prev) => (prev ? { ...prev, isOnline: false } : null));
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [refetch, data]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
    cacheStats,
  };
};

// Hook auxiliar para dados específicos
export const useUserPersonal = () => {
  const { data, loading, error } = useUser();
  return {
    personal: data?.personal || null,
    loading,
    error,
  };
};

export const useUserProjects = () => {
  const { data, loading, error } = useUser();
  return {
    localProjects: data?.localProjects || [],
    githubRepos: data?.githubRepos || [],
    loading,
    error,
  };
};

export const useUserSkills = () => {
  const { data, loading, error } = useUser();
  return {
    skills: data?.skills || [],
    loading,
    error,
  };
};
