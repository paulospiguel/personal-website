export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live em milissegundos
}

export interface CacheConfig {
  ttl: number;
  maxSize?: number;
  prefix?: string;
}

export class CacheService {
  private prefix: string;
  private defaultTTL: number;
  private maxSize: number;

  constructor(config: CacheConfig) {
    this.prefix = config.prefix || 'portfolio_cache';
    this.defaultTTL = config.ttl;
    this.maxSize = config.maxSize || 50;
  }

  private getKey(key: string): string {
    return `${this.prefix}_${key}`;
  }

  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }

  private cleanExpiredItems(): void {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(this.prefix)
    );
    
    keys.forEach(key => {
      try {
        const item = JSON.parse(localStorage.getItem(key) || '');
        if (this.isExpired(item)) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    });
  }

  set<T>(key: string, data: T, customTTL?: number): void {
    try {
      this.cleanExpiredItems();
      
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl: customTTL || this.defaultTTL
      };
      
      localStorage.setItem(this.getKey(key), JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(this.getKey(key));
      if (!cached) return null;
      
      const item: CacheItem<T> = JSON.parse(cached);
      
      if (this.isExpired(item)) {
        localStorage.removeItem(this.getKey(key));
        return null;
      }
      
      return item.data;
    } catch {
      return null;
    }
  }

  invalidate(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(this.prefix)
    );
    keys.forEach(key => localStorage.removeItem(key));
  }

  getStats(): { total: number; expired: number } {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(this.prefix)
    );
    
    let expired = 0;
    keys.forEach(key => {
      try {
        const item = JSON.parse(localStorage.getItem(key) || '');
        if (this.isExpired(item)) expired++;
      } catch {
        expired++;
      }
    });
    
    return { total: keys.length, expired };
  }
}

// Instância global do cache
export const cacheService = new CacheService({
  ttl: 5 * 60 * 1000, // 5 minutos
  maxSize: 100,
  prefix: 'portfolio'
});