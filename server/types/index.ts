export interface PaginatedResponse<T> {
  data: T;
  next: number | null;
}

export interface HourlyTraffic {
  hour: number;
  traffic: number;
}

export interface Article {
  id: string;
  url: string;
  author: string;
  image_url: string;
  geo: string;
  daily_traffic: Array<{
    day: number;
    hourly_traffic: HourlyTraffic[];
  }>;
}

export type ArticleWithTotal = Article & { totalTraffic: number };

export type Period = "today" | "yesterday" | "lastSevenDays" | "thisMonth";

export type Traffic = Record<string, number>;
