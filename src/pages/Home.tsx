import { Box, CircularProgress, Paper } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Chart } from "../components";
import { ArticleList } from "../components/article-list/ArticleList";
import { useGetArticles } from "../hooks/useGetArticles";
import { transformChartData } from "../utils";

export const Home: React.FC = () => {
  const [searchParams] = useSearchParams();

  const period = searchParams.get("period");

  const { loadingTraffic, loadingArticles, articles, traffic, onLoadMore } =
    useGetArticles(period);

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
