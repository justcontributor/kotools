# ko.tools

- **Live Demo**: [/kotools](https://justcontributor.github.io/kotools/)
- **About ko.tools**: [ABOUT.md](https://github.com/justcontributor/kotools/blob/main/ABOUT.md)

제한 없는 확장 한글 합성 도구.

## 소개

ko.tools는 현대 한글과 옛한글을 자유롭게 합성하고 시각화할 수 있는 웹 기반 도구입니다. 초성, 중성, 종성을 입력하여 다양한 한글 문자를 생성하고, 그 결과를 시각적으로 확인할 수 있습니다.

## 주요 기능

입력한 초성 / 중성 / 종성 문자를 기반으로 확장 한글 출력을 생성합니다.

### 출력 형식

- **합성 SVG**: SVG Path로 구현된 확장 한글 렌더링
- **완성형**: (대응하는 것이 있으면) Unicode 완성형 한글
- **조합형**: (대응하는 것이 있으면) Unicode 조합형 한글
- **IDC 낱자**: 한자 모양 설명 문자를 사용한 자모 시퀀스

### 보조 기능

- **렌더링 글꼴 선택**: 나눔바른고딕 / 나눔명조 옛한글 중 하나로 렌더링
- **SVG 내보내기**: 생성된 한글을 SVG 파일로 다운로드
- **클립보드 복사**: SVG 경로 복사
- **웹 공유**: Web Share API를 통한 SVG 공유
- **URL 쿼리**: URL 쿼리와 입력 연동

## (개발자용) 설치 및 실행

### 로컬 개발 환경

1. 저장소 클론:

   ```bash
   git clone https://github.com/justcontributor/kotools.git
   cd kotools
   ```

1. 의존성 설치:

   ```bash
   npm install
   ```

1. 개발 서버 실행:

   ```bash
   npm run dev --port 3000
   ```

1. 브라우저에서 <http://localhost:3000/kotools/> 접속

### 빌드 및 배포

```bash
# 프로덕션 빌드 및 GitHub Pages 배포
npm run deploy
```

## 프로젝트 구조

```txt
src/
├── components/
│   ├── ComposerUI.tsx      # 메인 UI 컴포넌트
│   ├── VisualRenderer.tsx  # SVG 렌더링 컴포넌트
│   └── ...
├── engine/
│   └── composer.ts         # 한글 합성 로직
├── fonts/                  # 옛한글 폰트 파일
└── App.tsx                 # 메인 앱 컴포넌트
└── ...
```

## 기여하기

- 원하는 기능을 제보하거나, 오류가 있다면 우선 MAINTAIN.md를 확인한 뒤 GitHub Issue를 생성해주세요.
- 모든 유형의 Pull Request를 환영합니다!

---

_Inspired by [zi.tools](https://zi.tools), Made by justcontributor_
