import { useEffect } from "react";
import "./License.css";

interface LicenseProps {
  onClose: () => void;
}

export function LicensePage({ onClose }: LicenseProps) {
  useEffect(() => {
    document.title = "ko.tools - License";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="license-wrapper">
      <section className="license-section">
        <h2>오픈소스 라이선스 및 폰트 출처</h2>
        <p>이 프로젝트는 다음 라이브러리 및 폰트를 사용합니다.</p>
        <ul>
          <li>React 19.2.4 (MIT License)</li>
          <li>React DOM 19.2.4 (MIT License)</li>
          <li>Vite 8.0.1 (MIT License)</li>
          <li>TypeScript 5.9.3 (Apache License 2.0)</li>
          <li>opentype.js 1.3.4 (MIT License)</li>
          <li>react-markdown 10.1.0 (MIT License)</li>
          <li>remark-gfm 4.0.1 (MIT License)</li>
          <li>@eslint/js, eslint-plugin-react-hooks 등 (MIT License)</li>
        </ul>

        <p>폰트 출처:</p>
        <ul>
          <li>
            나눔바른고딕 옛한글 (NanumBarunGothic-YetHangul) - Naver Open Font,
            SIL Open Font License 1.1 (OFL)
          </li>
          <li>
            마루부리 (MaruBuri) - Naver Open Font, SIL Open Font License 1.1
            (OFL)
          </li>
        </ul>

        <p>
          라이선스 전문을 확인하려면 각 프로젝트 저장소의 LICENSE 파일을
          참조하세요.
        </p>

        <button className="close-lic-btn" onClick={onClose}>
          뒤로 (Esc)
        </button>
      </section>
    </div>
  );
}
