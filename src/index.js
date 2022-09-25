import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SingleCart from "./components/SingleCart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/contact/:id" element={<SingleCart/>}/>
       
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
