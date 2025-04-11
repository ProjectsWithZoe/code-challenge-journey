// layouts/RootLayout.jsx
import { useIsMobile } from "../hooks/use-mobile";
import { Outlet, Navigate } from "react-router-dom";

export const RootLayout = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
};
