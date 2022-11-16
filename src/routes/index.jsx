import { createBrowserRouter } from "react-router-dom";
import { Login, UserAccount } from "../pages";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "me",
        element: <UserAccount />,
      },
    ],
  },
]);
