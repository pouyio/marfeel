import rawData from "../dataset.json";
import { Article } from "../types";

const allArticles: Article[] = rawData.traffic_data;

type ArticleWithTotal = Article & { totalTraffic: number };

const addTotalTraffic = (article: Article): ArticleWithTotal => {
  const totalTraffic = article.daily_traffic.reduce<number>(
    (acc, day) =>
      acc +
      day.hourly_traffic.reduce<number>(
        (dayTotal, hour) => dayTotal + hour.traffic,
        0
      ),
    0
  );

  return { ...article, totalTraffic };
};

const byTotalTraffic = (a: ArticleWithTotal, b: ArticleWithTotal) =>
  b.totalTraffic - a.totalTraffic;

export const findSortedArticles = () => {
  return allArticles.map(addTotalTraffic).sort(byTotalTraffic);
};

export const findArticles = () => {
  return allArticles;
};
