<template>
  <div class="post-detail">
    <div v-if="loading" class="loading">
      <p>Loading post...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <h1>Post Not Found</h1>
      <p>{{ error }}</p>
      <router-link to="/posts" class="back-link">← Back to Posts</router-link>
    </div>
    
    <article v-else class="post">
      <header class="post-header">
        <h1>{{ post.frontmatter.title || 'Untitled Post' }}</h1>
        <div class="post-meta">
          <span class="post-date">
            {{ formatDate(post.frontmatter.date) }}
          </span>
          <div v-if="post.frontmatter.tags" class="post-tags">
            <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </header>
      
      <div class="post-content" v-html="post.html"></div>
      
      <footer class="post-footer">
        <router-link to="/posts" class="back-link">← Back to Posts</router-link>
      </footer>
    </article>
  </div>
</template>

<script>
import { parseMarkdownPost } from '../utils/markdown.js'

export default {
  name: 'PostDetail',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      post: null,
      loading: true,
      error: null
    }
  },
  async created() {
    await this.loadPost()
  },
  async beforeRouteUpdate(to, from, next) {
    this.loading = true
    this.error = null
    await this.loadPost(to.params.slug)
    next()
  },
  methods: {
    async loadPost(slug = this.slug) {
      try {
        this.loading = true
        this.error = null
        this.post = await parseMarkdownPost(slug)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 3rem 0;
}

.error h1 {
  color: #e53e3e;
  margin-bottom: 1rem;
}

.error p {
  color: #666;
  margin-bottom: 2rem;
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e1e8ed;
}

.post-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid #e2e8f0;
}

.post-content {
  line-height: 1.8;
  color: #333;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  margin: 2rem 0 1rem 0;
  color: #2d3748;
}

.post-content :deep(h1) { font-size: 2rem; }
.post-content :deep(h2) { font-size: 1.5rem; }
.post-content :deep(h3) { font-size: 1.25rem; }

.post-content :deep(p) {
  margin-bottom: 1.5rem;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.post-content :deep(li) {
  margin-bottom: 0.5rem;
}

.post-content :deep(blockquote) {
  border-left: 4px solid #667eea;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #666;
}

.post-content :deep(code) {
  background: #f7fafc;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  color: #e53e3e;
}

.post-content :deep(pre) {
  background: #2d3748;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.post-content :deep(pre code) {
  background: none;
  color: #e2e8f0;
  padding: 0;
  font-size: 0.9rem;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e8ed;
}

.back-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  color: #5a67d8;
}

@media (max-width: 768px) {
  .post-detail {
    padding: 1rem;
  }
  
  .post-header h1 {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>