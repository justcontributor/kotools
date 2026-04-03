import { useState, useEffect, useRef } from "react";
import {
  composeKotools,
  decomposeString,
  isVowel,
  isConsonant,
} from "../engine/composer";
import "./ComposerUI.css";
import { VisualRenderer } from "./VisualRenderer";

function formatCodepoints(str: string | null) {
  if (!str) return "N/A";
  return Array.from(str).map((c, index, arr) => {
    const hex = c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
    return (
      <span key={index}>
        <a
          href={`https://unicodeplus.com/U+${hex}`}
          target="_blank"
          rel="noopener noreferrer"
          className="codepoint-link"
        >
          U+{hex}
        </a>
        {index < arr.length - 1 && <br />}
      </span>
    );
  });
}

const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const ShareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const InfoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
);

export function ComposerUI() {
  const savedInputs = (() => {
    try {
      const raw = localStorage.getItem("composerInputs");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [choseongInput, setChoseongInput] = useState(
    () =>
      new URLSearchParams(window.location.search).get("cho") ||
      savedInputs?.cho ||
      "ㄱ",
  );
  const [jungseongInput, setJungseongInput] = useState(
    () =>
      new URLSearchParams(window.location.search).get("jung") ||
      savedInputs?.jung ||
      "ㅏ",
  );
  const [jongseongInput, setJongseongInput] = useState(
    () =>
      new URLSearchParams(window.location.search).get("jong") ||
      savedInputs?.jong ||
      "",
  );
  const [fontFamily, setFontFamily] = useState<"nanum" | "myeongjo">(
    "myeongjo",
  );
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const [tooltip1, setTooltip1] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);
  const [tooltip3, setTooltip3] = useState(false);
  const fontButtonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const dubeolsikMap: Record<string, string> = {
    q: "ㅂ",
    w: "ㅈ",
    e: "ㄷ",
    r: "ㄱ",
    t: "ㅅ",
    y: "ㅛ",
    u: "ㅕ",
    i: "ㅑ",
    o: "ㅐ",
    p: "ㅔ",
    a: "ㅁ",
    s: "ㄴ",
    d: "ㅇ",
    f: "ㄹ",
    g: "ㅎ",
    h: "ㅗ",
    j: "ㅓ",
    k: "ㅏ",
    l: "ㅣ",
    z: "ㅋ",
    x: "ㅌ",
    c: "ㅊ",
    v: "ㅍ",
    b: "ㅠ",
    n: "ㅜ",
    m: "ㅡ",
  };

  const toHangulJamo = (value: string) =>
    value
      .split("")
      .map((ch) => {
        const lower = ch.toLowerCase();
        return dubeolsikMap[lower] ?? ch;
      })
      .join("");

  useEffect(() => {
    if (!isFontMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        fontButtonRef.current &&
        !popoverRef.current.contains(target) &&
        !fontButtonRef.current.contains(target)
      ) {
        setIsFontMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isFontMenuOpen]);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();

    if (choseongInput) newParams.set("cho", choseongInput);
    if (jungseongInput) newParams.set("jung", jungseongInput);
    if (jongseongInput) newParams.set("jong", jongseongInput);

    if (currentParams.toString() !== newParams.toString()) {
      const queryString = newParams.toString();
      const newUrl = `${window.location.pathname}${queryString ? "?" + queryString : ""}`;
      window.history.replaceState({}, "", newUrl);
    }

    try {
      localStorage.setItem(
        "composerInputs",
        JSON.stringify({
          cho: choseongInput,
          jung: jungseongInput,
          jong: jongseongInput,
        }),
      );
    } catch {
      // ignore when fail
    }
  }, [choseongInput, jungseongInput, jongseongInput]);

  const handleChoChange = (raw: string) => {
    const text = toHangulJamo(raw);
    const jamos = decomposeString(text).filter(isConsonant).join("");
    setChoseongInput(jamos);
  };

  const handleJungChange = (raw: string) => {
    const text = toHangulJamo(raw);
    const jamos = decomposeString(text).filter(isVowel).join("");
    setJungseongInput(jamos);
  };

  const handleJongChange = (raw: string) => {
    const text = toHangulJamo(raw);
    const jamos = decomposeString(text).filter(isConsonant).join("");
    setJongseongInput(jamos);
  };

  const handleCopy = (text: string | null) => {
    if (text) navigator.clipboard.writeText(text);
  };

  const getSVGSource = () => {
    const svgEl = document.querySelector(".visual-box-svg");
    if (!svgEl) return null;

    // Clone SVG and remove background rect
    const svgClone = svgEl.cloneNode(true) as SVGElement;

    // Remove the background rect element (first rect child)
    const rects = svgClone.querySelectorAll("rect");
    if (rects.length > 0) {
      rects[0].remove();
    }

    // Create a style block for the SVG with black fill and transparent background
    const svgStyles = `
      svg { background: transparent; }
      .svg-jamo-path { fill: #000; }
      .color-cho { fill: #000; }
      .color-jung { fill: #000; }
      .color-jong { fill: #000; }
    `;

    const styleElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style",
    );
    styleElement.textContent = svgStyles;
    svgClone.prepend(styleElement);

    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n${svgClone.outerHTML}`;
  };

  const handleSaveSVG = () => {
    const source = getSVGSource();
    if (!source) return;
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Create filename safely with sanitized characters
    const filename = `kotools-${result.precomposed || "output"}`.replace(
      /[^\w\s-]/g,
      "",
    );
    link.download = `${filename || "kotools"}.svg`;

    // Ensure download works across browsers
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    setTimeout(() => link.click(), 100);
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);
  };

  const handleCopySVG = () => {
    const source = getSVGSource();
    if (source) navigator.clipboard.writeText(source);
  };

  const handleShare = async () => {
    const source = getSVGSource();
    if (!source) return;

    if (navigator.share) {
      try {
        const blob = new Blob([source], { type: "image/svg+xml" });
        const file = new File([blob], "kotools.svg", { type: "image/svg+xml" });

        await navigator.share({
          title: "ko.tools 한글 합성 결과",
          text: `ko.tools 에서 합성한 결과입니다: ${result.precomposed || ""}`,
          files: [file],
        });
      } catch (err) {
        // Fallback or error
        console.error("Sharing failed", err);
        // If file sharing fails, try text sharing
        try {
          await navigator.share({
            title: "ko.tools 한글 합성 결과",
            url: window.location.href,
          });
        } catch {
          return;
        }
      }
    }
  };

  const result = composeKotools(
    choseongInput.split(""),
    jungseongInput.split(""),
    jongseongInput.split(""),
  );

  return (
    <div className="composer-ui glass-panel">
      <div className="input-section">
        <label>
          <span>초성 (Initial)</span>
          <input
            value={choseongInput}
            onChange={(e) => handleChoChange(e.target.value)}
            placeholder="e.g. ㄱ, ㄱㅂㅅ"
          />
        </label>

        <label>
          <span>중성 (Medial)</span>
          <input
            value={jungseongInput}
            onChange={(e) => handleJungChange(e.target.value)}
            placeholder="e.g. ㅏ, ㅏㅓ"
          />
        </label>

        <label>
          <span>종성 (Final)</span>
          <input
            value={jongseongInput}
            onChange={(e) => handleJongChange(e.target.value)}
            placeholder="e.g. ㅇ, ㄹㅂ"
          />
        </label>
      </div>

      <div className="output-section">
        <div className="output-header">
          <h2>Composition Result</h2>
          <button
            className="copy-btn font-menu-btn"
            ref={fontButtonRef}
            onClick={() => setIsFontMenuOpen(!isFontMenuOpen)}
            title="글꼴 설정"
          >
            f
          </button>

          {isFontMenuOpen && (
            <div className="font-popover" ref={popoverRef}>
              <div
                className={`font-option ${fontFamily === "nanum" ? "selected" : ""}`}
                onClick={() => {
                  setFontFamily("nanum");
                  setIsFontMenuOpen(false);
                }}
              >
                나눔바른고딕
              </div>
              <div
                className={`font-option ${fontFamily === "myeongjo" ? "selected" : ""}`}
                onClick={() => {
                  setFontFamily("myeongjo");
                  setIsFontMenuOpen(false);
                }}
              >
                나눔명조
              </div>
            </div>
          )}
        </div>
        <div className="dynamic-visual">
          <VisualRenderer result={result} fontFamily={fontFamily} />
        </div>

        <div className="export-actions">
          <button
            className="export-btn"
            onClick={handleSaveSVG}
            title="SVG 저장"
          >
            <DownloadIcon />
          </button>
          <button
            className="export-btn"
            onClick={handleCopySVG}
            title="소스 복사"
          >
            <CopyIcon />
          </button>
          {typeof navigator.share !== "undefined" && (
            <button className="export-btn" onClick={handleShare} title="공유">
              <ShareIcon />
            </button>
          )}
        </div>

        <div className="result-details">
          <div className="detail-card">
            <h3>
              완성형
              <button
                className="info-btn"
                onMouseEnter={() => setTooltip1(true)}
                onMouseLeave={() => setTooltip1(false)}
              >
                <InfoIcon />
                {tooltip1 && (
                  <div className="tooltip">
                    유니코드 완성형에 등록되었다면 그 문자를 표시합니다.
                    호환성이 뛰어납니다.
                  </div>
                )}
              </button>
            </h3>
            <p className="big-text">
              {result.precomposed || "N/A"}
              {result.precomposed && (
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(result.precomposed)}
                  title="복사"
                >
                  <CopyIcon />
                </button>
              )}
            </p>
            <p className="sub-text">{formatCodepoints(result.precomposed)}</p>
          </div>
          <div className="detail-card">
            <h3>
              조합형
              <button
                className="info-btn"
                onMouseEnter={() => setTooltip2(true)}
                onMouseLeave={() => setTooltip2(false)}
              >
                <InfoIcon />
                {tooltip2 && (
                  <div className="tooltip">
                    각각을 별개의 코드포인트로 지정합니다. 글꼴이 지원하지
                    않으면 깨질 수 있습니다.
                  </div>
                )}
              </button>
            </h3>
            {(result.conjoining?.includes("\u115F") ||
              result.conjoining?.includes("\u1160")) && (
              <span className="incomplete-indicator">미완성 문자</span>
            )}
            <p className="big-text yethangul-text">
              {result.conjoining || "N/A"}
              {result.conjoining && (
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(result.conjoining)}
                  title="복사"
                >
                  <CopyIcon />
                </button>
              )}
            </p>
            <p className="sub-text">{formatCodepoints(result.conjoining)}</p>
          </div>
          <div className="detail-card">
            <h3>
              IDC 낱자
              <button
                className="info-btn"
                onMouseEnter={() => setTooltip3(true)}
                onMouseLeave={() => setTooltip3(false)}
              >
                <InfoIcon />
                {tooltip3 && (
                  <div className="tooltip">
                    한자 설명 문자 를사용한 낱자 시퀀스입니다. 한글 자모를
                    분해하여 표시하고, 유니코드 미지원 글자도 기술합니다.
                  </div>
                )}
              </button>
            </h3>
            <p className="sub-text">
              {result.idc || "N/A"}
              {result.idc && (
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(result.idc)}
                  title="복사"
                >
                  <CopyIcon />
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
