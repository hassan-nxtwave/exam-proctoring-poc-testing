import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { FullscreenComponent } from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FullscreenComponent />
  </StrictMode>
);
