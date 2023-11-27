import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";
import { AppBar } from "../app-bar";

export const BaseLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar title="Traffic" />
      <Container maxWidth="lg" sx={{ marginTop: "16px" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100%",
            overflow: "auto",
            marginTop: "64px",
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};
