---
title: "Vue 초기 설정 개념 (temp)"
date: "2024-12-30"  
tags: ["vue", "vite", "router", "개념정리"]
excerpt: "Vue 3 + Vite 환경에서 블로그 프로젝트를 위한 초기 설정과 핵심 개념들"
---

# Vue 초기 설정 개념 (temp) ⚡

Vue.js 블로그 프로젝트를 구축하면서 사용한 핵심 기술들과 설정 개념들을 정리해보자.

## 🎯 프로젝트 기술 스택

### 코어 프레임워크
```json
{
  "vue": "^3.5.18",
  "vue-router": "^4.4.0"
}
```

### 마크다운 처리
```json
{
  "marked": "^12.0.0",
  "highlight.js": "^11.9.0", 
  "gray-matter": "^4.0.3"
}
```

### 빌드 도구
```json
{
  "vite": "^7.0.6",
  "@vitejs/plugin-vue": "^6.0.1"
}
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
├── views/              # 페이지 컴포넌트
│   ├── Home.vue
│   ├── About.vue
│   ├── Posts.vue
│   └── PostDetail.vue
├── router/             # 라우팅 설정
│   └── index.js
├── utils/              # 유틸리티 함수
│   └── markdown.js
├── assets/             # 정적 자원
├── App.vue             # 루트 컴포넌트
└── main.js             # 진입점

public/
├── posts/              # 마크다운 포스트
│   ├── vibe/
│   └── vue/
└── 404.html            # SPA 라우팅 지원
```

## 🚦 Vue Router 설정

### 기본 라우터 구성
```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/posts/:slug',
    name: 'PostDetail', 
    component: () => import('../views/PostDetail.vue'),
    props: true  // URL 파라미터를 props로 전달
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
```

### 핵심 개념들

**1. History 모드**
- `createWebHistory()`: HTML5 History API 사용
- 깔끔한 URL (해시 없음)
- 서버 설정 필요 (SPA 폴백)

**2. 동적 라우팅**
- `:slug` 파라미터로 동적 경로 생성
- `props: true`로 컴포넌트에 자동 전달

**3. 지연 로딩 (Lazy Loading)**
```javascript
component: () => import('../views/Home.vue')
```
- 코드 스플리팅으로 초기 번들 크기 감소
- 필요할 때만 컴포넌트 로드

## 🎨 컴포넌트 설계 패턴

### Single File Component 구조
```vue
<template>
  <!-- HTML 템플릿 -->
</template>

<script>
  // JavaScript 로직
  export default {
    name: 'ComponentName',
    props: {},
    data() {},
    methods: {},
    created() {}
  }
</script>

<style scoped>
  /* 컴포넌트 스코프 CSS */
</style>
```

### Composition API vs Options API
이 프로젝트에서는 **Options API**를 사용:
- 작은 규모 프로젝트에 적합
- 직관적이고 학습하기 쉬움
- Vue 2 경험자들에게 친숙

## 📝 마크다운 처리 시스템

### 마크다운 파싱 파이프라인
```javascript
// 1. 파일 로드
const response = await fetch(`/posts/${slug}.md`)
const content = await response.text()

// 2. 프론트매터 파싱  
const { data: frontmatter, content: markdown } = matter(content)

// 3. 마크다운 → HTML 변환
const html = marked(markdown)
```

### Gray Matter (프론트매터)
```markdown
---
title: "포스트 제목"
date: "2024-12-30"
tags: ["vue", "블로그"]
excerpt: "포스트 요약"
---

# 실제 마크다운 내용
```

### Highlight.js 설정
```javascript
marked.setOptions({
  highlight: function(code, lang) {
    const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language: validLanguage }).value
  },
  langPrefix: 'hljs language-',
  breaks: true,  // 줄바꿈 변환
  gfm: true     // GitHub Flavored Markdown
})
```

## ⚙️ Vite 설정 최적화

### 프로덕션 빌드 설정
```javascript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' 
    ? '/jysohn0825.github.io/' 
    : '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          markdown: ['marked', 'highlight.js', 'gray-matter']
        }
      }
    }
  }
})
```

### Chunk 분할 전략
- **vendor**: Vue 코어 라이브러리들
- **markdown**: 마크다운 처리 관련 라이브러리들
- 각 청크는 독립적으로 캐싱 가능

## 🎪 GitHub Pages SPA 배포

### 문제점
GitHub Pages는 기본적으로 정적 파일 서빙만 지원:
- SPA의 클라이언트 라우팅을 이해하지 못함
- `/posts/some-post` 접근 시 404 에러

### 해결책: 404.html 트릭
```html
<!-- 404.html -->
<script type="text/javascript">
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

이 스크립트는:
1. 404 페이지에서 실행
2. URL 정보를 쿼리 파라미터로 인코딩
3. SPA가 로드된 후 올바른 경로로 리다이렉트

## 🔄 생명주기와 데이터 흐름

### 컴포넌트 생명주기
```javascript
export default {
  async created() {
    // 컴포넌트 생성 시 데이터 로드
    await this.loadPost()
  },
  
  async beforeRouteUpdate(to, from, next) {
    // 라우트 변경 시 데이터 재로드
    this.loading = true
    await this.loadPost(to.params.slug)
    next()
  }
}
```

### 반응형 데이터 관리
```javascript
data() {
  return {
    post: null,      // 포스트 데이터
    loading: true,   // 로딩 상태
    error: null      // 에러 상태
  }
}
```

## 🎨 CSS 설계 철학

### 스코프 CSS
```vue
<style scoped>
  /* 이 스타일은 현재 컴포넌트에만 적용 */
  .post-header {
    margin-bottom: 2rem;
  }
</style>
```

### 전역 스타일
```vue
<style>
  /* App.vue에서 전역 스타일 정의 */
  * {
    box-sizing: border-box;
  }
</style>
```

### CSS 변수 활용
```css
:root {
  --primary-color: #667eea;
  --text-color: #333;
  --border-color: #e1e8ed;
}
```

## 🔍 디버깅 도구

### Vue Devtools
- 컴포넌트 트리 검사
- 상태 변화 추적  
- 라우터 정보 확인

### 개발 서버 설정
```javascript
// vite.config.js
plugins: [
  vue(),
  vueDevTools(), // 개발 도구 플러그인
]
```

## 📊 성능 최적화 포인트

### 1. 코드 스플리팅
- 라우트별 청크 분할
- 라이브러리별 청크 분할

### 2. 지연 로딩
- 컴포넌트 지연 로딩
- 이미지 지연 로딩 (향후)

### 3. 번들 크기 최적화
- Tree shaking으로 미사용 코드 제거
- 라이브러리 선택 시 번들 크기 고려

## 🚀 배포 자동화

### GitHub Actions 워크플로우
```yaml
- name: Install dependencies
  run: npm ci
  
- name: Build  
  run: npm run build
  
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

완전 자동화된 CI/CD 파이프라인으로 푸시 즉시 배포!

---

이상으로 Vue 블로그 프로젝트의 핵심 설정 개념들을 정리해보았다. 각각의 선택에는 나름의 이유와 트레이드오프가 있었고, 작은 프로젝트지만 많은 것들을 배울 수 있었다. 💪