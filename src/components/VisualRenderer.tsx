import { useEffect, useState, useMemo } from "react";
import { decomposeString, type ComposeResult } from "../engine/composer";
import * as opentype from "opentype.js";
import "./VisualRenderer.css";

interface Props {
  result: ComposeResult;
  mode?: "text" | "path"; // kept for prop compatibility but mode is forced to path
  fontFamily?: "nanum" | "myeongjo";
}

const NANUM_FONT_URL = new URL(
  "../fonts/NanumBarunGothic-YetHangul.ttf",
  import.meta.url,
).href;
const MYEONGJO_FONT_URL = new URL(
  "../fonts/NanumMyeongjo-YetHangul.ttf",
  import.meta.url,
).href;

const BOTTOM_VOWELS = new Set([
  "ㅗ",
  "ㅛ",
  "ㅜ",
  "ㅠ",
  "ㅡ",
  "ㆍ",
  "\u119E",
  "\u318D",
  "ᆄ",
  "ᆅ",
  "ᆈ",
  "ᆑ",
  "ᆒ",
  "ᆔ",
  "ᆕ",
]);

// Coordinate system
const GRID_SIZE = 1000;
const MIN_SCALE = 0.3; // Lowest scale possible before overlapping
const MAX_ASPECT_RATIO = 1.3; // Prevent a single glyph from stretching too wide or too tall

interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function VisualRenderer({ result, fontFamily = "nanum" }: Props) {
  const { choseong, jungseong, jongseong } = result;
  const [activeFont, setActiveFont] = useState<opentype.Font | null>(null);

  useEffect(() => {
    let active = true;
    const url = fontFamily === "nanum" ? NANUM_FONT_URL : MYEONGJO_FONT_URL;

    opentype.load(url, (err, loadedFont) => {
      if (active && !err && loadedFont) {
        setActiveFont(loadedFont);
      }
    });

    return () => {
      active = false;
    };
  }, [fontFamily]);

  const font = activeFont;

  const decompCho = choseong; // Do not expand double consonants
  const decompJung = jungseong.flatMap((j) => decomposeString(j)); // Expand complex vowels for separate vertical/horizontal placing
  const decompJong = jongseong; // Do not expand complex final consonants

  const bottomJung = decompJung.filter((j) => BOTTOM_VOWELS.has(j));
  const rightJung = decompJung.filter((j) => !BOTTOM_VOWELS.has(j));

  const hasBottom = bottomJung.length > 0;
  const hasRight = rightJung.length > 0;
  const hasJong = decompJong.length > 0;
  const hasJung = decompJung.length > 0;

  const layout = useMemo(() => {
    let choBox: BoundingBox;
    let bottomJungBox: BoundingBox | null = null;
    let rightJungBox: BoundingBox | null = null;
    let jongBox: BoundingBox | null = null;

    // Y-axis breakdown
    const topY = 50;
    const topH = hasJong ? 600 : 900;
    const bottomY = hasJong ? 680 : 0;
    const bottomH = hasJong ? 270 : 0;

    if (hasJong) {
      jongBox = { x: 100, y: bottomY, w: 800, h: bottomH };
    }

    if (!hasJung) {
      // Cho only
      choBox = { x: 50, y: topY, w: 900, h: topH };
    } else if (hasRight && !hasBottom) {
      // Cho (left) + RightJung (right)
      choBox = { x: 50, y: topY, w: 430, h: topH };
      rightJungBox = { x: 520, y: topY, w: 430, h: topH };
    } else if (hasBottom && !hasRight) {
      // Cho (top) + BottomJung (bottom of top part)
      choBox = { x: 150, y: topY, w: 700, h: topH * 0.45 };
      bottomJungBox = { x: 150, y: topY + topH * 0.5, w: 700, h: topH * 0.45 };
    } else {
      // Both bottom and right
      const firstBottomIdx = decompJung.findIndex((j) => BOTTOM_VOWELS.has(j));
      const firstRightIdx = decompJung.findIndex((j) => !BOTTOM_VOWELS.has(j));

      if (
        firstRightIdx !== -1 &&
        firstBottomIdx !== -1 &&
        firstRightIdx < firstBottomIdx
      ) {
        // Vertical (right) vowel comes first, shorten vertical and dig in horizontal
        choBox = { x: 50, y: topY, w: 430, h: topH * 0.45 };
        rightJungBox = { x: 520, y: topY, w: 430, h: topH * 0.45 };
        bottomJungBox = { x: 50, y: topY + topH * 0.5, w: 900, h: topH * 0.45 };
      } else {
        // Horizontal (bottom) vowel comes first (standard)
        rightJungBox = { x: 550, y: topY, w: 400, h: topH };
        choBox = { x: 50, y: topY, w: 450, h: topH * 0.45 };
        bottomJungBox = { x: 50, y: topY + topH * 0.5, w: 450, h: topH * 0.45 };
      }
    }

    return { choBox, bottomJungBox, rightJungBox, jongBox };
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
  }, [hasBottom, hasRight, hasJong, hasJung, decompJung]);

  const renderGlyphs = (
    jamos: string[],
    box: BoundingBox,
    colorClass: string,
    direction: "horizontal" | "vertical" = "horizontal",
  ) => {
    if (jamos.length === 0 || !font || !box) return null;

    if (direction === "horizontal") {
      const targetWidthPerJamo = box.w / jamos.length;
      const finalWidthPerJamo = targetWidthPerJamo;
      const startX = box.x + (box.w - finalWidthPerJamo * jamos.length) / 2;

      return jamos.map((jamo, idx) => {
        const slotX = startX + idx * finalWidthPerJamo;
        const path = font.getPath(jamo, 0, 0, 800);
        const bbox = path.getBoundingBox();
        const pathWidth = bbox.x2 - bbox.x1 || 800;
        const pathHeight = bbox.y2 - bbox.y1 || 800;

        let scaleX = finalWidthPerJamo / pathWidth;
        let scaleY = box.h / pathHeight;

        if (scaleX > scaleY * MAX_ASPECT_RATIO) {
          scaleX = scaleY * MAX_ASPECT_RATIO;
        }

        const MAX_GLYPH_SCALE = Math.max(box.w, box.h) / 500;
        if (scaleX > MAX_GLYPH_SCALE) scaleX = MAX_GLYPH_SCALE;
        if (scaleY > MAX_GLYPH_SCALE) scaleY = MAX_GLYPH_SCALE;

        const actualWidth = pathWidth * scaleX;
        const actualHeight = pathHeight * scaleY;

        const shiftX =
          slotX - bbox.x1 * scaleX + (finalWidthPerJamo - actualWidth) / 2;
        const shiftY = box.y - bbox.y1 * scaleY + (box.h - actualHeight) / 2;

        return (
          <path
            key={`${jamo}-${idx}`}
            className={`svg-jamo-path ${colorClass}`}
            d={path.toPathData(2)}
            transform={`translate(${shiftX}, ${shiftY}) scale(${scaleX}, ${scaleY})`}
          />
        );
      });
    } else {
      // Vertical stacking (used for bottom vowels like ㅗ, ㅜ, ㅡ)
      const targetHeightPerJamo = box.h / jamos.length;
      const finalHeightPerJamo = Math.max(
        targetHeightPerJamo,
        box.h * MIN_SCALE,
      );
      const startY = box.y + (box.h - finalHeightPerJamo * jamos.length) / 2;

      return jamos.map((jamo, idx) => {
        const slotY = startY + idx * finalHeightPerJamo;
        const path = font.getPath(jamo, 0, 0, 800);
        const bbox = path.getBoundingBox();
        const pathWidth = bbox.x2 - bbox.x1 || 800;
        const pathHeight = bbox.y2 - bbox.y1 || 800;

        let scaleX = box.w / pathWidth;
        let scaleY = finalHeightPerJamo / pathHeight;

        const MAX_GLYPH_SCALE = Math.max(box.w, box.h) / 500;
        if (scaleX > MAX_GLYPH_SCALE) scaleX = MAX_GLYPH_SCALE;
        if (scaleY > MAX_GLYPH_SCALE) scaleY = MAX_GLYPH_SCALE;

        const actualWidth = pathWidth * scaleX;
        const actualHeight = pathHeight * scaleY;

        const shiftX = box.x - bbox.x1 * scaleX + (box.w - actualWidth) / 2;
        const shiftY =
          slotY - bbox.y1 * scaleY + (finalHeightPerJamo - actualHeight) / 2;

        return (
          <path
            key={`${jamo}-${idx}`}
            className={`svg-jamo-path ${colorClass}`}
            d={path.toPathData(2)}
            transform={`translate(${shiftX}, ${shiftY}) scale(${scaleX}, ${scaleY})`}
          />
        );
      });
    }
  };

  return (
    <svg
      className="visual-box-svg"
      viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect
        x="0"
        y="0"
        width={GRID_SIZE}
        height={GRID_SIZE}
        fill="transparent"
        rx="100"
      />

      {renderGlyphs(decompCho, layout.choBox, "color-cho", "horizontal")}
      {layout.bottomJungBox &&
        renderGlyphs(
          bottomJung,
          layout.bottomJungBox,
          "color-jung",
          "vertical",
        )}
      {layout.rightJungBox &&
        renderGlyphs(
          rightJung,
          layout.rightJungBox,
          "color-jung",
          "horizontal",
        )}
      {layout.jongBox &&
        renderGlyphs(decompJong, layout.jongBox, "color-jong", "horizontal")}
    </svg>
  );
}
