import { Link } from "@mui/material";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import { Article as ArticleComponent } from "..";

import { ArticleWithTotal } from "../../types";

export const ArticleList: React.FC<{
  articles: ArticleWithTotal[];
  onLoadMore: () => void;
}> = ({ articles, onLoadMore }) => {
  let [searchParams] = useSearchParams();
  const { ref } = useInView({
    fallbackInView: true,
    onChange: (inView: boolean) => {
      if (inView) {
        onLoadMore();
      }
    },
  });

  return (
    <>
      {articles.map((article, idx) => (
        <Link
          data-testid={`article-link-${article.id}`}
          underline="none"
          ref={idx === articles.length - 1 ? ref : null}
          key={article.id}
          href={`/${article.id}?${searchParams.toString()}`}
        >
          <ArticleComponent
            author={article.author}
            url={article.url}
            image={article.image_url}
            traffic={article.totalTraffic}
          />
        </Link>
      ))}
    </>
  );
};
