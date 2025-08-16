import { User } from "@/types";
import { cacheService } from "@/lib/cache";

interface GitHubUserExtended extends User {
  bio?: string;
  location?: string;
  company?: string;
  blog?: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
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
}

class GitHubService {
  private baseURL = "https://api.github.com";
  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  private async fetchWithCache<T>(
    endpoint: string,
    cacheKey: string,
    ttl?: number
  ): Promise<T> {
    // Tentar buscar do cache primeiro
    const cached = cacheService.get<T>(cacheKey);
    if (cached) {
      console.log(`📦 Cache hit para: ${cacheKey}`);
      return cached;
    }

    console.log(`🌐 Buscando dados frescos para: ${cacheKey}`);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Se tiveres token do GitHub, adiciona aqui
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();

      // Guardar no cache
      cacheService.set(cacheKey, data, ttl);

      return data;
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
      throw error;
    }
  }

  async getUser(): Promise<GitHubUserExtended> {
    return this.fetchWithCache<GitHubUserExtended>(
      `/users/${this.username}`,
      `user_${this.username}`,
      10 * 60 * 1000 // 10 minutos para dados do utilizador
    );
  }

  async getRepositories(limit = 6): Promise<GitHubRepo[]> {
    const repos = await this.fetchWithCache<GitHubRepo[]>(
      `/users/${this.username}/repos?sort=updated&per_page=${limit}`,
      `repos_${this.username}_${limit}`,
      5 * 60 * 1000 // 5 minutos para repositórios
    );

    return repos.filter((repo) => !repo.name.includes("."));
  }

  async getContributions(): Promise<any> {
    // Para contribuições, podes usar uma API externa ou scraping
    return this.fetchWithCache(
      `/users/${this.username}/events/public?per_page=10`,
      `contributions_${this.username}`,
      15 * 60 * 1000 // 15 minutos para atividade
    );
  }
}

// Função principal exportada (mantém compatibilidade)
const getGitHubUser = async (username: string): Promise<User> => {
  const service = new GitHubService(username);
  const user = await service.getUser();

  return {
    name: user.name,
    avatar_url: user.avatar_url,
  };
};

// Exportar serviço completo também
export const githubService = new GitHubService("paulospiguel");
export default getGitHubUser;
