import { marked } from 'marked'
import hljs from 'highlight.js'

// Configure marked with highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language: validLanguage }).value
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true
})

// 브라우저 전용 프론트매터 파싱 함수
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      data: {},
      content: content
    }
  }
  
  const [, frontmatterStr, markdown] = match
  const frontmatter = {}
  
  // 간단한 YAML 파싱 (기본적인 key: value 형태만)
  frontmatterStr.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    
    const colonIndex = trimmed.indexOf(':')
    if (colonIndex === -1) return
    
    const key = trimmed.slice(0, colonIndex).trim()
    let value = trimmed.slice(colonIndex + 1).trim()
    
    // 따옴표 제거
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    
    // 배열 형태 처리 (간단한 형태만)
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(item => 
        item.trim().replace(/['"]/g, '')
      )
    }
    
    frontmatter[key] = value
  })
  
  return {
    data: frontmatter,
    content: markdown
  }
}

export async function parseMarkdownPost(slug) {
  try {
    console.log('=== parseMarkdownPost called ===')
    console.log('Original slug:', slug)
    console.log('Type of slug:', typeof slug)
    
    // 간단하게 직접 경로 시도
    const directUrl = `/posts/${slug}.md`
    console.log('Direct URL:', directUrl)
    
    const response = await fetch(directUrl)
    console.log('Response status:', response.status)
    console.log('Response URL:', response.url)
    
    if (!response.ok) {
      console.error(`Failed to fetch ${directUrl}`)
      throw new Error(`Post not found: ${slug} (Status: ${response.status})`)
    }
    
    const content = await response.text()
    console.log('Post content loaded, length:', content.length)
    console.log('Content preview:', content.substring(0, 100) + '...')
    
    const { data: frontmatter, content: markdown } = parseFrontmatter(content)
    console.log('Parsed frontmatter:', frontmatter)
    console.log('Markdown length:', markdown.length)
    
    const html = marked(markdown)
    console.log('HTML generated, length:', html.length)
    
    return {
      frontmatter,
      html,
      slug
    }
  } catch (error) {
    console.error('=== Error in parseMarkdownPost ===')
    console.error('Error parsing markdown:', error)
    console.error('Stack:', error.stack)
    throw error
  }
}

export async function getPostList() {
  try {
    // 하드코딩된 포스트 목록 (실제로는 빌드 시 자동 생성해야 함)
    const posts = [
      {
        slug: 'vibe/personal-blog-vibe-2',
        title: '개인 블로그 vibe 해보기 (2) - 디버깅과 트러블슈팅',
        date: '2025-08-31',
        tags: ['vibe', 'debugging', 'troubleshooting', '개발일지', '문제해결'],
        excerpt: '블로그 구축 완료 후 만난 다양한 문제들과 Claude와 함께한 문제 해결 과정 기록',
        category: 'vibe'
      },
      {
        slug: 'vue/vue-blog-troubleshooting',
        title: 'Vue 블로그 개발 중 만난 기술적 문제들과 해결 과정',
        date: '2025-08-31',
        tags: ['vue', 'troubleshooting', 'debugging', 'router', 'markdown'],
        excerpt: 'Vue.js 기반 블로그 개발 과정에서 만난 다양한 기술적 이슈들과 해결 방법을 단계별로 정리',
        category: 'vue'
      },
      {
        slug: 'vibe/personal-blog-vibe-1',
        title: '개인 블로그 vibe 해보기 (1)',
        date: '2025-08-30',
        tags: ['vibe', '블로그', '개발일지', 'vue', 'github-pages'],
        excerpt: 'Vue.js로 Jekyll 스타일의 개인 블로그를 구축하는 여정을 기록한 첫 번째 포스트',
        category: 'vibe'
      },
      {
        slug: 'vue/vue-initial-setup-concepts',
        title: 'Vue 초기 설정 개념 (temp)',
        date: '2025-08-30',
        tags: ['vue', 'vite', 'router', '개념정리'],
        excerpt: 'Vue 3 + Vite 환경에서 블로그 프로젝트를 위한 초기 설정과 핵심 개념들',
        category: 'vue'
      },
      {
        slug: 'test-post',
        title: 'Test Post',
        date: '2025-08-31',
        tags: ['test'],
        excerpt: 'This is a test post to check if the system works',
        category: 'test'
      },
      {
        slug: 'welcome-to-my-blog',
        title: 'Welcome to My Blog',
        date: '2025-08-30',
        tags: ['welcome', 'blog', 'vue'],
        excerpt: '첫 번째 블로그 포스트에 오신 것을 환영합니다.',
        category: 'general'
      }
    ]

    // 날짜별 내림차순 정렬
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error getting post list:', error)
    return []
  }
}