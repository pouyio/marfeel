import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

export interface ArticleDetailProps {
  author: string;
  url: string;
  image: string;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  author,
  url,
  image,
}) => {
  return (
    <Box sx={{ display: "flex", mb: 1 }}>
      <>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {url}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {author}
          </Typography>
        </CardContent>
      </>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={image}
        alt="detail-image"
      />
    </Box>
  );
};
