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
    // In a real implementation, you'd fetch this from an API or build process
    // For now, return empty array - posts can be added later
    return []
  } catch (error) {
    console.error('Error getting post list:', error)
    return []
  }
}