import React from "react";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { routes } from "./routes";

function App() {
  const element = useRoutes(routes);

  return (
    <div>
      {element}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App; // Exportación por defecto