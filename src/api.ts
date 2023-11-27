import { API_URL } from "./config";
import { Article, ArticleWithTotal, PaginatedResponse, Traffic } from "./types";

export const getAllArticles = async (
  page: number = 1,
  period: string | null = "today"
): Promise<
  PaginatedResponse<{ articles: ArticleWithTotal[]; traffic: Traffic }>
> => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", `${page}`);
  searchParams.set("period", period || "today");

  const response = await fetch(`${API_URL}/data?${searchParams.toString()}`);

  return response.json();
};

export const getArticleById = async (
  id: string,
  period: string | null = "today"
): Promise<{ article: Article; traffic: Traffic }> => {
  const searchParams = new URLSearchParams();
  searchParams.set("period", period || "today");
  const response = await fetch(
    `${API_URL}/data/${id}?${searchParams.toString()}`
  );
  return response.json();
};
