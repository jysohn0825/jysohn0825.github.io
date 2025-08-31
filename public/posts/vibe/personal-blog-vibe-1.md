---
title: "개인 블로그 vibe 해보기 (1)"
date: "2024-12-30"
tags: ["vibe", "블로그", "개발일지", "vue", "github-pages"]
excerpt: "Vue.js로 Jekyll 스타일의 개인 블로그를 구축하는 여정을 기록한 첫 번째 포스트"
---

# 개인 블로그 vibe 해보기 (1) 🚀

오늘은 Vue.js를 기반으로 Jekyll과 같은 기능을 하는 개인 블로그를 만들어보았다. GitHub Pages에 배포하여 `jysohn0825.github.io` 도메인으로 접속할 수 있는 블로그를 구축하는 것이 목표였다.

## 🎯 프로젝트 목표

- Jekyll처럼 마크다운 포스트를 지원하는 개인 블로그
- Vue.js 기반의 SPA (Single Page Application)
- GitHub Pages를 통한 자동 배포
- 모던한 UI/UX 디자인

## 📝 작업 진행 과정

### 1단계: Vue 라우터 설정 및 기본 구조

먼저 기존의 Vue 템플릿을 블로그용으로 재구성했다.

**사용자 요청:**
```
jekyll 처럼 github.io 도메인을 가지는 개인 블로그를 만들고 싶어, 이를 기반해서 디렉토리 구조 틀을 잡아줬으면 좋겠어
```

**수행한 작업:**
- `vue-router` 패키지 추가
- 라우터 설정 파일 생성 (`src/router/index.js`)
- `main.js`에 라우터 통합
- 기본 라우팅 구조 설정 (Home, About, Posts)

### 2단계: 기본 블로그 페이지들 생성

블로그의 핵심 페이지들을 하나씩 만들었다.

**생성한 페이지들:**

1. **Home.vue** - 메인 페이지
   - 환영 메시지와 블로그 소개
   - 최근 포스트 미리보기 섹션
   - 그라데이션 타이틀과 모던한 디자인

2. **About.vue** - 소개 페이지  
   - 개인 프로필 정보
   - 관심 분야 태그들
   - 연락처 링크들

3. **Posts.vue** - 포스트 목록 페이지
   - 포스트 목록 표시 (현재는 빈 상태)
   - 포스트 카드 디자인
   - "Coming Soon" 메시지

4. **App.vue 리뉴얼**
   - 네비게이션 바 추가
   - 푸터 영역 추가
   - 전체적인 레이아웃 구조 완성
   - 반응형 디자인 적용

### 3단계: 마크다운 포스트 처리 시스템

Jekyll의 핵심 기능인 마크다운 처리를 구현했다.

**추가한 패키지들:**
- `marked`: 마크다운 파싱
- `highlight.js`: 코드 구문 하이라이팅  
- `gray-matter`: 프론트매터 처리

**구현한 기능:**
- `src/utils/markdown.js`: 마크다운 파싱 유틸리티
- `PostDetail.vue`: 개별 포스트 상세 페이지
- 라우터에 포스트 상세 경로 추가 (`/posts/:slug`)
- Highlight.js CSS 테마 적용
- 예시 포스트 생성 (`welcome-to-my-blog.md`)

### 4단계: GitHub Pages 배포 설정

마지막으로 자동 배포 시스템을 구축했다.

**설정한 내용:**
- GitHub Actions 워크플로우 (`.github/workflows/deploy.yml`)
- Vite 설정 수정 (GitHub Pages 경로 설정)
- SPA 라우팅을 위한 `404.html` 파일
- 빌드 최적화 설정 (chunk 분할)

## 🎨 디자인 컨셉

전체적으로 **깔끔하고 모던한** 디자인을 추구했다:

- **컬러 스키마**: 보라-파랑 그라데이션 (`#667eea` → `#764ba2`)
- **타이포그래피**: 시스템 폰트 사용으로 가독성 향상
- **레이아웃**: 최대 800px 너비로 가독성 최적화
- **반응형**: 모바일/태블릿/데스크톱 지원

## 💡 기술적 특징

### SPA vs SSG 고려사항
Jekyll은 정적 사이트 생성기이지만, 이번 프로젝트는 SPA로 구현했다. 이는:
- **장점**: 페이지 전환이 빠르고 인터랙티브함
- **단점**: 초기 로딩과 SEO에서 약간의 단점
- **해결**: GitHub Pages의 404.html 트릭으로 SPA 라우팅 지원

### 마크다운 처리 방식
```javascript
// 실시간 마크다운 파싱
const { data: frontmatter, content: markdown } = matter(content)
const html = marked(markdown)
```

브라우저에서 실시간으로 마크다운을 파싱하는 방식을 선택했다. 이는 빌드 타임이 아닌 런타임 처리지만, 작은 블로그에서는 충분한 성능을 보여준다.

## 🚀 배포 결과

모든 작업이 완료된 후, GitHub Actions를 통해 자동으로 배포되었다:
- **URL**: `https://jysohn0825.github.io`
- **배포 방식**: GitHub Actions + GitHub Pages
- **빌드 도구**: Vite

## 🔮 다음 단계 계획

1. **포스트 관리 시스템**: 포스트 목록 자동 생성
2. **검색 기능**: 포스트 검색 및 태그 필터링  
3. **댓글 시스템**: utterances 또는 giscus 통합
4. **SEO 최적화**: 메타 태그 및 사이트맵
5. **다크 모드**: 테마 전환 기능

## 📚 배운 점

- Vue Router의 동적 라우팅 활용법
- GitHub Pages에서 SPA 배포하는 방법
- Vite의 빌드 설정과 최적화 옵션
- 마크다운 생태계 (marked, highlight.js, gray-matter)

첫 번째 블로그 구축 여정이 성공적으로 마무리되었다! 🎉

다음 포스트에서는 실제 블로그 운영하면서 겪는 경험들을 공유해보겠다.