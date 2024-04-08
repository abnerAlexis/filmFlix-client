import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap";
import "./index.scss";
import { Container } from "react-bootstrap";

import * as atatus from 'atatus-spa';
atatus.config('2d125e18d8e948a49a4a6ef155804edf').install();


//Main component (will eventually use all the others)
const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

//Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
atatus.notify(new Error('Test Atatus Setup'));