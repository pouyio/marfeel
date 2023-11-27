import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { BaseLayout } from "./components";
import { Detail } from "./pages/Detail";
import { Home } from "./pages/Home";

const mdTheme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/:id", element: <Detail /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
