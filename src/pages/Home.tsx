import { Box, CircularProgress, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllArticles } from "../api";
import { Chart } from "../components";
import { ArticleList } from "../components/article-list/ArticleList";
import { ArticleWithTotal, Traffic } from "../types";
import { transformChartData } from "../utils";

export const Home: React.FC = () => {
  const [loadingTraffic, setLoadingTraffic] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState<ArticleWithTotal[]>([]);
  const [next, setNext] = useState<number | null>(null);
  const [traffic, setTraffic] = useState<Traffic>({});

  const period = searchParams.get("period");

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

  const onLoadMore = () => {
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

  const { values, labels } = transformChartData(traffic);

  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ marginBottom: 2, padding: 2 }}>
        {loadingTraffic ? (
          <CircularProgress />
        ) : (
          <Chart data={values} labels={labels} title="Traffic" />
        )}
      </Paper>
      <Paper
        sx={{
          padding: 2,
        }}
      >
        {loadingArticles ? (
          <CircularProgress />
        ) : (
          <ArticleList articles={articles} onLoadMore={onLoadMore} />
        )}
      </Paper>
    </Box>
  );
};
