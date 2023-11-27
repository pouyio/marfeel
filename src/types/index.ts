export interface PaginatedResponse<T> {
  data: T;
  next: number | null;
}

export interface Article {
  id: string;
  url: string;
  author: string;
  image_url: string;
  geo: string;
  daily_traffic: Array<{
    day: number;
    hourly_traffic: Array<{
      hour: number;
      traffic: number;
    }>;
  }>;
  totalTraffic: number;
}

export type ArticleWithTotal = Article & { totalTraffic: number };

export const periods = [
  "today",
  "yesterday",
  "lastSevenDays",
  "thisMonth",
] as const;

export type Period = typeof periods[number];

export type Traffic = Record<string, number>;
