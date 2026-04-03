import "./App.css";
import { ComposerUI } from "./components/ComposerUI";

function App() {
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
          Inspired by{" "}
          <a href="https://zi.tools" target="_blank">
            zi.tools
          </a>{" "}
          &middot; Made by justcontributor &middot;{" "}
          <a
            href="https://github.com/justcontributor/kotools/blob/main/MAINTAIN.md"
            target="_blank"
          >
            Maintain
          </a>{" "}
          &middot;{" "}
          <a
            href="https://github.com/justcontributor/kotools/blob/main/LICENSE.md"
            target="_blank"
          >
            오픈소스 라이선스
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
