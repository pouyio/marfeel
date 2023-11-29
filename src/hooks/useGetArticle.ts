import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { Article, Traffic } from "../types";

export const useGetArticle = (id: string, period: string | null) => {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [traffic, setTraffic] = useState<Traffic>({});

  useEffect(() => {
    setLoading(true);
    getArticleById(id, period)
      .then(({ article, traffic }) => {
        setArticle(article);
        setTraffic(traffic);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [period, id]);

  return { loading, article, traffic };
};
