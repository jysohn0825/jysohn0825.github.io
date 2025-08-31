<template>
  <div class="home">
    <header class="hero">
      <h1>Welcome to JY's Blog</h1>
      <p>A personal blog built with Vue.js & Vite</p>
    </header>
    
    <main class="content">
      <section class="intro">
        <h2>Hello! 👋</h2>
        <p>
          This is my personal blog where I share thoughts, experiences, and learnings 
          about web development, technology, and life in general.
        </p>
      </section>
      
      <section class="recent-posts">
        <h2>Recent Posts</h2>
        <div class="post-list">
          <article v-for="post in recentPosts" :key="post.slug" class="post-preview">
            <h3>
              <router-link :to="`/posts/${post.slug}`">
                {{ post.title }}
              </router-link>
            </h3>
            <p class="post-meta">{{ formatDate(post.date) }}</p>
            <p class="post-excerpt">{{ post.excerpt }}</p>
          </article>
          <div v-if="recentPosts.length === 0" class="post-preview">
            <h3>Coming Soon...</h3>
            <p class="post-meta">Stay tuned for upcoming posts!</p>
          </div>
        </div>
        <router-link to="/posts" class="view-all-btn">View All Posts →</router-link>
      </section>
    </main>
  </div>
</template>

<script>
import { getPostList } from '../utils/markdown.js'

export default {
  name: 'Home',
  data() {
    return {
      recentPosts: []
    }
  },
  async created() {
    await this.loadRecentPosts()
  },
  methods: {
    async loadRecentPosts() {
      try {
        const allPosts = await getPostList()
        // 최근 3개 포스트만 표시
        this.recentPosts = allPosts.slice(0, 3)
      } catch (error) {
        console.error('Error loading recent posts:', error)
        this.recentPosts = []
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
}

.content section {
  margin-bottom: 3rem;
}

.intro h2,
.recent-posts h2 {
  color: #333;
  margin-bottom: 1rem;
}

.intro p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.post-preview {
  padding: 1.5rem;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.post-preview h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
}

.view-all-btn {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
}

.view-all-btn:hover {
  color: #5a67d8;
}
</style>