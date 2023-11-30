import { Box, CircularProgress, Paper } from "@mui/material";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Chart } from "../components";
import { ArticleDetail } from "../components/article-detail";
import { useGetArticle } from "../hooks/useGetArticle";
import { transformChartData } from "../utils";

export const Detail: React.FC = () => {
  const params = useParams<{ id: string }>();

  const [searchParams] = useSearchParams();

  const period = searchParams.get("period");

  const { loading, article, traffic } = useGetArticle(params.id!, period);

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
