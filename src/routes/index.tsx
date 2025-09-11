import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import History from "../pages/History";
import LevelPage from "../pages/LevelPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "level",
        element: <LevelPage />,
      },
    ],
  },
]);
