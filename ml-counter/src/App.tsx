import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react";
import Planner from "./components/Planner";

export const App = () => {
  return (
    <ChakraProvider>
      <div>
        <h1>Mobile Legends Planner</h1>
        <Planner />
      </div>
    </ChakraProvider>
  );
};
