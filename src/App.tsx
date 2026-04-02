import { useEffect, useState } from "react";
import "./App.css";
import { ComposerUI } from "./components/ComposerUI";
import { LicensePage } from "./components/License";
import { MaintainPage } from "./components/Maintain";

function App() {
  const [currentPath, setCurrentPath] = useState(
    () => window.location.pathname || "/",
  );

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname || "/");
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
      setCurrentPath(path);
    }
  };

  if (currentPath === "/license") {
    return (
      <div className="app-container">
        <LicensePage onClose={() => navigate("/")} />
      </div>
    );
  }

  if (currentPath === "/maintain") {
    return (
      <div className="app-container">
        <MaintainPage onClose={() => navigate("/")} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          ko.tools<sup className="beta-tag">beta</sup>
        </h1>
        <p>제한 없는 확장 한글.</p>
      </header>

      <main className="main-content">
        <ComposerUI />
      </main>

      <footer className="footer">
        <p>
          Inspired by <a href="https://zi.tools">zi.tools</a> &middot; Made by
          justcontributor &middot;{" "}
          <a
            href="/maintain"
            onClick={(e) => {
              e.preventDefault();
              navigate("/maintain");
            }}
          >
            Maintain
          </a>{" "}
          &middot;{" "}
          <a
            href="/license"
            onClick={(e) => {
              e.preventDefault();
              navigate("/license");
            }}
          >
            오픈소스 라이선스
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
