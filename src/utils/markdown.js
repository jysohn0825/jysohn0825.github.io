import { marked } from 'marked'
import hljs from 'highlight.js'
import matter from 'gray-matter'

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

export async function parseMarkdownPost(slug) {
  try {
    const response = await fetch(`/posts/${slug}.md`)
    if (!response.ok) {
      throw new Error(`Post not found: ${slug}`)
    }
    
    const content = await response.text()
    const { data: frontmatter, content: markdown } = matter(content)
    const html = marked(markdown)
    
    return {
      frontmatter,
      html,
      slug
    }
  } catch (error) {
    console.error('Error parsing markdown:', error)
    throw error
  }
}

export async function getPostList() {
  try {
    // 하드코딩된 포스트 목록 (실제로는 빌드 시 자동 생성해야 함)
    const posts = [
      {
        slug: 'welcome-to-my-blog',
        title: 'Welcome to My Blog',
        date: '2024-01-01',
        tags: ['welcome', 'blog', 'vue'],
        excerpt: '첫 번째 블로그 포스트에 오신 것을 환영합니다.',
        category: 'general'
      },
      {
        slug: 'vibe/개인-블로그-vibe-해보기-1',
        title: '개인 블로그 vibe 해보기 (1)',
        date: '2024-12-30',
        tags: ['vibe', '블로그', '개발일지', 'vue', 'github-pages'],
        excerpt: 'Vue.js로 Jekyll 스타일의 개인 블로그를 구축하는 여정을 기록한 첫 번째 포스트',
        category: 'vibe'
      },
      {
        slug: 'vue/vue-초기-설정-개념-temp',
        title: 'Vue 초기 설정 개념 (temp)',
        date: '2024-12-30',
        tags: ['vue', 'vite', 'router', '개념정리'],
        excerpt: 'Vue 3 + Vite 환경에서 블로그 프로젝트를 위한 초기 설정과 핵심 개념들',
        category: 'vue'
      }
    ]

    // 날짜별 내림차순 정렬
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error getting post list:', error)
    return []
  }
}