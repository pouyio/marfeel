import { Box, CircularProgress, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getArticleById } from "../api";
import { Chart } from "../components";
import { ArticleDetail } from "../components/article-detail";
import { Article, Traffic } from "../types";
import { transformChartData } from "../utils";

export const Detail: React.FC = () => {
  const params = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [traffic, setTraffic] = useState<Traffic>({});

  const period = searchParams.get("period");

  useEffect(() => {
    setLoading(true);
    getArticleById(params.id!, period)
      .then(({ article, traffic }) => {
        setArticle(article);
        setTraffic(traffic);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [period]);

  const { values, labels } = transformChartData(traffic);

  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ marginBottom: 2, padding: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : article ? (
          <ArticleDetail
            author={article.author}
            url={article.url}
            image={article.image_url}
          />
        ) : (
          <h1>Empty state</h1>
        )}
      </Paper>
      <Paper
        sx={{
          padding: 2,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Chart data={values} labels={labels} title="Traffic" />
        )}
      </Paper>
    </Box>
  );
};
