---
title: "Vue 블로그 개발 중 만난 기술적 문제들과 해결 과정"
date: "2024-12-30"
tags: ["vue", "troubleshooting", "debugging", "router", "markdown"]
excerpt: "Vue.js 기반 블로그 개발 과정에서 만난 다양한 기술적 이슈들과 해결 방법을 단계별로 정리"
---

# Vue 블로그 개발 중 만난 기술적 문제들과 해결 과정 🔧

Vue.js로 개인 블로그를 만들면서 겪은 여러 기술적 문제들과 해결 과정을 정리해보았다. 각 문제마다 원인 분석과 해결 방법을 단계적으로 기록했다.

## 🚨 주요 문제들 개요

### 1. GitHub Pages 배포 문제
- **증상**: 로컬에서는 작동하지만 배포 후 빈 화면
- **원인**: 잘못된 베이스 경로 설정
- **해결**: `jysohn0825.github.io`는 사용자 페이지이므로 루트 경로(`/`) 사용

### 2. 포스트 목록이 표시되지 않는 문제  
- **증상**: Posts 페이지에서 "Coming Soon" 메시지만 표시
- **원인**: `getPostList()` 함수가 빈 배열 반환
- **해결**: 하드코딩된 포스트 목록으로 임시 구현 후 자동화 예정

### 3. Buffer 에러 - Node.js 라이브러리 호환성
- **증상**: `gray-matter` 사용 시 "Can't find variable: Buffer" 에러
- **원인**: `gray-matter`가 Node.js 전용 Buffer API 사용
- **해결**: 브라우저 전용 커스텀 프론트매터 파서 구현

### 4. Vue Router 경로 매칭 실패
- **증상**: 슬래시 포함 slug (`vibe/post-name`)에서 라우팅 실패
- **원인**: `:slug` 매개변수가 슬래시를 인식하지 못함
- **해결**: `:slug(.*)` 패턴으로 모든 경로 매칭 지원

## 🔍 세부 문제 해결 과정

### Problem 1: GitHub Pages 베이스 경로 설정

#### 문제 상황
```javascript
// 잘못된 설정 (프로젝트 페이지용)
base: process.env.NODE_ENV === 'production' ? '/jysohn0825.github.io/' : '/'
```

로컬에서는 정상 작동하지만 GitHub Pages에서 빈 화면이 나타났다.

#### 원인 분석
GitHub Pages의 두 가지 타입을 혼동했다:
- **사용자/조직 페이지**: `username.github.io` → 베이스 경로는 `/`
- **프로젝트 페이지**: `username.github.io/repository-name` → 베이스 경로는 `/repository-name/`

#### 해결 방법
```javascript
// 올바른 설정 (사용자 페이지용)
base: '/'
```

### Problem 2: 브라우저 전용 프론트매터 파싱

#### 문제 상황
```javascript
// Node.js 전용 라이브러리 사용
import matter from 'gray-matter'

// 브라우저에서 Buffer 에러 발생
const { data: frontmatter, content: markdown } = matter(content)
```

#### 해결 방법
브라우저에서 동작하는 커스텀 파서 구현:

```javascript
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content: content }
  }
  
  const [, frontmatterStr, markdown] = match
  const frontmatter = {}
  
  // 간단한 YAML 파싱
  frontmatterStr.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    
    const colonIndex = trimmed.indexOf(':')
    if (colonIndex === -1) return
    
    const key = trimmed.slice(0, colonIndex).trim()
    let value = trimmed.slice(colonIndex + 1).trim()
    
    // 따옴표 제거 및 배열 처리
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(item => 
        item.trim().replace(/['"]/g, '')
      )
    }
    
    frontmatter[key] = value
  })
  
  return { data: frontmatter, content: markdown }
}
```

### Problem 3: Vue Router 경로 매칭 문제

#### 문제 상황
```javascript
// 기존 라우트 설정
{
  path: '/posts/:slug',
  name: 'PostDetail',
  component: () => import('../views/PostDetail.vue'),
  props: true
}
```

`/posts/vibe/personal-blog-1` 같은 경로에서 매칭 실패.

#### 원인 분석
Vue Router의 `:slug` 매개변수는 기본적으로 슬래시(`/`)를 경로 구분자로 인식하여 단일 세그먼트만 매칭한다.

#### 해결 방법
정규식 패턴으로 모든 문자 매칭:

```javascript
// 수정된 라우트 설정
{
  path: '/posts/:slug(.*)',  // (.*) 패턴으로 모든 경로 매칭
  name: 'PostDetail',
  component: () => import('../views/PostDetail.vue'),
  props: true
}
```

## 🛠️ 개발 도구와 디버깅 전략

### 단계적 문제 해결 접근법
1. **로컬 환경에서 재현**: `npm run dev`로 개발 서버 실행
2. **브라우저 콘솔 활용**: 네트워크 탭과 콘솔 로그로 에러 추적
3. **단계별 디버깅**: 각 함수에 상세 로그 추가
4. **최소 재현 사례**: 단순한 테스트 케이스로 문제 격리

### 유용했던 디버깅 코드
```javascript
export async function parseMarkdownPost(slug) {
  try {
    console.log('=== parseMarkdownPost called ===')
    console.log('Original slug:', slug)
    console.log('Type of slug:', typeof slug)
    
    const directUrl = `/posts/${slug}.md`
    console.log('Direct URL:', directUrl)
    
    const response = await fetch(directUrl)
    console.log('Response status:', response.status)
    console.log('Response URL:', response.url)
    
    // ... 나머지 로직
  } catch (error) {
    console.error('=== Error in parseMarkdownPost ===')
    console.error('Error details:', error)
    console.error('Stack trace:', error.stack)
    throw error
  }
}
```

## 📚 배운 점과 개선 방향

### 배운 점
1. **환경별 차이 인식**: 로컬, 개발, 프로덕션 환경의 차이점 이해
2. **브라우저 호환성**: Node.js 전용 라이브러리 사용 시 주의사항
3. **Vue Router 심화**: 동적 라우팅과 정규식 패턴 활용
4. **디버깅 중요성**: 체계적인 로깅으로 문제 해결 시간 단축

### 개선 방향
1. **자동화된 포스트 관리**: 빌드 시 마크다운 파일 스캔하여 목록 자동 생성
2. **타입 안전성**: TypeScript 도입으로 런타임 에러 방지
3. **테스트 코드**: 각 유틸리티 함수에 대한 단위 테스트 작성
4. **성능 최적화**: 마크다운 파싱을 빌드 타임으로 이동

## 🎯 결론

각 문제를 해결하면서 Vue.js 생태계에 대한 이해가 더욱 깊어졌다. 특히:

- **환경 차이에 대한 민감성**
- **라이브러리 선택 시 브라우저 호환성 고려**
- **체계적인 디버깅 접근법**
- **Vue Router의 고급 기능 활용**

이러한 경험들이 앞으로 더 안정적인 Vue.js 애플리케이션을 개발하는 데 큰 도움이 될 것 같다.

다음에는 이런 문제들을 미연에 방지할 수 있는 개발 환경과 워크플로우를 구축해보고 싶다! 🚀