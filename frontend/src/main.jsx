import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react"; // ✅ Make sure Chakra UI is installed
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> 
    <ChakraProvider>   
      <App />
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
