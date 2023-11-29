import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { ArticleWithTotal, Traffic } from "../types";

export const useGetArticles = (period: string | null) => {
  const [loadingTraffic, setLoadingTraffic] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [articles, setArticles] = useState<ArticleWithTotal[]>([]);
  const [next, setNext] = useState<number | null>(null);
  const [traffic, setTraffic] = useState<Traffic>({});

  useEffect(() => {
    setLoadingArticles(true);
    setLoadingTraffic(true);
    getAllArticles(1, period)
      .then(({ data, next }) => {
        setArticles(data.articles);
        setTraffic(data.traffic);
        setNext(next);
        setLoadingArticles(false);
        setLoadingTraffic(false);
      })
      .catch(() => {
        setLoadingArticles(false);
        setLoadingTraffic(false);
      });
  }, [period]);

  const onLoadMoreLocal = () => {
    if (next) {
      setLoadingArticles(false);
      getAllArticles(next, period)
        .then(({ data, next }) => {
          setArticles((articles) => [...articles, ...data.articles]);
          setNext(next);
          setLoadingArticles(false);
        })
        .catch(() => setLoadingArticles(false));
    }
  };

  return {
    loadingTraffic,
    loadingArticles,
    articles,
    traffic,
    onLoadMore: onLoadMoreLocal,
  };
};
