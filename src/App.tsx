import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Routes } from "./components/routes/Routes";
import { ContextProvider } from "./ContextProvider";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="pagesWrapper">
            <div className="pages shell">
              <Routes />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
