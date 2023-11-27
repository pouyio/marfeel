import { findArticles } from "../db/data";
import {
  Article,
  ArticleWithTotal,
  HourlyTraffic,
  PaginatedResponse,
  Period,
  Traffic,
} from "../types";

const LIMIT = 10;

const byTotalTraffic = (a: ArticleWithTotal, b: ArticleWithTotal) =>
  b.totalTraffic - a.totalTraffic;

const getTotalDailyTraffic = (hourlytraffics: HourlyTraffic[]): number => {
  return hourlytraffics.reduce<number>((acc, h) => {
    return acc + h.traffic;
  }, 0);
};

const addMonthlyTraffic = (article: Article): ArticleWithTotal => {
  const totalTraffic = article.daily_traffic.reduce<number>(
    (acc, day) => acc + getTotalDailyTraffic(day.hourly_traffic),
    0
  );

  return { ...article, totalTraffic };
};

const aggregateDayTraffic = (articles: Article[], day: Date): Traffic => {
  const aggregation: Traffic = {};

  articles.forEach((article) => {
    const hourlyTraffic =
      article.daily_traffic[day.getDate() - 1].hourly_traffic;
    hourlyTraffic.forEach((h) => {
      aggregation[h.hour.toString()] =
        h.traffic + (aggregation[h.hour.toString()] ?? 0);
    });
  });

  return aggregation;
};

const aggregateDaysData = (
  accumulator: Traffic,
  articles: Article[],
  day?: Date
): Traffic => {
  articles.forEach((article) => {
    if (day) {
      const dailyTotalTraffic = getTotalDailyTraffic(
        article.daily_traffic[day.getDate() - 1].hourly_traffic
      );
      accumulator[day.getDate()] =
        dailyTotalTraffic + (accumulator[day.getDate()] ?? 0);
    } else {
      article.daily_traffic.forEach((d) => {
        const dailyTotalTraffic = getTotalDailyTraffic(d.hourly_traffic);
        accumulator[d.day.toString()] =
          dailyTotalTraffic + (accumulator[d.day.toString()] ?? 0);
      });
    }
  });

  return accumulator;
};

const calculateAggregation = (
  articles: Article[],
  period: Period
): { articles: ArticleWithTotal[]; traffic: Traffic } => {
  let aggregatedArticles: ArticleWithTotal[] = [];
  let traffic: Traffic = {};

  switch (period) {
    case "today":
    case "yesterday":
      const day = new Date();

      if (period === "yesterday") {
        day.setDate(day.getDate() - 1);
      }

      traffic = aggregateDayTraffic(articles, day);
      aggregatedArticles = articles.map((article) => {
        return {
          ...article,
          totalTraffic: getTotalDailyTraffic(
            article.daily_traffic[day.getDate() - 1].hourly_traffic
          ),
        };
      });

      break;
    case "lastSevenDays":
      const iterateDay = new Date();
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        iterateDay.setDate(today.getDate() - i);

        // skip calculation if the month is past, data not available.
        if (iterateDay.getMonth() !== today.getMonth()) {
          iterateDay.setTime(today.getTime());
          continue;
        }

        traffic = aggregateDaysData(traffic, articles, iterateDay);
        articles = articles.map((article) => {
          return {
            ...article,
            totalTraffic:
              ((article as ArticleWithTotal).totalTraffic ?? 0) +
              getTotalDailyTraffic(
                article.daily_traffic[iterateDay.getDate() - 1].hourly_traffic
              ),
          };
        });
      }
      aggregatedArticles = articles as ArticleWithTotal[];
      break;
    case "thisMonth":
      traffic = aggregateDaysData(traffic, articles);
      aggregatedArticles = articles.map(addMonthlyTraffic);
      break;

    default:
      throw new Error("Unknown period of time selected");
  }

  return { articles: aggregatedArticles, traffic };
};

export const findAllPaginated = (
  period: Period,
  page: number
): PaginatedResponse<{ articles: Article[]; traffic: Traffic }> => {
  const startIndex = (page - 1) * LIMIT;
  const endIndex = page * LIMIT;

  let allArticles = findArticles();

  const { articles: aggregatedArticles, traffic } = calculateAggregation(
    allArticles,
    period
  );

  const sortedArticles = aggregatedArticles.sort(byTotalTraffic);

  const paginatedArticles = sortedArticles.slice(startIndex, endIndex);
  const next = endIndex < sortedArticles.length ? page + 1 : null;

  return {
    data: { articles: paginatedArticles, traffic },
    next,
  };
};

export const findById = (
  id: string,
  period: Period
): { article: Article; traffic: Traffic } | undefined => {
  const allArticles = findArticles();
  const article = allArticles.find((item) => item.id === id);

  if (!article) {
    return;
  }

  const { articles, traffic } = calculateAggregation([article], period);

  return { article: articles[0], traffic };
};
